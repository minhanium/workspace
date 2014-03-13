Paging in large data set result

Vấn đề với MySQL

Nếu bạn có một table dạng như sau với tầm 15 triệu record


	+---------+------------------+-------------------------+--------+
	| user_id | user_name        | email                   | gender |
	+---------+------------------+-------------------------+--------+
	|       1 | admin            | aaaaaaaaaaa@gmail.com   |      1 |
	|       3 | thdjsaffafddhong | phong3sd@gmail.com      |      1 |
	|       4 | jfakjfalklai     | haixxxxxxxxx@gmail.com  |      1 |
	|       5 | tran-phong-phu   | vifdfan@gmail.com       |      1 |
	|       6 | diniasfasfhong   | cafkfdafddinh@gmail.com |      1 |
	|       8 | tranfasfasdap    | NULL                    |      0 |
	|       9 | developers       | NULL                    |      0 |
	|      10 | tranffaffdffhiem | tuoifdafdafa@gmail.com  |      1 |
	|      11 | caffasfdg        | cfakfakfdlsf@gmail.com  |      1 |
	|      12 | usekafdafklkkl   | lsfd612@yahoo.com       |      1 |
	+---------+------------------+-------------------------+--------+


Giờ muốn query dạng:

SELECT * FROM user ORDER BY user_id ASC LIMIT 10 OFFSET 0

Thì rất nhanh, nhưng giả sử bạn muốn query thành

SELECT * FROM user ORDER BY user_id ASC LIMIT 10 OFFSET 10000000

Bạn sẽ thấy thời gian tăng lên thấy rõ 

Có hai giải pháp từ bài viết này, mà bạn có thể tìm hiểu đẻ cải thiện tốc độ:


MySQL ORDER BY / LIMIT performance: late row lookups
http://explainextended.com/2009/10/23/mysql-order-by-limit-performance-late-row-lookups/

	SELECT * 
	FROM user FORCE INDEX (PRIMARY)
	ORDER BY user_id ASC 
	LIMIT 10 OFFSET 10000000


	SELECT  *
	FROM    (
		        SELECT  user_id
		        FROM    user
		        ORDER BY
	                user_id ASC
		        LIMIT 10 OFFSET 10000000
	        ) u
	JOIN    user
	ON      user.user_id = u.user_id
	ORDER BY
        userid

Các giải pháp trên nghe rất hay nhưng code lại phức tạp, đôi khi không phải là thực sự hiểu quả.

SELECT * FROM user WHERE id > 10000000 ORDER BY user_id ASC LIMIT 10

Cách này thì nhanh hơn rất nhiều.

Do vậy, đôi khi nếu cần bạn phải chịu đau thương change code, các cách khác nhìn thì hay, nhưng có lẽ chỉ nên để tham khảo và học hỏi.

Vấn đề với Facebook

Có rất nhiều query ở Facebook cung cấp cho chúng ta một cơ chế gọi là cursor để chúng ta có thể lấy dữ liệu của câu query

giả sử bạn query dạng:

select id, message, actor_id from stream where source_id = 'xxxx' and limit 100 offset 1000
thì sẽ rất khó thì theo như mô tả của các chuyên gia, nó cho rằng với câu query này, thì phải thực hiện
một câu query lấy phải lấy ra hết dữ liệu lưu ở RAM rồi di chuyển đến offset 1000 lây ra một 100 phần tử
rồi trả về cho bạn. Câu query này nó lâu là vì vậy.

Facebook cung cấp cho chúng ta cơ chế về cursor, là một giá trị được base64, bạn chỉ cần đơn giản là decode sẽ
thấy.
Nó tương tự như câu:
SELECT * FROM user WHERE id > 10000000 ORDER BY user_id ASC LIMIT 10
Nhưng thay vì đó nó để 
SELECT * FROM user WHERE cursor > base64(last id) ORDER BY user_id ASC LIMIT 10


Và giải pháp cho SOLR
Với SOLR, thời điểm version 4.4.x, Chúng tôi cũng vật vả với offset, limit với càng ngày câu query càng chậm khi paging tới những trang cuối.
Rất may tới thời điểm SOLR 4.7 điều này đã dễ hơn rất nhiều với khái niệm cursorMark


 

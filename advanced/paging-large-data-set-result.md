Paging in large data set result

Vấn đề với MySQL

Nếu bạn có một table dạng như sau:

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

SELECT * FROM user ORDER BY id ASC LIMIT 10 OFFSET 0

Thì rất nhanh, nhưng giả sử bạn muốn query thành

SELECT * FROM user ORDER BY id ASC LIMIT 10 OFFSET 10000000

Bạn sẽ thấy thời gian tăng lên thấy rõ.

Có hai giải pháp từ bài viết này, mà bạn có thể tìm hiểu đẻ cải thiện tốc độ:

http://explainextended.com/2009/10/23/mysql-order-by-limit-performance-late-row-lookups/




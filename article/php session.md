# Tìm hiểu về Session trong PHP
## Lời nói đầu

Khi bạn sử dụng một ứng dụng web, từ lúc bạn mở trình duyệt(browser) ra, kết nối đến máy máy chủ (web server), đến khi không sử dụng nữa bằng cách đăng xuất hoặc tắt trình duyệt. Đây là một `session`, hay còn gọi là một phiên giao dịch.

Khi lập trình với PHP, chúng ta biết việc lưu trữ thông tin tạm thời của user trong biến `$_SESSION`. Biến này mất mỗi khi trình duyệt được bị tắt.

Nhưng để biết điều này như thế nào, có một số điều thật sự cần phải làm rõ. Và các vấn đề xung quanh nó cũng sẽ được mỗ sẻ và làm rõ trong bài viết này.

## 2 câu hỏi bài viết tập trung làm rõ

1. Điều đầu tiên là, thông tin của biến `$_SESSION` từ đâu mà có?
2. Làm sao mà PHP cung cấp cho chúng ta đúng thông tin của `user` hiện tại?

## PHP Session Variable

Để biết bạn là ai, PHP Session cho phép lưu trữ thông tin của trình duyệt hiện mà bạn đang sử dụng cho các lần request tiếp theo, trong cùng một phiên giao dịch. Chẳng hạn như bạn bên dưới dùng `key` là `user_identity` để check user đã đăng nhập hay chưa.

    if( !empty($_SESSION['user_identity']) )
	{
		//@todo Xử lý trong trường hợp user đã đăng nhập
	}
	else
	{
		//@todo Xử lý trong trường hợp user chưa đăng nhập
	} 

## PHP Session hoạt động như thế nào?

Giả sử:

- Chúng ta có user `A` có `id` = 1, đăng nhập từ Firefox
- Chúng ta có user `B` có `id` = 2, đăng nhập từ Chrome

Sau khi đăng nhập thành công, thông thường bạn sẽ lưu lại `id` của user đã đăng nhập trong session như bên dưới:

    $_SESSION['user_identity'] = $user_logged_id;

Sau đó, mỗi một lần user access vào ứng dụng thì chúng ta lại check, xem `$_SESSION['user_identity']` hiện tại là gì. Nếu chưa có thì có nghĩa là user chưa đăng nhập, còn nếu có thì nếu bằng `1` thì load info user `A`, bằng `2` thì load info của user `B`.

Vậy làm thế nào mà PHP lại cung cấp chính xác cho chúng ta trình duyệt Firefox là session `user_identity` là `1`, và trình chuyệt
Chrome là `user_identity` = `2`.

> Thông thường ví dụ để request bài viết(article) của ứng dụng blog, bạn phải tryền theo tham số dưới dạng wildcat như `/article_id/1` hoặc GET mothod dạng `?article_id=1`. Nhưng khi làm việc với $_SESSION thì không có điều này. Chúng ta chỉ cần truy cập vào biến $_SESSION, và biến đó PHP đã load đúng cho user A hoặc B. **Điều gì đã xảy ra?**

### PHP cùng Browser (Trình duyệt) trao đổi thông tin.

Để trao đổi thông tin và xác định được trình duyệt hiện tại là ai, giữa Trình duyệt và PHP trao đổi với nhau một cái key được lưu trữ trong `cookie`, mặc định nó sẽ tên là: `PHPSESSID`. Bạn có thể dùng Firebug để xem nó.

Thông thường nếu trình duyệt chưa có biến `PHPSESSID` Cookie, PHP sẽ tạo cho nó một cái bằng cách gởi về thông qua header của respone. Đồng thời mặc định cũng sẽ tạo ra một file tương ứng với cái `PHPSESSID` đó. Sau đó thì mỗi lần trình duyệt request đến server nó gởi kèm cái thông tin này về. Do vậy mà PHP biết được trình duyệt hiện tại là ai.

Vậy giờ chúng ta có thể hiểu rằng, giữa trình duyệt và PHP trao đổi với nhau thông tin định danh là một giá trị thông qua Cookie. Mỗi khi bạn gán một biến như `$_SESSION['user_identity'] = 1`, thì thông tin đó nó sẽ write thông tin vào cái file tương ứng.

> Khẳng định lại lần nữa là, thông tin lưu trên $_SESSION được lưu trữ ở phía server.

### Có nhất thiết tên của cookie phải luôn có tên là `PHPSESSID`.

> Không phải, bạn có thể thiết lập điều này trong cấu hình php.ini hoặc ini_set theo cách mà bạn muốn.

### Nếu trình duyệt tắt cookie thì sao?

> Như đã thảo luận bạn cần cho trình đuyệt cần định danh bạn là ai, để đọc(load/read)/ghi(write) thông tin tương ứng của user. Do đó, bạn có thể dùng cách nào đó miễn là làm sao để thông báo cho PHP biết id nó cấp phát cho bạn là gì. Cách thay thế trong trường hợp này tốt nhất có thể kể đến là, đặt thông tin đó lên trên URL.

> Nhưng điều này rất không an toàn. Hãy nghĩ xem, nếu bạn vô tình gởi cái thanh URL đó cho bạn của bạn đọc thì người ta sẽ sử dụng như chính tài khoản của bạn.

> Hầu hết mọi website, ví dụ như Facebook, nếu bạn tắt đi cookie, nó sẽ yêu cầu bạn phải bật lên, nếu không nó sẽ không hoạt động.

### Vậy cookie cũng đâu có an toàn, người ta có thể lấy cookie của tôi để đăng nhập vậy.

Đúng vậy. Nhưng cookie được gởi *behind the scense*, bằng cách thông thường, không cách nào bạn có thể lấy được cookie để kèm theo cho người khác. Ngoại trừ bạn bị hack cookie và hi vọng chúng ta sẽ có dịp để bàn trong một bài viết khác.

### Người ta có thể sniff để lấy cookie của tôi

Đúng vậy. Đó là lý do chúng ta có HTTPS. Nó sẽ mã hóa mọi thông tin khi truyền ra khỏi máy bạn. Và chẳng một ai biết cái giá trị `PHPSESSID` trong máy bạn ở đâu. Ngoại trừ khi người ta ngồi đúng vào máy của bạn.

## Vấn đề với Session.

### 1. Xung đột(conflict) giá trị trong $_SESSION
Và nếu bạn có hai ứng dụng khác nhau đặt trong cùng webroot directory như sau:
Ví dụ:

	localhost/book-store/index.php
	localhost/cafe-online/index.php
	
Trong code đều dùng SESSION['user_identity'] vậy rõ ràng xảy ra xung đột, khi các ứng dụng ghi đè thông tin lên lẫn nhau và đọc thông tin nhầm lẫn. Vì cùng một `key` mà cần lưu trữ hai giá trị khác nhau. Lúc đó bạn cần lưu trữ dạng:

    $_SESSION[$app_namespace]['user_identity'] = $user_logged_id;

Ví dụ:

	$_SESSION['book_app']['user_identity'] = $user_logged_id;
	$_SESSION['cafe_app']['user_identity'] = $user_logged_id;

Trong ví dụ trên, `book_app`, `cafe_app` là hai `$app_namespace`.

Như vậy quả là quá phức tạp vì lúc nào chúng ta cũng phải viết kèm theo cái $app_namespace của mình. Bạn có thể tìm hiểu best practice khi chúng tôi giới thiệu về Session Manager trong Zend 2.x ở bài viết tiếp theo.

### 2. Lưu trữ của session
Hãy nhìn lại vấn đề mặc định với PHP, khi đó SESSION được lưu trữ trong file. Vấn đề nảy sinh thật sự ở đây là gì?
Có 2 vấn đề:

1. Lưu file dẫn đến việc truy xuất trở nên chậm. Đó là lý do mà PHP có cơ chế cho phép chúng ta thay đổi việc lưu trữ $_SESSION. Thay vì file thì có thể dùng DB, Memcached...   

2. Khi triển khai với một hệ thống nhiều máy chủ, khi đó không biết user sẽ được access vào máy nào. Việc đồng bộ file 
trên các máy tính là điều khó khăn. Đó là lý do chúng ta có thể nghĩ đến việc lưu trữ $_SESSION trên DB hay Memcached. 

> Bạn có thể tìm hiểu về các vấn đề này thông qua các link tham khảo cuối bài viết. Và chúng tôi cũng sẽ cung cấp bài viết sử dụng những kỹ thuật tương ứng với Zend 2.x

## Bức tranh toàn cảnh về PHP Session.

### 1. [session_start](http://php.net/manual/en/function.session-start.php)

Đầu tiên là function này, nó sẽ kiểm tra đã có PHPSESSID chưa. Nếu chưa nó sẽ register một cái với server. Và cho phép chúng ta lưu trữ thông tin của người dùng<sup>[*]</sup> lên đó. Nếu có rồi, nó sẽ đọc thông tin đã được lưu trữ để bỏ vào biến $_SESSION

### 2. Đọc ghi thông tin lên Session

1. Ghi:
	
	$_SESSION['anything'] = 'Anything you want to save'; 

2. Đọc:
	
	$a_variable = $_SESSION['anything'];

3. Xóa:
		
	unset($_SESSION['anything']);

### 3. [session_destroy](http://php.net/manual/en/function.session-destroy.php)
	
Dùng để xóa bỏ hết các thông tin hiện tại về người sử dụng hiện tại với server.

### 4. [session_regenerate_id](http://www.php.net/manual/en/function.session-regenerate-id.php)

Hàm này sẽ tạo ra PHPSESSID mới cho request tiếp theo nhưng giữ các thông tin hiện tại trong

## Tham khảo:

1. [Session là gì](http://www.w3schools.com/php/php_sessions.asp)
2. http://security.stackexchange.com/questions/41/good-session-practices?rq=1
3. http://www.tuxradar.com/practicalphp/10/0/0
4. http://www.josephcrawford.com/php-articles/going-deep-inside-php-sessions/

------------------------------

<sup>[*]</sup>: Trong ngữ cảnh của bài viết, hai khái niệm `người dùng` và `trình duyệt` là giống nhau. Vì một trình duyệt cũng nhằm đại diện cho user sử dụng trình duyệt đó.

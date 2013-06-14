# Nodejs là gì?

Theo như định nghĩa trên chính website của nó là:

> Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.

Nhưng như vậy là quá phức tạp. Hiểu một cách đơn giản là:

**Nodejs là một trình thông dịch của cho ngôn ngữ Javascript**. Sao lại nói như vậy?

1. Giả sử khi ta có ngôn ngữ PHP như:

        <?php
            /*welcome.php*/
            echo 'Hello world!';
        ?>

Khi execute `php welcome.php` thì nó sẽ thực thi cái file đó và output ra cái nội dung `Hello world!`

2. Với Nodejs ta có thể viết:

        /*welcome.js*/
        console.log('Hello world!');

Khi execute `nodejs welcome.js` thì kết quả tương tự như với PHP.

> Điều này cho thấy, chúng ta có thể viết những cái script bằng ngôn ngữ Javascript để làm những chuyện tương tự như PHP, mà được thực thư thông quan Nodejs mà không cần thông qua trình duyệt. Và bài viết này sẽ cố gắng mô tả thông qua sự so sánh với PHP, cũng là một ngôn ngữ script được thông dịch qua PHP platform.

# So sánh Nodejs vs. PHP

## So sánh theo cơ chế hoạt động

Chúng ta thử tạo ra một hai ví dụ sau:

1. Với PHP, mỗi khi truy xuất vào: [http://php.me](http://php.me) thì hiển thị ra dòng chữ `Hello World from PHP!`
2. Với Nodejs mỗi khi truy xuất vào [http://nodejs.me](http://nodejs.me) thì hiển thị ra dòng chữ `Hello World from Nodejs!`

Chúng ta sẽ có 2 đoạn code như sau:

1. Cho PHP

        <?php
        header('HTTP/1.0 200 OK');
        header('Content-Type: text/plain!');
        echo 'Hello World from PHP';

2. Cho Nodejs (copy từ ví dụ official trên wesite của Nodejs)

        var http = require('http');
        http.createServer(function (req, res) {
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end('Hello World from Nodejs!');
        }).listen(1337, '127.0.0.1');
        console.log('Server running at http://127.0.0.1:1337/');

### Kết luận thứ nhất:

> Chúng ta có thể dùng Nodejs như PHP để xử lý tương tự như là một webserver (?)

## So sánh Javascript được viết ở phía Server vs. Client side

Ý này sẽ tập trugn làm rõ vậy Javascript được viết ở Server side như ví dụ ở trên có gì khác biệt với Javascript được viết ở Client side?

1. Javacript được viết ở Client side thì bị hạn chế nhiều tính năng như:

        * Không thể đọc và ghi file v.v...
        * Được xứ lý bởi các trình thông dịch khác nhau của từng trình duyệt khác nhau như IE, Chrome, Firefox
        
2. Javascript được viết ở Client side thông dịch bằng Nodejs sẽ có nhiều tính năng hơn

        * Đọc và ghi file
        * Làm việc với hệ quản trị cơ sở dữ liệu như MySQL, MongoDB
        * Và cách tính năng khác có thể có như những gì chúng ta đã làm với PHP

### Kết luận thứ hai:

> Nói vậy thì chúng ta chả thấy nó so với PHP có gì hay. Mất thời gian học một ngôn ngữ khác mà chẳng có gì khác biệt. Trong khi PHP đã có tuổi. Được kiểm chứng với biết bao dự án thành công.

## Sự khác nhau cơ bản giữa PHP vs. Nodejs

Đúng là như vậy. Nếu chúng ta so sánh giữa iPhone5 vs với Nokia 1200 với tính năng thoại và sms thì rõ ràng điện thoại nào cũng như điện thoại nào. Tất nhiên, khi người ta phát triển một cái gì đó mới mẻ bao giờ cũng có ít nhất là triết lý, xa hơn nữa là lý do nhằm để giải quyết một hoặc nhiều vấn đề cụ thể nào đó.

Chúng ta sẽ đi qua một ví dụ khác:

Chúng ta viết một chương trình xây dựng bộ đếm đơn giản, cứ mỗi một request từ trình duyệt đén chúng ta sẽ tăng nó lên 1 đơn vị và hiện thị ở browser.

1. Cho PHP

        <?php
        $view_number = @file_get_contents('view_number.txt');
        $view_number = $view_number + 1;
        @file_put_contents('view_number.txt', $view_number);
        echo $view_number;

2. Cho Nodejs

        var http = require('http');
        var fs = require('fs');
        var view_number = -1;
        
        http.createServer(function (req, res) {
        
                if( view_number === -1 ){
        		data = fs.readFileSync('view_number.txt');
        		view_number = parseInt(data);
        	}
        
        	view_number++;
        	res.end(view_number.toString());
        
        	setTimeout(function(){
        		fs.writeFile("view_number.txt", view_number);
        	},1000);
        
        }).listen(8082, '127.0.0.1');

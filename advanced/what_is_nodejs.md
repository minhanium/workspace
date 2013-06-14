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

### Kết luận:

> Chúng ta có thể dùng Nodejs như PHP để xử lý tương tự như là một webserver (?)

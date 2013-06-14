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

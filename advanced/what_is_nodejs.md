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

> Điều này cho thấy, chúng ta có thể viết những cái script bằng ngôn ngữ Javascript để làm những chuyện tương tự như PHP, được thực thi thông quan Nodejs mà không cần thông qua trình duyệt. Và bài viết này sẽ cố gắng mô tả thông qua sự so sánh với PHP platform.

# So sánh Nodejs platform vs. PHP plaftorm (+ Apache)

## So sánh theo cơ chế hoạt động

Chúng ta thử tạo ra một hai ví dụ sau:

1. Với PHP (+Apache), mỗi khi truy xuất vào: [http://php.me](http://php.me) thì hiển thị ra dòng chữ `Hello World from PHP!`
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

### Thu hoạch số 1:

> Chúng ta có thể dùng Nodejs như PHP (+ Apache) để xử lý tương tự như là một web server.

## So sánh Javascript được viết ở phía Server vs. Client side

Ý này sẽ tập trung làm rõ vậy Javascript được viết ở Server side như ví dụ ở trên có gì khác biệt với Javascript được viết ở Client side?

1. Javacript được viết ở Client side thì bị hạn chế nhiều tính năng như:

        * Không thể đọc và ghi file v.v...
        * Được xứ lý bởi các trình thông dịch khác nhau của từng trình duyệt khác nhau như IE, Chrome, Firefox
        
2. Javascript được viết ở Client side thông dịch bằng Nodejs sẽ có nhiều tính năng hơn

        * Đọc và ghi file
        * Làm việc với hệ quản trị cơ sở dữ liệu như MySQL, MongoDB
        * Và cách tính năng khác có thể có như những gì chúng ta đã làm với PHP
        * Được xây dựng trên nền tảng V8 Engine - Cái nhân để thông dịch Javascript trên trình duyệt Chrome

### Thu hoạch số 2:

> Nói vậy thì chúng ta chả thấy nó so với PHP có gì hay. Mất thời gian học một ngôn ngữ khác mà chẳng có gì khác biệt. Trong khi PHP đã có tuổi, nhiều dự án thành công.

## Sự khác nhau cơ bản giữa PHP platform vs. Nodejs platform

Đúng là như vậy. Nếu chúng ta so sánh giữa iPhone5 vs với Nokia 1200 với tính năng thoại và sms thì rõ ràng điện thoại nào cũng như điện thoại nào. Tất nhiên, khi người ta phát triển một cái gì đó mới mẻ bao giờ cũng có ít nhất là triết lý, xa hơn nữa là lý do nhằm để giải quyết một hoặc nhiều vấn đề cụ thể nào đó.

Chúng ta sẽ đi qua một ví dụ khác:

Chúng ta viết một chương trình xây dựng bộ đếm đơn giản, cứ mỗi một request từ trình duyệt đén chúng ta sẽ tăng nó lên 1 đơn vị và hiện thị ở browser.

1. Cho PHP - Demo [http://php.me/counter.php](http://php.me/counter.php)

        <?php
        $view_number = @file_get_contents('view_number.txt');
        $view_number = $view_number + 1;
        @file_put_contents('view_number.txt', $view_number);
        echo 'Số lượt request: '. $view_number;

2. Cho Nodejs - Demo [http://nodejs.me/counter.js](http://nodejs.me/counter.js)

        var view_number = 0;
        http.createServer(function (req, res) {
           view_number++;
           res.end(view_number.toString());
        }).listen(1337, '127.0.0.1');

### Thu hoạch số 3:

> Tới đây chúng ta có thể thấy được rằng sự khác biệt đầu tiên là Nodejs chạy giống như một phần mềm `Desktop`. Nó không giống như PHP clear hết mọi thứ mỗi khi kết thúc một request. Biến view_number ở phía Nodejs vẫn được giữ lại và chỉ đơn giản là tăng lên sau mỗi lượt request mà thôi.

### Cải tiến cho PHP có thể work như Nodejs

Nói như vậy thì không same khi so sánh PHP (+Apache) vs. Nodejs. Bản thân Nodejs tự nó làm chức năng như một web server + handler. Mỗi khi có một request tới. Nó đơn giản là tạo ra một thread khác để xử lý. Do đó biến `view_numer` được chia sẽ/sử dụng lại ở các thread khác nhau. Do đó nếu chúng ta cải tiến lại PHP để viết tương tự
như Nodejs thì chúng ta cũng có thể làm tương tự.

		<?php
		error_reporting(E_ALL);
		set_time_limit(0);
		ob_implicit_flush();
	
		$server         = create_socket();
		$view_number    = 0;
	
		do {
			$request = socket_accept($server);
			do {
				$respone   = ++$view_number.'';
				socket_write($request, $respone, strlen($respone));
				break;
			} while (true);
			socket_close($request);
		} while (true);
	
		socket_close($server);
	
		function create_socket()
		{
			$address    = '127.0.0.1';
			$port       = 10000;
			$sock       = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
			socket_bind($sock, $address, $port);
			socket_listen($sock, 5);
			return $sock;
		}

### Thu hoạch số 4:

> Chúng ta có thể dùng PHP trong ngữ cảnh đơn giản này.

## Cải tiến cho trường hợp phải restart lại Server

        var http        = require('http');
        var fs          = require('fs');
        var view_number = -1;
        
        http.createServer(function (req, res) {
            /* Giải quyết vấn đề khởi động lần đầu tiên*/
            if( view_number === -1 ){
                console.log('Read this line only one time when the server is started');
                data = fs.readFileSync('view_number.txt');/*Hàm này dùng để đọc file cho đến khi nào được dữ liệu*/
                view_number = parseInt(data);
            }
            
            view_number++;
            res.end('Số lượt request: ' + view_number.toString());
            
            fs.writeFile("view_number.txt", view_number);/*Hàm này ghi file bất đồng bộ/
        }).listen(1337, '127.0.0.1');


## Ứng dụng Nodejs để get FB data

Chúng ta sẽ bàn về vấn đề này, thông qua một ngữ cảnh cụ thể, với ví dụ sau đây:

> Request lên Facebook 200 basic info của user thông qua [graph.facebook.com/id_social_uer](graph.facebook.com/id_social_uer). Trong thời gian nhanh nhất.

### Vấn đề hiện tại của PHP

Tạm thời không nghĩ tới các vấn đề kỹ thuật như Batch, FSQL để tiếp cận một ví dụ cho đơn giản để làm rõ vấn đề hiện tại của PHP là gì?

Như ai đã từng dùng xDebug để debug PHP, là khi chúng ta gọi một Graph API lên Facebook thông qua phương thức `Facebook::api(/<id_social_user>)` là cái hàm đó sẽ pending và đợi kết quả trả về.

> Thực sự vấn đề là bên trong PHP sẽ dùng `curl` để request lên Facebook và đợi kết quả trả về. Ở `curl` chúng ta cũng có option để nó không phải đợi và đi tới hàm tiếp theo. Nhưng rõ ràng điều này không thể app dụng cho FB request. Chúng ta chỉ làm điều này, chỉ khi nào chúng ta chỉ send một rquest lên server mà không cần nhận kết quả trả về.

Đến đây, tôi đã từng nghĩ rằng: **Vậy cũng đâu có sao, foreach 200 lần thôi.**

Nhưng vấn đề ở chỗ là có sự delay giữa mỗi một request, để đợi kết quả trả về. Giả sử thời gian delay do phải over network là 900ms mỗi một request. Thì tuần tự mỗi lần chúng ta sẽ tốn 9s cho 9 requests. Trong khi đó chúng ta nếu mở 10 connect cùng lúc. Thì có thể chỉ tốn khoản ~1s cho 9 request mà thôi. Có thẻ mở trình duyệt lên để kiếm chứng điều này. Trình duyệt sẽ mở một lần nhiều connect đến server để request file javascript, css, image v.v...

> Vậy là một lượng connect hợp lý đến server mà không cần bắt máy tính phải đợi là hợp lý hơn nhiều so với lần lượt từng connection một.

Vậy thì với PHP chúng ta chỉ cần gọi `php slave_get_user_info id_social_user` 200 lần là được.

Nhưng mỗi lần làm như vậy PHP lại start một process, như vậy rất tốn kém tài nguyên. Và một máy tính thông thường, số lượng process có thể mở ra là có giới hạn.

> Không chỉ giới hạn về tài nguyên của máy tính khi tiếp cận với cách trên mà còn khó để lập trình + bảo trì cho nó. 


### Thu hoạch số 4:

1. Không kiểm soát được tài nguyên của máy tính:
        
        * Khi phải đợi thì máy tính làm gì?
        * => Lúc đó làm thế nào để các script khác có thể thực thi script khác đang rãnh rỗi?
        * Làm sao để kiểm soát được lượng request đến Facebook là đạt số lượng cho phép tối đa.
        * => Không thừa không thiếu.

2. Các giải pháp bổ sung rất phức tạp, kiến trúc khó bảo trì và chống lấn các script lên nhau như crontab, script checker, master, slave v.v...

### Giải quyết vấn đề với PHP

### Giải quyết với Nodejs

### Demo kiểm chứng

### Thu hoạch số 5:

> Cơ chế của Javascript/Nodejs là bất đồng bộ.

## Liên lạc giữa PHP với Nodejs

Trong phần này, chúng ta sẽ cố gắng mô tả 2 điều chính:

1. Xây dựng một pool để chứa các request mà từ phía PHP Server push/send lên Nodejs Server.
2. Xây dựng một cơ chế để pop các message từ pool ra để xử lý.


        var http    = require('http');
        var url     = require('url');
        
        var pool        = [];
        
        var __main__    = function(){
            console.log('Length of Pool: ' + pool.length);
            setTimeout(__main__, 1000);
        };
        
        http.createServer(function (req, res) {
        var url_parts 	= url.parse(req.url, true);
            var query 		= url_parts.query;
            res.writeHead(200, {'Content-Type': 'text/plain'});
            
            if( query['id'] )
            {
                pool.push(query['id']);
                res.end('Recieved a request id:' + query['id']);
                return;
            }
            res.end('Pong');
        }).listen(1337, '127.0.0.1');
        
        __main__();
    

> Tại sao lại là khái niệm pool mà không phải stack:

1. Chúng ta sẽ không cố gắng mô tả giống như Stack: FIFO
2. Chúng ta implement cái pool ~ có nghĩa là một cái hồ chứa. Và nó có xử lý khi bị tràn.
3. Một cái pool + với các vấn đề về sự ưu tiên (priority) của message sẽ được implement một cách đầy đủ.

### Thu hoạch số 6:

> Chúng ta có thể dùng cái này để cung cấp giải pháp như là cập nhật lại thống kê cho user action mỗi khi một cái post change category của nó theo kiểu realtime. Bằng cách send lên server của Nodejs thông tin về cái page mà mình muốn cập nhật.

## Demo ~ Lấy likes info của một Post và insert vào MySQL

Sẽ là thiếu thuyết phục nếu như bài viết này không demo Nodejs với MySQL làm việc như thế nào? Chúng ta sẽ xem qua script bên dưới để xem Nodejs làm việc có khả thi không? Bằng cách lấy một lúc likes của 10 post và insert vào MySQL.

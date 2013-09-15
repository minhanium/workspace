#Giới thiệu về Fabric.js

![Fabrics screenshot](https://github.com/kangax/fabric.js/raw/master/lib/screenshot.png "Fabrics screenshot")

Hôm nay, tôi trân trọng giới thiệu với bạn về [Fabric.js][1] - một thư viện Javascript mạnh mẽ giúp bạn làm thỏa sức sáng tạo trên nền HTML5. Fabric cung cấp object model bị thiếu cho canvas, SVG parser [để có thể load file svg và vẽ lên canvas, cũng như canvas như là svg], các layer tương tác, và nhiều đồ chơi, công cụ khác. Fabric là open source, giấy phép MIT, với sự đóng góp tích cực trong nhiều năm của các lập trình viên khác trên thế giới.

Tôi bắt đầu phát triển bộ thư viện này khoảng 3 năm trước, và cảm thấy hết sức đuối khi phải làm việc trên những hàm native của canvas. Váo lúc đó, tôi bắt đầu làm [printio.ru][2] - một dự án startup cho phép người dùng có thể thiết kế quần áo của họ. Với các tính năng mà chỉ xuất hiện trên Flash vào thời điểm đó. Thậm chí giờ đây có rất ít người biết được rằng với Fabric gần như chúng ta có thể thay thế Flash.

Thậm chí giờ đây có rất ít người biết được rằng với Fabric gần như chúng ta có thể thay thế Flash!

##Tại sao nên dùng Fabric hay là các vấn đề Canvas?

Ngày nay, [Canvas][3] cho phép chúng ta tạo ra thỏa sức sáng tạo những chức năng đồ họa tuyệt vời chạy trên nền trình duyệt web. Nhưng sử dụng API của nó, có nghĩa là bạn phải sử dụng ở mức độ thấp những hàm cơ bản mà nó cung cấp. Nếu bạn chỉ muốn về một vài cái hình đơn giản như tròn, vuông... thì bạn có thể bỏ qua những gì tôi vừa nói, và quên đi bài viết này. Nhưng nếu bạn muốn làm điều gì đó phức tạp và ấn tượng hơn thì bạn nên tiếp tục đọc những phần tiếp theo bên dưới.


[1]: http://fabricjs.com/        "Javascript Canvas Library"
[2]: http://printio.ru
[3]: http://http//www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html

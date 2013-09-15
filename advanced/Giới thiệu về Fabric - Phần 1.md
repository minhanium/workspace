#Giới thiệu về Fabric.js

![Fabrics screenshot](https://github.com/kangax/fabric.js/raw/master/lib/screenshot.png "Fabrics screenshot")

Hôm nay, tôi trân trọng giới thiệu với bạn về [Fabric.js][1] - một thư viện Javascript mạnh mẽ giúp bạn làm thỏa sức sáng tạo trên nền HTML5. Fabric cung cấp object model bị thiếu cho canvas, SVG parser [để có thể load file svg và vẽ lên canvas, cũng như canvas như là svg], các layer tương tác, và nhiều đồ chơi, công cụ khác. Fabric là open source, giấy phép MIT, với sự đóng góp tích cực trong nhiều năm của các lập trình viên khác trên thế giới.

Tôi bắt đầu phát triển bộ thư viện này khoảng 3 năm trước, và cảm thấy hết sức đuối khi phải làm việc trên những hàm native của canvas. Váo lúc đó, tôi bắt đầu làm [printio.ru][2] - một dự án startup cho phép người dùng có thể thiết kế quần áo của họ. Với các tính năng mà chỉ xuất hiện trên Flash vào thời điểm đó. Thậm chí giờ đây có rất ít người biết được rằng với Fabric gần như chúng ta có thể thay thế Flash.

Thậm chí giờ đây có rất ít người biết được rằng với Fabric gần như chúng ta có thể thay thế Flash!

##Tại sao nên dùng Fabric hay là các vấn đề Canvas?

Ngày nay, [Canvas][3] cho phép chúng ta tạo ra thỏa sức sáng tạo những chức năng đồ họa tuyệt vời chạy trên nền trình duyệt web. Nhưng sử dụng API của nó, có nghĩa là bạn phải sử dụng ở mức độ thấp những hàm cơ bản mà nó cung cấp. Nếu bạn chỉ muốn về một vài cái hình đơn giản như tròn, vuông... thì bạn có thể bỏ qua những gì tôi vừa nói, và quên đi bài viết này. Nhưng nếu bạn muốn làm điều gì đó phức tạp và ấn tượng hơn thì bạn nên tiếp tục đọc những phần tiếp theo bên dưới.

Fabric được thiết kế nhằm để giải quyết những vấn đề này.

Những phương thức cơ bản của Canvas cho phép chúng ta tạo ra những lệnh đồ họa cơ bản, cho phép chúng ta theo thác trực tiếp lên đó như là ảnh bitmap (rất khó dịch sát nghĩa ý đồ tác giả chỗ này). Nếu bạn muốn vẽ một hình chữ nhật? Sử dụng hàm này: `fillRect(left, top, width, height)`. Còn nếu muốn vẽ một đường thẳng? Bạn cần sử dụng kết hợp hai hàm sau: `moveTo(left, top)` và `lineTo(x, y)`. Đó là nếu chúng ta vẽ trên canvas với **cây cọ (brush)**, với nhiều lớp, nhiều chất liệu rất khó kiểm soát trong trường hợp này.

Thay vì thao tác trên những hàm ở mức thấp, Fabric cung cấp những **object model** cơ bản nhưng mạnh mẽ dựa trên những phương thức cơ bản. Cho phép chúng ta làm việc trên những đối tượng (Line, Circle, Rectangle) trực tiếp, kiểm soát được trạng thái và việc tạo hình/vẽ hình(rendering) của canvas.

Hãy xem một ví dụ đơn giản để minh họa cho sự khác biệt này. Giả sử rằng chúng ta muốn vẽ một hình chữ nhật màu đỏ tại một nơi bất kì trên canvas. Đoạn code bên dưới sẽ cho chúng ta thấy, với những native API chúng ta sẽ phải làm như thế nào.

	// reference canvas element (with id="c")
	var canvasEl = document.getElementById('c');
	
	// get 2d context to draw on (the "bitmap" mentioned earlier)
	var ctx = canvasEl.getContext('2d');
	
	// set fill color of context
	ctx.fillStyle = 'red';
	
	// create rectangle at a 100,100 point, with 20x20 dimensions
	ctx.fillRect(100, 100, 20, 20);
	
Và bên dưới, tiếp theo là những gì được code với Fabric:

	// create a wrapper around native canvas element (with id="c")
	var canvas = new fabric.Canvas('c');
	
	// create a rectangle object
	var rect = new fabric.Rect({
	  left: 100,
	  top: 100,
	  fill: 'red',
	  width: 20,
	  height: 20
	});
	
	// "add" rectangle onto canvas
	canvas.add(rect);

![Demo for Example 1](http://fabricjs.com/article_assets/1.png)

Tới đây, bạn thấy kết quả là chúng ta vẽ được hai hình chữ nhật giống nhau có cùng kích thước. Tuy nhiên, bạn có thể thấy được sự khác nhau giữa các cách tiếp cận trên canvas. Với các phương thức native, chúng ta thao thác trên một context - một đối tượng đại diện cho một thể hiện(instance) của canvas bitmap. Với Fabric, chúng ta thao tác trên đối tượng(ở ví dụ này là: Rect) - khởi tạo chúng, thay đổi các thuộc tính của chúng, và thêm chúng vào canvas. Và bạn có thể thấy được những đối tượng này là các lớp đầu tiên trong Fabric.

Nhưng nói về việc vẽ một hình chữ nhật màu đỏ thì rất nhàm chán. Chúng ta có thể làm một vài điều thú vị hơn với nó. Chẳng hạn như, xoay nhẹ nó:

Thử xoay một góc 45 độ. Đầu tiên, là sử dụng các phương thức native của canvas:

	var canvasEl = document.getElementById('c');
	var ctx = canvasEl.getContext('2d');
	ctx.fillStyle = 'red';
	
	ctx.translate(100, 100);
	ctx.rotate(Math.PI / 180 * 45);
	ctx.fillRect(-10, -10, 20, 20);

và bây giờ là sử dụng các phương thức của Fabric:

	var canvas = new fabric.Canvas('c');
	
	// create a rectangle with angle=45
	var rect = new fabric.Rect({
	  left: 100,
	  top: 100,
	  fill: 'red',
	  width: 20,
	  height: 20,
	  angle: 45
	});
	
	canvas.add(rect);

![Demo của ví dụ 2 - xoay hình](http://fabricjs.com/article_assets/2.png)

[1]: http://fabricjs.com/        "Javascript Canvas Library"
[2]: http://printio.ru
[3]: http://http//www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html

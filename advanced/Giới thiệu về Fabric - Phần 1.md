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

Tại sao chúng ta có thể làm như vậy?

Tất cả những gì chúng ta phải làm với Fabric là gán giá trị 45 độ cho thuộc tính "angle" của đối tượng. So với phương pháp sử dụng các native API, điều này rõ ràng là dễ và tự nhiên hơn. Bạn nhớ rằng, chúng ta không thể hoạt động trên các đối tượng trên canvas (các đối tượng của Fabric là các đối tượng được mô phỏng). Với việc sử dụng các native API, chúng ta thực hiện tinh chỉnh "position" và "angle" của toàn bộ canvas bitmap (ctx.translate , ctx.rotate ) cho phù hợp với những gì chúng ta cần. Rồi sau đó, chúng ta vẽ hình chữ nhật lần nữa, vẫn gán giá trị offset là (-10, 10) và hình chữ nhật vẫn phải vẽ tại vị trí (100, 100). Chúng ta còn phải chuyển đổi đơn vị "degree" sang "radian" khi xoay trên canvas bitmap. (Quá nhiều phiền phức với nhiều thao tác).

Tôi "dự" rằng, bạn đã bắt đầu hiểu chính xác rằng tại sao Fabric ra đời và tồn tại, và những thao tác phức tạp bên trong được ẩn như thế nào.

Nhưng chúng ta hãy cùng xem qua một ví dụ khác nữa, về vấn đề giữ trạng thái của canvas.

Giờ đây, nếu bạn muốn di chuyển hình chứ nhật màu đỏ đến một điểm khác trên canvas? Bạn sẽ làm điều này như thế nào nếu không thể thao tác trên một đối tượng? *[Lời người dịch: Ý tác giả chỗ này là sử dụng các native API]* Có phải chúng ta chỉ cần gọi một phương thức `fillRect` lần nữa trên canvas bitmap là được?

Không hoàn toàn như vậy. Gọi thêm một phương phức `fillRect` nữa thực ra là sẽ vẽ một hình chữ nhật nữa trên cái canvas hiện tại. Như ở phần trên tôi đã đề cập bạn vẽ một bức tranh với cây cọ và dầu. Nói một cách khác, để **"di chuyển"** nó tới vị trí mới, trước tiên là chúng ta phải **"xóa hết những gì đã vẽ trước đó"**, và vẽ một hình chữ nhật tại vị trí mới.

	var canvasEl = document.getElementById('c');
	
	...
	ctx.strokRect(100, 100, 20, 20);
	...
	
	// erase entire canvas area
	ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	ctx.fillRect(20, 50, 20, 20);

Và giờ, chúng ta xem rằng với Fabric chúng ta sẽ làm như thế nào?

	var canvas = new fabric.Canvas('c');
	...
	canvas.add(rect);
	...
	
	rect.set({ left: 20, top: 50 });
	canvas.renderAll();

![Demo - ví dụ 3 - di chuyển hình chữ nhật](http://fabricjs.com/article_assets/3.png)

Sự khác biệt này khá quan trọng. Với Fabric, chúng ta không cần phải xóa bỏ (trong từ từ tẩy xóa) nội dung đã vẽ trước đó trước khi muốn chỉnh sửa một nội dung nào đó. Chúng tôi vẫn làm việc với các đối tượng, đơn giản là thay đổi những thuộc tính của chúng, và cuối cùng là vẽ lại cái canvas để được một tấm hình mới.

##Objects - Đối tượng

Chúng ta đã hiểu cách để làm việc với hình chữ nhật như thế nào bằng cách gọi hàm gởi tạo của `fabric.Rect`. Tất nhiên Fabric cũng cung cấp những hình cơ bản khác như: hình tròn, tam giác, ellipse... Tất cả chúng đều nằm trong `fabric` "namespace" tương ứng như: `fabric.Circle`, `fabric.Triangle`, `fabric.Ellipse`...

7 loại hình (đối tượng) cơ bản được cung cấp trong Fabric:

* fabric.Circle
* fabric.Ellipse
* fabric.Line
* fabric.Polygon
* fabric.Polyline
* fabric.Rect
* fabric.Triangle

Giờ muốn vẽ một vòng tròn? Chỉ cần tạo ra một đối tượng "circle" và thêm chúng vào canvas. Với các đối tượng hình khác, chúng ta cũng tiếp cận tương tự:

	var circle = new fabric.Circle({
	  radius: 20, fill: 'green', left: 100, top: 100
	});
	var triangle = new fabric.Triangle({
	  width: 20, height: 30, fill: 'blue', left: 50, top: 50
	});
	
	canvas.add(circle, triangle);

![Demo - Ví dụ - vễ vẽ hình chữ nhật và hình tam giác cân](http://fabricjs.com/article_assets/4.png)

.. Với đoạn code trên chúng ta đã có một hình tròn màu xanh lá, được vẽ tại vị trí (100,100) và một tam giác màu xanh nước biển tại vị trí (50,50).

###Thao tác trên đối tượng

Tạo các đối tượng đồ họa - hình chữ nhật, hình tròn, hay một hình khác - chỉ mới là khởi đầu. Một lúc nào đó, chúng ta sẽ cần phải thay đổi chúng. Một hành động nào đó sẽ trigger sự sự thay đổi của trạng thái, hay là tạo ra animation the một sự xếp đặt có ý đồ nào đó. Hoặc chúng ta cho phép thay đổi thuộc tính của các đối tượng (bao gồm: màu sắc, độ trong suốt, kích thước, vị trí) khi tương tác bằng con chuột.

Fabric sẽ quản lý việc tạo hình và trạng thái của canvas cho chúng ta. Chúng ta chỉ cần thay đổi những đối tượng của mình.

Ở các ví dụ trước, phương thức `set` và cách gọi `set({ left: 20, top: 50 })` sẽ "di chuyển" object từ vị trí cũ đến vị trí mới. Một cách liên quan "nhẹ" ở đây, chúng ta có thể thay đổi những thuộc tính khác của đối tượng cùng bằng cách như vậy. Vậy, những thuộc tính đó là gì?

Okay, như bạn đã hình dung và nghĩ, chúng ta là các thuộc tính liên quan tới vị trí - left, top, kích thước - width, height, việc vẽ vời - fill, opacity, stroke, strokeWidth, sự co giãn và xoay - scaleX, scaleY, angle, và liên quan đến lật (flip) - flipX, flipY.

Tạo ra một đối tượng được flip trong Fabric thì cũng dễ dàng bằng cách set filp* property = true.

Bạn có thể lấy được các giá trị thuộc tính của nó thông qua phương thức `get` và thay đổi chúng thông qua phương thức `set`. Thử thay đổi một số thuộc tính của hình chữ nhật xem sao:

	var canvas = new fabric.Canvas('c');
	...
	canvas.add(rect);
	
	rect.set('fill', 'red');
	rect.set({ strokeWidth: 5, stroke: 'rgba(100,200,200,0.5)' });
	rect.set('angle', 15).set('flipY', true);

![Demo - Thay đổi thuộc tính của đối tượng](http://fabricjs.com/article_assets/5.png "Thay đổi thuộc tính của đối tượng")

Trước tiên, chúng ta gán thuộc tính "fill" giá trị "red", nghĩa là chúng ta tô màu đỏ cho đối tượng hình chữ nhật. Dòng lệnh tiếp theo là chúng ta "set" giá trị cho cả "stokeWidth" và "stoke", cho hình chữ nhật cái viền rộng 5px với màu xanh nhạt. Sau cùng, chúng ta thay đổi thuộc tính "angle" và "flipY". Chú ý rằng, với 3 statement trên chúng ta dùng 3 syntax hơi khác nhau một chút.

Điều này cho thấy `set` là một phương thức tổng quát. Bạn sẽ thường xuyên sử dụng nó, và do đó, nó phải được thiết kế sao cho thuận tiện nhất có thể.

Chúng ta đã tìm hiểu qua về `setter` và cả `getter`? Rất rõ ràng, ngoài phương thức tổng quá get chúng ta có thể cần những phương thức get* khác. Để đọc, giá trị về chiều rộng của một đối tượng, chúng ta sẽ phải dùng `get('width')` hoặc `getWidth()` Để lấy giá trị "scaleX" - `get('scaleX')` hoặc `getScaleX()` . Ngoài `getWidth` hoặc `getScaleX` chúng ta có thêm các phương thức tương tự cho ("stoke", "strokeWidth", "angle", v.v...)

Bạn có thể chú ý rằng trong các ví dụ trước, các objects được tạo ra với cùng cách cấu hình chỉ với phương thức set Đó là bởi vì nó là giống hệt nhau. Bạn có thể "cấu hình" đối tượng tại thời điểm tạo ra, hoặc sử dụng phương thức `set` sau đó:

	var rect = new fabric.Rect({ width: 10, height: 20, fill: '#f55', opacity: 0.7 });
	
	// or functionally identical
	
	var rect = new fabric.Rect();
	rect.set({ width: 10, height: 20, fill: '#f55', opacity: 0.7 });

###Câc options mặt định

Tại thời điểm này, bạn có thể hỏi - điều gì sẽ xảy ra nếu chúng ta tạo ra đối tượng mà không truyền theo bất kì "cấu hình" object nào. Liệu chúng vẫn có những thuộc tính như đã đề cập?

Tất nhiên là như vậy. Các đối tượng trong Fabric luôn có những thuộc tính với các giá trị được thiết lập mặc định. Khi bỏ qua việc thiết lập các giá trị ban đầu cho đối tượng trong quá trình khởi tạo, các giá trị mặc định của sẽ được gán cho các thuộc tính. Chúng ta có kiểm nghiệm và hiểu theo cách của mình:


[1]: http://fabricjs.com/        "Javascript Canvas Library"
[2]: http://printio.ru
[3]: http://http//www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html

#Giới thiệu về Fabric.js

![Fabrics screenshot](https://github.com/kangax/fabric.js/raw/master/lib/screenshot.png "Fabrics screenshot")

Hôm nay, tôi trân trọng giới thiệu với bạn về [Fabric.js][1] - một thư viện Javascript mạnh mẽ giúp bạn làm thỏa sức sáng tạo trên nền HTML5. Fabric cung cấp các object model (tạm dịch là: mô hình đối tượng) bị thiếu cho canvas, bộ [SVG ][4] parser [để có thể load file svg và vẽ lên canvas, cũng như chuyển canvas thành là svg], các layer tương tác, và nhiều đồ chơi, công cụ khác. Fabric là open source, giấy phép MIT, với sự cộng tác trong nhiều năm của các lập trình viên khác trên thế giới.

Tôi bắt đầu phát triển bộ thư viện này khoảng 3 năm trước, khi cảm thấy hết sức đuối khi phải làm việc trên những hàm native của canvas. Váo thời điểm đó, tôi bắt đầu làm về [printio.ru][2] - một dự án startup cho phép người dùng có thể thiết kế mẫu áo quần trực tiếp. Với các tính năng mà chỉ xuất hiện trên Flash vào thời điểm đó. Thậm chí giờ đây có rất ít người biết được rằng với Fabric gần như chúng ta có thể làm được như Flash.

Vậy hãy "soi" kỹ hơn,

##Tại sao nên dùng Fabric hay là các vấn đề Canvas?

Ngày nay, [Canvas][3] cho phép chúng ta tạo ra thỏa sức sáng tạo những chức năng đồ họa tuyệt vời chạy trên nền trình duyệt web. Nhưng sử dụng API của nó, có nghĩa là bạn phải sử dụng ở mức độ thấp những hàm cơ bản mà nó cung cấp. Nếu bạn chỉ muốn về một vài cái hình đơn giản như tròn, vuông... thì bạn có thể bỏ qua những gì tôi vừa nói, và quên đi bài viết này. Nhưng nếu bạn muốn làm điều gì đó phức tạp và ấn tượng hơn thì bạn nên tiếp tục đọc những phần tiếp theo bên dưới.

Bởi vì, Fabric được thiết kế nhằm để giải quyết những vấn đề này.

Những phương thức cơ bản của Canvas cho phép chúng ta tạo ra những lệnh đồ họa cơ bản, cho phép chúng ta theo thác trực tiếp lên đó như là ảnh bitmap (rất khó dịch sát nghĩa ý đồ tác giả chỗ này). Nếu bạn muốn vẽ một hình chữ nhật? Sử dụng hàm này: `fillRect(left, top, width, height)`. Còn nếu muốn vẽ một đường thẳng? Bạn cần sử dụng kết hợp hai hàm sau: `moveTo(left, top)` và `lineTo(x, y)`. Đó là nếu chúng ta vẽ trên canvas với **cây cọ (brush)**, với nhiều lớp, nhiều chất liệu rất khó kiểm soát trong trường hợp này (lời người dịch: giống như họa sỉ vẽ một bức tranh vậy).

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

Tới đây, bạn thấy kết quả là chúng ta vẽ được hai hình chữ nhật giống nhau có cùng kích thước. Tuy nhiên, bạn có thể thấy được sự khác nhau giữa các cách tiếp cận trên canvas. Với các phương thức native, chúng ta thao thác trên một context - một đối tượng đại diện cho một thể hiện(instance) của canvas bitmap. Với Fabric, chúng ta thao tác trên đối tượng(ở ví dụ này là: Rect) - khởi tạo chúng, thay đổi các thuộc tính của chúng, và thêm chúng vào canvas. Và bạn có thể thấy được những đối tượng này là các lớp đầu tiên trong thế giới của Fabric.

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

Tất cả những gì chúng ta phải làm với Fabric là gán giá trị 45 độ cho thuộc tính "angle" của đối tượng. So với phương pháp sử dụng các native API, điều này rõ ràng là dễ và tự nhiên hơn. Bạn nhớ rằng, chúng ta không thể hoạt động trên các đối tượng trên canvas (các đối tượng của Fabric là các đối tượng được mô phỏng). Với việc sử dụng các native API, chúng ta thực hiện tinh chỉnh "position" và "angle" của toàn bộ canvas bitmap (ctx.translate , ctx.rotate ) cho phù hợp với những gì chúng ta cần. Rồi sau đó, chúng ta vẽ hình chữ nhật lần nữa, vẫn gán giá trị offset là (-10, 10) và hình chữ nhật vẫn phải vẽ tại vị trí (100, 100). Chúng ta còn phải chuyển đổi đơn vị "degree" sang "radian" khi xoay trên canvas bitmap. (Lời người dịch: Quá nhiều phiền phức với nhiều thao tác).

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

Sự khác biệt này khá quan trọng. Với Fabric, chúng ta không cần phải xóa bỏ (trong từ từ tẩy xóa) nội dung đã vẽ trước đó trước khi muốn chỉnh sửa một nội dung nào đó. Chúng ta vẫn làm việc với các đối tượng, đơn giản là thay đổi những thuộc tính của chúng, và cuối cùng là vẽ lại cái canvas để được một tấm hình mới.

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

##Thao tác trên đối tượng

Tạo các đối tượng đồ họa - hình chữ nhật, hình tròn, hay một hình khác - chỉ mới là bước khởi đầu. Một lúc nào đó, chúng ta sẽ cần phải thay đổi chúng. Một hành động nào đó sẽ trigger sự sự thay đổi của trạng thái, hay là tạo ra animation the một sự xếp đặt có ý đồ nào đó. Hoặc chúng ta cho phép thay đổi thuộc tính của các đối tượng (bao gồm: màu sắc, độ trong suốt, kích thước, vị trí) khi tương tác bằng con chuột.

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

Bạn có thể chú ý rằng trong các ví dụ trước, các object được tạo ra với cùng cách cấu hình chỉ với phương thức `set`. Đó là bởi vì nó là giống hệt nhau. Bạn có thể "cấu hình" đối tượng tại thời điểm tạo ra, hoặc sử dụng phương thức `set` sau đó:

	var rect = new fabric.Rect({ width: 10, height: 20, fill: '#f55', opacity: 0.7 });
	
	// or functionally identical
	
	var rect = new fabric.Rect();
	rect.set({ width: 10, height: 20, fill: '#f55', opacity: 0.7 });

##Các option mặc định

Tại thời điểm này, bạn có thể hỏi - điều gì sẽ xảy ra nếu chúng ta tạo ra đối tượng mà không truyền theo bất kì "cấu hình" object nào. Liệu chúng vẫn có những thuộc tính như đã đề cập?

Tất nhiên là như vậy. Các đối tượng trong Fabric luôn có những thuộc tính với các giá trị được thiết lập mặc định. Khi bỏ qua việc thiết lập các giá trị ban đầu cho đối tượng trong quá trình khởi tạo, các giá trị mặc định của sẽ được gán cho các thuộc tính. Chúng ta có kiểm nghiệm và hiểu theo cách của mình:

	var rect = new fabric.Rect(); // notice no options passed in
	
	rect.getWidth(); // 0
	rect.getHeight(); // 0
	
	rect.getLeft(); // 0
	rect.getTop(); // 0
	
	rect.getFill(); // rgb(0,0,0)
	rect.getStroke(); // null
	
	rect.getOpacity(); // 1

Hình chữ nhật của chúng ta có một tập mặc định các thuộc tính. Nó được đặt tại vị trí (0,0), màu đen, độ trong suốt bằng 1, không có viền (stroke = 0), và "không có kích thước" (chiều rộng và cao bằng 0) Vì không có kích thước, chúng ta không thể nhìn thấy nó trên canvas. Chỉ cần gán cho nó bất kì một giá trị dương (>0) cho chiều rộng và chiều cao bạn sẽ thấy một hình chữ nhật màu đen xuất hiện tại góc trái phía trên của canvas.

![Hình chữ nhật](http://fabricjs.com/article_assets/6.png)

###Hệ thống phân cấp và kế thừa

Các đối tượng trong Fabric không chỉ tồn tại độc lập với nhau. Chúng tạo thành một hệ thống phân cấp.

Hầu hết các đối tượng được kế thừa từ một gốc `fabric.Object`. `fabric.Object` đại diện cho hình dạng hai chiều, đặt trong một canvas hai chiều. Nó là một đối tượng với các thuộc tính như left/top và width/height, cũng như một loạt các đặc điểm đồ họa khác. Những thuộc tính mà chúng ta thấy trên các đối tượng - fill, stroke, angle, opacity, flip*, v.v... - được thừa hưởng cho tất cả đối khác trong Fabric mà nó kế thừa từ `fabric.Object`.

Sự kế thừa này cho phép chúng ta định nghĩa các phương thức chung trên `fabric.Object` và chia sẻ cho các "lớp" con. Ví dụ, nếu bạn muốn có `getAngleInRadians` phương thức cho tất cả các đối tượng, đơn giản là bạn chỉ cần thêm chúng vào `fabric.Object.prototype`:

	fabric.Object.prototype.getAngleInRadians = function() {
	  return this.getAngle() / 180 * Math.PI;
	};
	
	var rect = new fabric.Rect({ angle: 45 });
	rect.getAngleInRadians(); // 0.785...
	
	var circle = new fabric.Circle({ angle: 30, radius: 10 });
	circle.getAngleInRadians(); // 0.523...
	
	circle instanceof fabric.Circle; // true
	circle instanceof fabric.Object; // true

Bạn có thể thấy, phương thức này ngay lập tức có luôn trên tất cả các thể tiện (instance) khác. (Lời người dịch: Đây là đặt điểm của ngôn ngữ Javascript)

Trong khi các "lớp" con thừa kế từ lớp `fabric.Object` , chúng cũng có thể định nghĩa các phương thức và thuộc tính của riêng chúng. Ví dụ, `fabric.Circle` cần phải có thuộc "radius"(bán kính). Và `fabric.Image` - chúng ta sẽ tìm hiểu về nó sau - cần có phương thức `getElement/setElement` để  `get/set` <img> HTML từ các ảnh nguồn.

##Canvas

Chúng ta đã hiểu về các object một cách chi tiết, bây giờ, quay trở lại với vấn đề của canvas.

Điều đầu tiên, bạn có thể thấy trong tất cả các ví dụ cần tạo ra một đối tượng canvas - `new fabric.Canvas('...')`. `fabric.Canvas` được xem như là một wrapper của phần tử <canvas>, và chịu trách nhiệm quản lý tất cả các đối tượng trên canvas. Nó cần id, và trả về một instance của `fabric.Canvas`.

Chúng ta có thể `add` đối tượng vào nó, `reference` chúng, và `remove` chúng:

	var canvas = new fabric.Canvas('c');
	var rect = new fabric.Rect();
	
	canvas.add(rect); // add object
	
	canvas.item(0); // reference fabric.Rect added earlier (first object)
	canvas.getObjects(); // get all objects on canvas (rect will be first and only)
	
	canvas.remove(rect); // remove previously-added fabric.Rect

Trong khi quản lý các đối tượng là mục đích chính của `fabric.Canvas`, nó cũng cho phép cấu hình chính nó. Nếu cần set thuộc tính màu nền hay hình ảnh cho toàn bộ canvas? Clip tất cả nội dung vào một khu vực nhất định? Thiết lập chiều rộng và chiều cao? Cho phép canvas có được tương tác hay không? Tất cả các tùy chọn này (và những cái khác) có thể được thiết lập trên `fabric.Canvas`, tại thời điểm khởi tạo hoặc sau đó:

	var canvas = new fabric.Canvas('c', {
	  backgroundColor: 'rgb(100,100,200)',
	  selectionColor: 'blue',
	  selectionLineWidth: 2
	  // ...
	});
	
	// or
	
	var canvas = new fabric.Canvas('c');
	canvas.backgroundImage = 'http://...';
	canvas.onFpsUpdate = function(){ /* ... */ };
	// ...
##Tương tác

Trong khi chúng ta đang ở chủ đề về phần tử canvas, hãy bàn về sự tương tác. Một trong những tính năng độc đáo của Fabric - đó là xây dựng ngay bên trong - là một lớp tương tác trên top của tất cả những đối tượng, mà chúng ta được nhìn thấy.

Mô hình đối tượng tồn tại để cho phép lập trình để truy xuất và thao tác đến các đối tượng trên canvas. Nhưng ở bên ngoài, ở góc độ người sử dụng, có một cách để thao tác các đối tượng thông qua chuột (hoặc chạm, trên các thiết bị cảm ứng). Ngay sau khi bạn khởi tạo canva thông qua `new fabric.Canvas('...')`, có thể chọn các đối tượng, kéo thả, làm co giãn hay xoay chúng, và thậm chí cả nhóm với nhau để thao tác trong cùng một nhóm!

![Thao tác trên một đối tượng](http://fabricjs.com/article_assets/7.png "Thao tác trên một đối tượng")
![Thao tác trên nhóm đối tượng](http://fabricjs.com/article_assets/8.png "Thao tác trên một đối tượng")

Nếu chúng ta muốn cho phép người sử dụng có thể khéo thả gì đó trên canvas - giả một cái ảnh - thì tất cả những gì chúng ta phải là là khởi tạo canvas, và thêm cái đối tượng ảnh đó vào nó. Mà không cần phải thêm bất kì thiết lập nào khác.

Để kiểm soát tương tác này, chúng tôi có thể sử dụng thuộc tính "selection" của Fabric trên cavas kết hợp với thuộc tính "selectable" trên mỗi object riêng rẽ.

	var canvas = new fabric.Canvas('c');
	...
	canvas.selection = false; // disable group selection
	rect.set('selectable', false); // make object unselectable

Nhưng nếu bạn không muốn cho người sử dụng tương tác với nó. Trong trường hợp này, bạn có thể thay thế lớp `fabric.Canvas` với lớp `fabric.StaticCanvas`. Cú pháp để khởi tạo là hoàn toàn giống nhau, bạn chỉ cần sử dụng **StaticCanvas** thay vì **Canvas**.

	var staticCanvas = new fabric.StaticCanvas('c');
	
	staticCanvas.add(
		new fabric.Rect({
			width: 10, height: 20,
			left: 100, top: 100,
			fill: 'yellow',
			angle: 30
	}));

  }));

Điều này tạo ra một phiên bản light của canvas, không quản lý bất kì sự kiện logic nào. Lưu ý rằng, bạn có thể làm việc với các đối tượng  như thêm, xóa, hay thay đổi chúng, cũng như là thay đổi bất kì cấu hình nào của canvas - tất cả những điều này sẽ vẫn work. Chỉ là các xử lý liên quan đến sự kiện sẽ không còn nữa.

Sau này, khi chúng ta đi đến các tùy chọn custom build , bạn sẽ thấy rằng nếu StaticCanvas là tất cả các bạn cần, bạn thậm chí sẽ còn tạo ra một phiên bản nhẹ hơn của Fabric. Điều này có thể là một lựa chọn đẹp, nếu bạn cần một cái gì đó như biểu đồ mà không cần phải tương tác, hoặc hình ảnh không tương tác chỉ với các bộ lọc trong ứng dụng của bạn.

##Images

Nói về hình ảnh ...

Thêm hình chữ nhật và hình tròn trên canvas là niềm vui nhưng tại sao chúng ta không thử với một vài hình ảnh? Như bạn có thể hình dung lúc này, với Fabric thực hiện điều này khá dễ. Hãy tạo ra một thực thể của đối tượng `fabric.Image` và thêm nó vào canvas:

(html)

	<canvas id="c"></canvas>
	<img src="my_image.png" id="my-image">

(js)

	var canvas = new fabric.Canvas('c');
	var imgElement = document.getElementById('my-img');
	var imgInstance = new fabric.Image(imgElement, {
	  left: 100,
	  top: 100,
	  angle: 30,
	  opacity: 0.85
	});
	canvas.add(imgInstance);

Hãy chú ý cách chúng ta truyền một phần tử hình ảnh vào phương thức khởi tạo (constructor) của lớp `fabric.Image`. Điều này tạo ra một thể hiện của `fabric.Image` trông giống như hình ảnh từ document (DOM). Hơn nữa, chúng ta ngay lập tức gán giá trị left=100, top=100, xoay một góc 30 độ, và độ mờ là 0,85. Sau khi thêm vào canvas, một hình ảnh được vẽ tại vị trí (100,100), có góc xoay 30 độ, và có một chút transparent "nhẹ"! Không quá tệ đúng không?

![Hình ảnh trong Fabric](http://fabricjs.com/article_assets/9.png)

Bây giờ, nếu chúng ta không thực sự có một hình ảnh trong Document, mà chỉ có một URL của hình ảnh? Không sao. Hãy xem làm thế nào để xử dụng phương thức `fabric.Image.fromURL`:

	fabric.Image.fromURL('my_image.png', function(oImg) {
	  canvas.add(oImg);
	});

Trông khá đơn giản, phải không? Chỉ cần gọi đến phương thức `fabric.Image.fromURL` với một URL của hình ảnh, và cung cấp cho nó một **callback function** để triệu gọi một khi hình ảnh được tải về và tạo ra. Callback function sẽ nhận đối tượng `fabric.Image` vừa được tạo ra như là tham số đầu tiên. Vào thời điểm đó, bạn có thể thêm nó vào canvas hoặc thay đổi nó, và sau đó thêm vào canvas:

	fabric.Image.fromURL('my_image.png', function(oImg) {
		// scale image down, and flip it, before adding it onto canvas
		oImg.scale(0.5).setFlipX(true);
		canvas.add(oImg);
	});

##Path và PathGroup

Chúng tôi đã xem xét một số đối tượng hình dạng đơn giản, sau đó là hình ảnh. Còn về những hình dạng và nội dung phức tạp cũng như phong phú hơn thì sao?

Hãy cùng gặp gỡ về cặp đôi quyền lưc - Path và PathGroup.

Path trong Fabric đại diện cho một phác thảo của một hình dạng có thể được fill, stroke, và được chính sửa theo nhiều cách khác nhau. Đường dẫn bao gồm một loạt các lệnh, mà chủ yếu mô phỏng một cây bút đi từ điểm này đến điểm khác. Với sự giúp đỡ của các lệnh như "move", "line", "curve", hoặc "arc", đường dẫn có thể tạo thành hình dạng vô cùng phức tạp. Và với sự giúp đỡ của các nhóm Path (của PathGroup), sẽ mở ra cho bạn nhiều khả năng.

Đường dẫn trong Fabric gần giống với các phần tử <path> của SVG . Chúng sử dụng cùng một tập các lệnh, chúng có thể được tạo ra từ các phần tử <path>, và tuần tự vào chúng. Chúng ta sẽ đi vào sâu hơn về thứ tự và SVG parser sau, nhưng lúc này, có điều đáng chú ý với bạn là, bạn ít khi nào phải tạo ra những Path bằng tay (Lời người dịch: bạn sẽ dùng một phần mềm nào đó như Inkscape). Thay vào đó, bạn sẽ sử dụng bộ SVG parser được tạo sẳn của Fabric. Nhưng để hiểu được đối tượng Path là gì, chúng ta hãy thử tạo ra một cái đơn giản bằng tay:

	var canvas = new fabric.Canvas('c');
	var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z');
	path.set({ left: 120, top: 120 });
	canvas.add(path);

![Một path về hình tam giác](http://fabricjs.com/article_assets/10.png)

Chúng ta tạo một thực thể của đối tượng `fabric.Path`, truyền vào nó một chuỗi của những path instructions. Trong có vẻ phức tạp, nhưng nó rất dễ hiểu. "M" đại diện cho lệnh "move", và nó bảo cây bút chì vô hình di chuyển đến điểm (0,0). "L" là viết tắt của "Line" và nó cầm cây bút chì vẽ một đường thẳng tới điểm (200, 100) (Nhớ là ban đầu cây bút chì được move lại điểm (0,0)). Sau đó, một "L" khác tạo ra một đường thẳng đến điểm (170, 200). Cuối cùng, "z" bảo cây bút chì vẽ bút vẽ một đường để đóng lại cái path hiện tại và hoàn thành cái hình dạng. Kết quả là, chúng ta có được một hình tam giác.

Vì `fabric.Path` cũng giống như bất kỳ đối tượng khác trong Fabric, chúng ta cũng có thể thay đổi các thuộc tính của nó. Thậm chí là nhiều hơn:

	...
	var path = new fabric.Path('M 0 0 L 300 100 L 200 300 z');
	...
	path.set({ fill: 'red', stroke: 'green', opacity: 0.5 });
	canvas.add(path);

![Do more with Path](http://fabricjs.com/article_assets/11.png)

Tò mò phải không, chúng ta hãy xem xét một cú pháp đường dẫn hơi phức tạp hơn. Bạn sẽ thấy lý do tại sao việc tạo ra đường dẫn bằng tay có thể không phải là ý tưởng tốt.

	...
	var path = new fabric.Path('M121.32,0L44.58,0C36.67,0,29.5,3.22,24.31,8.41\
	c-5.19,5.19-8.41,12.37-8.41,20.28c0,15.82,12.87,28.69,28.69,28.69c0,0,4.4,\
	0,7.48,0C36.66,72.78,8.4,101.04,8.4,101.04C2.98,106.45,0,113.66,0,121.32\
	c0,7.66,2.98,14.87,8.4,20.29l0,0c5.42,5.42,12.62,8.4,20.28,8.4c7.66,0,14.87\
	-2.98,20.29-8.4c0,0,28.26-28.25,43.66-43.66c0,3.08,0,7.48,0,7.48c0,15.82,\
	12.87,28.69,28.69,28.69c7.66,0,14.87-2.99,20.29-8.4c5.42-5.42,8.4-12.62,8.4\
	-20.28l0-76.74c0-7.66-2.98-14.87-8.4-20.29C136.19,2.98,128.98,0,121.32,0z');
	
	canvas.add(path.set({ left: 100, top: 200 }));

Ở trên là điều gì vậy? Bạn thấy rối rối rồi đúng không? Và còn đuối với bài viết quá dài này nữa?

À, "M" vẫn còn là viết tắt của lệnh "move", do đó cây bút chì bắt đầu cuộc hành trình vẽ của mình tại điểm (121,32, 0). Sau đó có chữ "L" mang nó đến điểm (44.58, 0). Đến đây vẫn còn khá dễ dàng với bạn. Thế tiếp theo là gì? Lệnh "C", lệnh viết tắt của "cubic bezier". Nó làm cho bút vẽ đường cong Bezier từ điểm hiện tại đến "36.67, 0". Nó sử dụng điểm (29,5, 3.22) như điểm kiểm soát ở đầu dòng, và (24.31, 8.41) như các điểm kiểm soát ở cuối dòng. Những điều này được tạo ra bởi hàng tá của các lệnh "cubic bezier" khác, cuối cùng là nó tạo ra một hình dạng trong có vẻ đẹp của **một mũi tên**.

```Lời người dịch: Tốt nhất là dùng phần mềm cho lành```
	
![Một mũi tên với Path](http://fabricjs.com/article_assets/12.png)


Rất may, là bạn sẽ không phải làm việc trực tiếp với những con quái vật này. Thay vào đó, bạn có thể muốn sử dụng một cái gì đó các phương thức như `fabric.loadSVGFromString` hoặc `fabric.loadSVGFromURL` để tải toàn bộ tập tin SVG được tạo ra sẳn bằng phần mềm bởi các designer, và để bộ phân tích cú pháp SVG của Fabric làm công việc của chính là nó đi qua các phần tử SVG và tạo ra các path tương ứng.

Đề cập về toàn bộ SVG document, trong khi Path trong Fabric đại diện cho phần tử path của SVG, một tập hợp các path thì đại diện cho một tập các SVG document, được đại diện như PathGroups (các thể hiện của `fabric.PathGroup`). Như bạn có thể hình dung, PathGroup thật ra chỉ là một nhóm của các đối tượng Path. Và vì `fabric.PathGroup` được thừa kế từ `fabric.Object`, nó có thể được thêm vào cavans giống như bất kỳ các đối tượng nào khác, và thao tác cùng cách thức.


Cũng giống như với Path, bạn hoàn toàn không cần phải làm việc trực tiếp với chúng. Nhưng nếu bạn vấp ngã khi một sau khi phân tích tài liệu SVG, bạn sẽ biết chính xác nó là gì và mục đích mà đến Trái Đất của nó.

##Lời bạt

Chúng ta chỉ vừa bàn sơ qua bề nổi về những gì mà Fabric có thể. Bây giờ bạn có thể dễ dàng tạo ra bất kỳ hình dạng đơn giản, phức tạp, hay hình ảnh, thêm chúng vào canvas, và sửa đổi theo bất kỳ cách mà bạn muốn - vị trí, kích thước, góc độ, màu sắc, nét, độ mờ - hoặc do bạn tạo ra (viết một method riêng của mình).

Trong những phần tiếp theo của loạt bài này, chúng ta sẽ có một cái nhìn về làm việc theo nhóm các phần tử, hoạt hình (animation), văn bản (text), phân tích cú pháp SVG, dựng hình, tuần tự, các sự kiện, các bộ lọc hình ảnh, và nhiều điều khác nữa...

Trong khi đó, hãy thoải mái để xem các bản [nanotated demo](http://fabricjs.com/demos/) hoặc [benchmark](http://fabricjs.com/benchmarks/), tham gia các cuộc thảo luận trong [google group](https://groups.google.com/forum/?fromgroups#!forum/fabricjs) hoặc ở [bất kì đâu](http://stackoverflow.com/questions/tagged/fabricjs), hoặc đi thẳng cho [docs](http://fabricjs.com/docs/), [wiki](https://github.com/kangax/fabric.js/wiki), và [source](https://github.com/kangax/fabric.js).

Hãy có những trải nghiệm vui vẻ với Fabric! Tôi hi vọng bạn sẽ tận hưởng nhiều điều thú vị trên con đường lập trình viên của mình.


[1]: http://fabricjs.com/        "Javascript Canvas Library"
[2]: http://printio.ru
[3]: http://http//www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
[4]: http://en.wikipedia.org/wiki/Scalable_Vector_Graphics

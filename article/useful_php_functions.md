# Viết code PHP dễ đọc hơn

Thường code PHP rất khó đọc cho những ai nhào vô hốt vỏ ốc của người đi trước. Bài viết này sẽ nhằm cung cấp cho bạn cách viết code sao cho thằng khác khi đọc code của bạn sẽ không bị ức chế. Hehe...

Đừng nghe thiên hạ chém gió rằng, viết thế này thế kia mới tốt... hiệu quả mới cao tốn ít CPU hơn. Nhưng khoa học đã chỉ ra rằng. Chả có ai quan tâm tới mấy cái đó hết. Optimize dựa trên những điều kiện giả tưởng là một chuyện rất nông nổi. Và tát nhiên, hơn 80% vấn đề chương trình bạn bị chầm là vì những điều khác.

## 1. Đừng cộng những chuỗi dài ngoằn.

Vì đôi khi cuộc sống đưa đẩy, chúng ta viết rất nhiều đoạn code nhập nhằng, như bến dưới:

	$str = 'Đây là giá trị của biến 1: ' . $var1 . '  và đây là giá trị của biến 2: '. $var2
			. ". Và cả một cái khác nữa $var3 .";

Thật sự rất khó đọc. Trong quá kứ nhiều lần nổ lực, tôi còn thậm chí viết thế này:
	
	$str = printf('Đây là giá trị của biến 1: %s và đây là giá trị của biến 2: %s. Và cả một cái khác nữa %s .',
				$var1, 	$var2, $var3
			);
	
Đến đầy bạn nghĩ như vậy cũng đã là khá hơn rồi. Nhưng như vậy vẫn còn có thể gặp vấn đề khác. Nhất là khi thay đổi code, bạn rất bối rối khi thêm vào một biến, chả biết giờ phải đặt cái biến của mình ở vị trí số mấy. Và tương tự khi remove một giá trị ra.

Hàm tốt hơn trong ngữ cảnh này là:
	
	$str = strtr(('Đây là giá trị của biến 1: :var1 và đây là giá trị của biến 2: :var2. Và cả một cái khác nữa :var3 .'
			, array(
				':var1' => $var1,
				':var2' => $var2,
				':var3' => $var3
			));

Tôi tin rằng hàm này dễ đọc và dễ dửa hơn rất nhiều. Thêm một cái $var4, $var5 và bỏ bớt cái $var2 cũng chẳng sao.

## 2. Hãy truyền theo cả một Object

## 3. Truyền cho tham số cho function ở dạng Array

### 3.1 Ưu điểm
Lợi ích của chuyện này là. Nó khắc phục được vấn đề khi bạn truyền function các tham số dạng như:

	function foo($var1, $var2, $var3 = 'default', $var4 = 'default', $var5 = 'default')

Sẽ dẫn đén việc thêm bớt vào một biến là rất khó. Với lại khi truyền biến vào, bạn cần phải nhớ thứ tự của nó.
Tên biến thường phải trùng với tên param. Rất chi là nhiêu khê. Đó là lý do bạn cần phải truyền một cái array.
	
	function foo($params)

### 3.2 Nhược điểm

Nhược điểm của cách viết hàm này là. Hãy lắng nghe thằng bên cạnh nó nói:

> 1. WTF? Tao phải truyền vô những key và value nào.
> 2. WTH? Sao tao phải truyền nhiều param thế này. Không có default value à?

### 3.3 Hướng giải quyết:

Nghe có vẻ căng thẳng nhưng vấn đề trên không phải là do cái cách làm ở trên. Chúng ta sẽ quay lại vấn đề này, sau khi đọc tiếp về phần 4. Bạn sẽ được trang up level, rồi sau đó trang bị đủ giáp và mana để xúc nó.

## 4. Các hàm xử lý Array bạn nên biết

Điểm hấp dẫn nhất của PHP theo mình là Array, và hầu như trong code, mọi thứ đều là key => value. Do vậy mà bạn biết thêm những hàm built-in rẳng của PHP, mà xử lý cho lẹ là điều hết sức quan trọng. Nếu không, thay vì tập trung vào cái cần làm, bạn lại hì bục sáng tạo ra những cái hàm, ban đầu chỉ là để cho xong task, hoặc là xa hơn là để tự sướng. Nhưng kết quả là, rất ức chế cho thằng khác, vì nó phải suy nghĩ cái đó là cái gì?

### 4.1 array_merge
	
Đó là khi bạn muốn merge các giá trị của một array này lên một array khác.

	$array = array(
		'red'	=> 'red',
		'green' => '#00FF00',
		'blue'	=> '#0000FF'
	);
	$another = array(
		'red' 	=> '#FF0000',
		'pink'	=> '#FF00FF'
	);
	$array = array_merge($array, $another);
	
Giờ đây $array sẽ là:
	
	$array = array(
		'red' 	=> '#FF0000',#red được update
		'green' => '#00FF00',
		'blue'	=> '#0000FF',
		'pink'	=> '#FF00FF'#pink được thêm vào
	);

> Hàm này rất là có gía trị trong rất nhiều trường hợp, như bạn cần build <next page> cho một cái gridview với phải giữ lại nhiều số như sort, search bạn chỉ cần gọi:

	$this->curentUrl().'?'.http_build_query($_GET, @$_GET['page']+1);
	
### 4.2 Toán tử + (cộng)

Lấy ví dụ 4.1, chúng ta thay vì xài array_merge thì xài toản tử cộng thì sao:

	$array = array(
		'red'	=> 'red',
		'green' => '#00FF00',
		'blue'	=> '#0000FF'
	);
	$another = array(
		'red' 	=> '#FF0000',
		'pink'	=> '#FF00FF'
	);
	$array = $array + $another;

Giờ đây $array sẽ là:
	
	$array = array(
		'red' 	=> 'red',
		'green' => '#00FF00',
		'blue'	=> '#0000FF',
		'pink'	=> '#FF00FF'#Chỉ có duy nhất pink được thêm vào
	);
	
> Ý nghĩ của toán tử này là, nó chỉ thêm vào các giá trị mà nó chưa có mà không ghi đề lên các grá trị cũ.

### 4.3 array_fill

Muốn tạo một array từ 10 phần tử với giá trị ban đầu là 0, bạn chỉ cần:

	$array = array_fill(0,10,0);

### 4.4 Chỉ dùng những key xác định trong một Array

Ví dụ như khi bạn cần update rất nhiều một lại một loạt các column trong một table, nhưng mà cái params truyền vào có thể dư một số cột cần thiết, và loại bỏ những cột không cần thiết. Kỹ thuật bên dưới đây sẽ giúp bạn điều đó:

## 5. Vui chơi giải trí với các kiểu debug trong PHP

### 5.1 die() - Một quyền tự xác trong PHP

Ai cũng biết rằng tự xác là để biết biết chắc rằng đọa code chỗ này được gọi.

### 5.2 var_dump() rồi die()

Cái này thường thấy nhất cho những lúc suy sụp của PHP Developer. Muốn biết cái biến đó có giá trị gì trước lúc chết.

> Bất lực với những giải pháp thời đồ đá.
> dump() và die() là những giải pháp rất chi là mệt, sau này bạn xài các framework và PHP thế hệ mới bạn không biết một function của bạn được được gọi khi nào, ai gọi, ở đâu... Đó là lúc bạn cần nghĩ đến 

### 5.3 Debug với Exception

Thông thường các lập trình viên sẽ nghĩ là Exception là khi mình viết code xử lý sai gì đó, cái PHP nó show lên Exception. Ừ đúng, nhưng mà như vậy là còn thiếu.

Thông thường, nếu một chúng ta có thể ném ra một Exception, nếu mà chúng ta thấy một biến nào đó không thõa điều kiện mong đợi, ví dụ bên dưới.

	if( !($param instanceof Foo) )
	{
		throw new Exception('$param should be an Foo instance.')
	}

Nhưng nếu bạn đang debug, bạn muốn trace back thì bạn có thể:

	new Exception('Tự xác ở đây...');#Tại đây bạn biết được nguyên nhân gây ra cái chết, và thủ phạm.

Chương trình của bạn sẽ die ở đó, và PHP sẽ in ra màn hình trace back để bạn từ từ mà suy ngẫm.

## Tổng kết:

Trước khi đi tới lời kết, xin cảm ơn vì bạn đã dành thời gian đọc bài viết này. Và rất mong nhận được feedback các kiểu. Chúng tôi không ngại bị ném đá, sỉ nhục, thậm chí là khen tặng.

Và để giải quyết cho vấn đề 3.3, tôi xin dùng một kỹ thuật như sau, kỹ thuật này tôi học được từ jQuery với code Javascript, nhưng với PHP thì rất chi là ổn:

	function foo($params){
		$default_params = array(
			'var3' => 'default',
			'var4' => 'default',
			'var5' => 'default'
		);
		//array_merge chỗ này tương ứng với $.extend trong jQuery
		$params = array_merge($default_params, $params);#Kỹ thuật được học từ 4.1
		
		//@todo Xử lý tiếp bên dưới
	}
	
Chúc các bạn một cuối tuần nhiều niềm vui.

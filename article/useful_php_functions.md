# Viết code PHP dễ đọc hơn

Thường code PHP rất khó đọc cho những ai nhào vô hốt vỏ ốc của người đi trước. Bài viết này sẽ nhằm cung cấp cho bạn cách viết code sao cho thằng khác khi đọc code của bạn sẽ không bị ức chế. Hehe...

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
	
	$str = strtr(('Đây là giá trị của biến 1: :var1 và đây là giá trị của biến 2: :var2. Và cả một cái khác nữa :var3 .
			, array(
				':var1' => $var1,
				':var2' => $var2,
				':var3' => $var3
			));

Tôi tin rằng hàm này dễ đọc và dễ dửa hơn rất nhiều. Thêm một cái $var4, $var5 và bỏ bớt cái $var2 cũng chẳng sao.


  

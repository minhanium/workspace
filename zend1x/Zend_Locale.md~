# Hiểu về Zend_Locale

## Lấy tên quốc gia từ mã quốc gia (code)

Ví dụ nếu như bạn muốn lấy lấy được kết quả trả về là Viet Nam từ mã quốc gia là VN

1. Bạn có thể lấy ra từ cách sau:
    
    $locale = Zend_Registry::get('Zend_Locale');
    echo $locale->getTranslation('VN','country');

2. Hoặc là dùng hàm sau:
	
	$arrCountries   = Zend_Locale::getTranslationList('territory', Zend_Registry::get('Zend_Locale'), 2); 
	echo $arrCountries['VN'];

Cách thứ hai hiệu quả hơn trong điều kiện bạn phải lấy ra nhiều tên của quốc gia cùng lúc. Bạn cũng có thể yên tâm rằng, liệu lần nào nó cũng đọc file XML data lên và parse dữ liệu vậy có ảnh hưởng đến performance hay không? Rất may mặc định là Zend Locale dùng file cache để không phải làm lại việc đọc file, và parse dữ liệu tốn kém đó.

## Xóa cache của Zend Locale

Mặc định, Zend Locale sử dụng file cache trong 1h, do đó nêu như bạn thấy VN trả về Vietnam, bạn muốn sử thành Viet Nam mà không thấy nó thay đổi sau khi đã điên cuồng sửa. Thì bạn có thể vào thư /temp để xóa những file cache, ví dụ trên mặc định trên Linux:

	$ cd /temp
	$ sudo rm -rf zend_cache*












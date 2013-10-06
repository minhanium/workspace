Một số hướng dẫn về Nodjes

1. Cách viết cacbkack function

  Tránh nesting code trong if else nhất có thể. Bởi vì việc if else quá hiều lớp sẽ dẫn đến code rất khó đọc

  function(error, response)
  {
    if( !error)
    {
      //@todo your code here
    }
    else 
    {
      //@todo your code here
    }
  }
  
  function(error, response)
  {
    if( error)
    {
      //@todo your code here
      return;
    }
    //@todo your code here
  }

2. Kiểm tra một biến không empty

Trong javascript tồn tại hai khái niệm có thể làm bạn phân vân: undefined & null

Do đó thay vì

  if( a !== undefined && a !== null && a !== 0 && a !== '' )
  {
  
  }
  
Bạn chỉ cần viết

  if( a ) 
  {
  
  }
  
3. Gán giá trị default:

  Thông thường các bạn sẽ if else hoặc là ? :
  Nhưng cách tốt hơn có thể là:
  a = x || 1;
  

  

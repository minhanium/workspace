# Đăng nhập & đăng kí tài khoản

## Cho phép user đăng nhập sử dụng tài khoản:

1. Google
2. Facebook

Sau khi đăng nhập người sử dụng (user) có thể chọn một trong hai loại tài khoản sau:

1. Developer
2. Reviewer

## Đăng kí tài khoản Developer

### Form đăng kí:

1. Email:
    - Mỗi email đã xác thực thành công chỉ được đăng ký một tài khoản duy nhất
2. iTunes nickname
3. iTunes country
4. Free/Paid app:
    - Free app
    - Paid app
    - Both free and paid app
5. Password
6. Confirm password

### Submit

1. Validate on Browser
2. Validate on Server
    - Nếu không phải đăng nhập từ thông qua Google, Facebook thì cần send email xác thực
    - Send email to confirm

> Chỗ này yêu cầu #dev phải sẽ phải gởi cho #PM yêu cầu kỹ thuât như cho phép:    
> 1. Cho phép cấu hình email như thế nào để send được email     
> 2. Cơ chế để xác định một email chỉ được đăng kí một lần duy nhất là thế nào. Nếu một ai đó cố tình đăng kí tài bằng email của người khác mà không bao giờ xác thực được thì sao?

### Confirm email
1. Sau khi confirm email, tài khoản được xem là valid.
2. Cho phép người ta cancel cái email active nếu không phải là email của họ

## Setting and Editing Profile

Cho phép user edit được profile của mình và setting thêm các thông số khác:

1. Change password
2. Register nhận newsleter

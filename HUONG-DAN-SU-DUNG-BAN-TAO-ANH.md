# RACCOONIE — BẢN TẠO ẢNH SẢN PHẨM

Phiên bản này chỉ dùng để custom sản phẩm và tạo ảnh cho xưởng. Không có thanh toán, đặt hàng, tra cứu đơn hoặc chọn âm thanh. Website hoạt động tĩnh, không cần Supabase.

## Đưa lên GitHub và Netlify

1. Giải nén thư mục và đưa toàn bộ code lên một repository GitHub.
2. Trong Netlify chọn **Add new site → Import an existing project**.
3. Chọn repository vừa tạo. Netlify tự đọc cấu hình trong `netlify.toml`.
4. Không cần thêm Environment Variables.
5. Bấm **Deploy**.

## Cách sử dụng

1. Tại trang chủ chọn một sản phẩm.
2. Chọn số phím và bộ màu.
3. Nhập chữ hoặc chọn icon cho từng phím.
4. Bấm **Chụp ảnh sản phẩm** để tải PNG rõ nét về máy, hoặc **Copy ảnh** để dán trực tiếp vào phần mềm/chat hỗ trợ.

Tên file PNG tự chứa slug sản phẩm, số phím và mã màu để xưởng dễ đối chiếu.

## Thêm sản phẩm sau này

1. Copy file `src/products/custom-clicker.ts` thành một file sản phẩm mới.
2. Đổi `id`, `slug`, `name`, hình ảnh, bảng màu và các lựa chọn cần thiết.
3. Mở `src/products/productRegistry.ts`, import sản phẩm mới và thêm vào mảng `PRODUCTS`.
4. Đặt ảnh sản phẩm trong `public/products/<slug-san-pham>/`.

Sản phẩm mới sẽ tự xuất hiện trong danh sách chọn sản phẩm ở trang chủ.

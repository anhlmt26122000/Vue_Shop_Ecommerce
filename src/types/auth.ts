// src/types/auth.ts (Hoặc định nghĩa trực tiếp trong authService.ts)

// Request Payloads
export interface AuthenticationRequest {
    username: string;
    password?: string; // Password có thể tùy chọn nếu dùng cơ chế khác (refresh token?)
                       // Dựa theo code Java của bạn thì là bắt buộc.
                       // Nên để là `password: string;` nếu luôn cần.
  }
  
  export interface IntrospectRequest {
    token: string;
  }
  
  export interface LogoutRequest {
    token: string;
  }
  
  // Response Payloads (Nội dung của trường 'result')
  export interface AuthenticationResponse {
    token: string;
    authenticated: boolean; // Thường có trường này, thêm vào nếu backend trả về
    // Các thông tin khác về user nếu cần
  }
  
  export interface IntrospectResponse {
    valid: boolean;
    // Các thông tin khác từ token nếu backend trả về (ví dụ: username, roles)
  }
  
  // Cấu trúc tổng quát của API Response từ backend
  export interface ApiResponse<T> {
    result: T;
    code?: number; // Thêm các trường khác nếu backend có trả về
    message?: string;
  }
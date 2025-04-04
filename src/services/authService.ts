import axios, { AxiosInstance, AxiosError } from 'axios';
import type {
  AuthenticationRequest,
  IntrospectRequest,
  LogoutRequest,
  AuthenticationResponse,
  IntrospectResponse,
  ApiResponse,
} from '@/types/auth'; // Đường dẫn tới file types nếu bạn tách ra

// --- Hoặc định nghĩa types trực tiếp ở đây nếu không tách file ---
/*
interface AuthenticationRequest { username: string; password?: string; }
interface IntrospectRequest { token: string; }
interface LogoutRequest { token: string; }
interface AuthenticationResponse { token: string; authenticated?: boolean; }
interface IntrospectResponse { valid: boolean; }
interface ApiResponse<T> { result: T; code?: number; message?: string; }
*/
// ------------------------------------------------------------------

// Cấu hình URL cơ sở của backend API
const API_URL: string = 'http://localhost:8080/auth'; // Thay đổi nếu backend chạy ở port khác

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm để đăng nhập
const login = async (credentials: AuthenticationRequest): Promise<AuthenticationResponse> => {
  try {
    // Chỉ định kiểu dữ liệu mong đợi trong data của response
    const response = await apiClient.post<ApiResponse<AuthenticationResponse>>('/token', credentials);

    // Kiểm tra cấu trúc response trước khi trả về result
    if (response.data && response.data.result && response.data.result.token) {
      return response.data.result; // Trả về { token: "...", authenticated: true/false }
    } else {
      console.error("Login response format incorrect:", response.data);
      throw new Error("Login failed: Invalid response format");
    }
  } catch (error) {
    // Xử lý lỗi Axios để lấy thông tin chi tiết hơn
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse<any>>; // Cast để truy cập response.data
      console.error('Login API error:', axiosError.response?.data || axiosError.message);
      // Ném lại lỗi với message từ backend nếu có, hoặc message mặc định
      throw new Error(axiosError.response?.data?.message || 'Login failed');
    } else {
      // Lỗi không phải từ Axios (ví dụ: lỗi mạng, lỗi code phía client)
      console.error('Login unexpected error:', error);
      throw new Error('An unexpected error occurred during login.');
    }
  }
};

// Hàm để kiểm tra token (introspect)
const introspectToken = async (token: string): Promise<IntrospectResponse> => {
  try {
    const requestPayload: IntrospectRequest = { token };
    const response = await apiClient.post<ApiResponse<IntrospectResponse>>('/introspect', requestPayload);

    if (response.data && response.data.result) {
       return response.data.result; // Trả về { valid: true/false }
    } else {
       console.error("Introspect response format incorrect:", response.data);
       // Trả về invalid nếu format sai
       return { valid: false };
    }
  } catch (error) {
     if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        console.error('Introspect API error:', axiosError.response?.data || axiosError.message);
     } else {
        console.error('Introspect unexpected error:', error);
     }
    // Nếu có lỗi (4xx, 5xx, network error), coi như token không hợp lệ
    return { valid: false };
  }
};

// Hàm để đăng xuất
const logout = async (token: string): Promise<void> => {
  try {
    const requestPayload: LogoutRequest = { token };
    // Backend trả về ApiResponse<Void>, nên không cần quan tâm response.data.result
    await apiClient.post<ApiResponse<void>>('/logout', requestPayload);
    console.log('Logout request sent successfully.');
  } catch (error) {
    // Có thể bỏ qua lỗi logout ở client, chỉ cần log lại
     if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiResponse<any>>;
        console.error('Logout API error:', axiosError.response?.data || axiosError.message);
     } else {
        console.error('Logout unexpected error:', error);
     }
     // Không cần throw lỗi ra ngoài, vì client sẽ xóa token bất kể kết quả gọi API
  }
};

export default {
  login,
  introspectToken,
  logout,
  apiClient // Export cả apiClient để dùng cho các service khác nếu cần
};

// Optional: Export các type nếu định nghĩa trong file này
// export type { AuthenticationRequest, AuthenticationResponse, ... };
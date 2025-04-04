<template>
  <div class="login-page"> <!-- Thẻ div gốc bao quanh -->
    <!-- Không cần thẻ <head> và <body> trong template của component Vue -->
    <form @submit.prevent="handleLogin"> <!-- Ngăn submit mặc định, gọi handleLogin -->
      <h3>Login Here</h3>

      <label for="username">Username</label>
      <!-- Sử dụng v-model để liên kết dữ liệu -->
      <input type="text" placeholder="Username" id="username" v-model="username" required>

      <label for="password">Password</label>
      <!-- Sử dụng v-model để liên kết dữ liệu -->
      <input type="password" placeholder="Password" id="password" v-model="password" required>

      <!-- Vô hiệu hóa nút khi đang loading, thay đổi text -->
      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Log In' }}
      </button>
      <button type="button" class="register" @click="goToRegister" :disabled="loading">Register</button> <!-- Thêm type="button" để không submit form -->

      <!-- Hiển thị thông báo lỗi nếu có -->
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="social-text">Login with a social media account</p>
      <div class="social-icons">
        <button type="button" class="social-icon fb"><i class="fa-brands fa-facebook"></i></button>
        <button type="button" class="social-icon tw"><i class="fa-brands fa-twitter"></i></button>
        <button type="button" class="social-icon in"><i class="fa-brands fa-instagram"></i></button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import authService from "@/services/authService"; // Đảm bảo đường dẫn này đúng
import type { AuthenticationResponse } from "@/types/auth"; // Import kiểu nếu cần
import "@/assets/css/style.css";

export default Vue.extend({
  name: "LoginPage",
  data() {
    return {
      username: "" as string, // Khởi tạo giá trị và kiểu dữ liệu
      password: "" as string,
      loading: false as boolean, // Trạng thái loading
      errorMessage: "" as string, // Thông báo lỗi
    };
  },
  mounted() {
    document.title = "Login";
  },
  methods: {
    goToRegister(): void {
      if (this.loading) return; // Không cho chuyển trang khi đang login
      this.$router.push("/register");
    },
    async handleLogin(): Promise<void> {
      // Kiểm tra lại nếu cần (dù đã có required)
      if (!this.username || !this.password) {
        this.errorMessage = "Please enter both username and password.";
        return;
      }

      this.loading = true; // Bắt đầu loading
      this.errorMessage = ""; // Xóa lỗi cũ

      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };
        const authResult: AuthenticationResponse = await authService.login(credentials);

        if (authResult && authResult.token) {
          // 1. Lưu token (ví dụ: vào localStorage)
          localStorage.setItem("authToken", authResult.token);
          console.log("Login successful, token stored.");

          // (Tùy chọn) Cập nhật trạng thái global (Vuex/Pinia) nếu có

          // 2. Điều hướng đến trang được bảo vệ (ví dụ: Dashboard)
          // Đảm bảo bạn đã cấu hình route '/dashboard' trong router
          this.$router.push("/dashboard");

        } else {
          // Trường hợp API trả về thành công nhưng không có token (ít xảy ra với logic hiện tại)
          this.errorMessage = "Login failed: No token received.";
        }
      } catch (error: any) {
        // Hiển thị lỗi từ authService (đã bao gồm message từ backend nếu có)
        this.errorMessage = error.message || "Login failed. Please check your credentials or server status.";
        console.error("Login failed:", error);
      } finally {
        this.loading = false; // Kết thúc loading dù thành công hay thất bại
      }
    },
  },
});
</script>



<style scoped>
/* Thêm style cho thông báo lỗi nếu cần */
.error-message {
  color: red;
  margin-top: 10px;
  font-size: 0.9em;
}

/* Style cho nút bị vô hiệu hóa */
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;

}

h3 label {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
  color:black;
}
.login-page {
  background-image: url('https://raw.githubusercontent.com/CiurescuP/LogIn-Form/main/bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh; /* đảm bảo full chiều cao */
  display: flex;
  align-items: center;
  justify-content: center;
}
button{
  margin-top: 10px;
}

</style>



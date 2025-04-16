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
import axios from 'axios';
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
    document.title = "Login"; // Đặt tiêu đề trang
  },
  methods: {
    goToRegister(): void {
      if (this.loading) return; // Không cho chuyển trang khi đang login
      this.$router.push("/register");
    },
    async handleLogin() {
      this.loading = true; // Bật loading khi bắt đầu đăng nhập
      this.errorMessage = ""; // Reset thông báo lỗi trước khi gửi yêu cầu

      try {
        // Gửi yêu cầu POST đến API kiểm tra username và password
        const response = await axios.post("http://localhost:8080/api/auth/token", {
          username: this.username,
          password: this.password,
        });

        // Kiểm tra nếu có token trong response (điều kiện có thể thay đổi tuỳ API của bạn)
        if (response.data.result.token){
          // Lưu token vào localStorage hoặc Vuex nếu cần thiết
          localStorage.setItem("authToken", response.data.result.token);

          // Redirect đến trang HomePage.vue
          this.$router.push("/home");
        } else {
          // Nếu không có token, thông báo lỗi
          this.errorMessage = "Invalid username or password";
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          this.errorMessage = 'Incorrect username or password. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      } finally {
        this.loading = false; // Tắt loading khi hoàn tất
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



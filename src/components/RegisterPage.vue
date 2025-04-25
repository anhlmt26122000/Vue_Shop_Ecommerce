<template>
  <div class="register-page">


<form @submit.prevent="registerUser">
    <h3>Register here</h3>

    <label for="username">Username</label>
    <input type="text" placeholder="Username" id="username" required v-model="username">

    <label for="password">Password</label>
    <input type="password" placeholder="Password" id="password" required  v-model="password">

    <label for="password">Confirm Password</label>
    <input type="password" placeholder="Confirm Password" id="confirm-password" required v-model="confirmPassword">

    <label for="email">Email</label>
    <input type="email" placeholder="Email" id="email" required v-model="email">

    <label for="first-name">First Name</label>
    <input type="text" placeholder="First Name" id="first-name" required v-model="firstName">

    <label for="last-name">Last Name</label>
    <input type="text" placeholder="Last Name" id="last-name" required v-model="lastName">

    <label for="address">Address</label>
    <input type="text" placeholder="Address" id="address" required v-model="address">


  <button type="submit" :disabled="loading">Register</button>
  <button  @click="goToLoginPage">Back to Login Page</button>
  <p v-if="errorMessage" :class="messageType" class="error-message">
    {{ errorMessage }}
  </p>

  <!-- Loading spinner -->
  <div v-if="loading" class="loading-spinner">
    <span>Loading...</span>
  </div>
</form>
<div v-if="registrationSuccess" class="popup">
      <p>Registration successful!
        <br>
        You will be redirected to the login page shortly.
      </p>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

export default Vue.extend({
  name: 'RegisterPage',
  mounted() {
    document.title = "Register"; // Đặt tiêu đề trang
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      errorMessage: '',
      messageType: '',
      loading: false,  // Trạng thái loading
      registrationSuccess: false
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.showMessage('Passwords do not match', 'error');
        return;
      }

      this.loading = true;  // Bắt đầu loading
      try {
        const response = await axios.post('http://localhost:8080/api/users', {
          username: this.username,
          password: this.password,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address
        });

        if (response.status === 200) {
          this.registrationSuccess = true; // Đặt biến thành true khi đăng ký thành công
          setTimeout(() => {
            this.registrationSuccess = false; // Ẩn popup sau 3 giây
            this.goToLoginPage(); // Chuyển hướng về trang đăng nhập
          }, 5000);
        }
      } catch (error: any) {
        this.showMessage( error.response.data.message, 'error');
      } finally {
        this.loading = false;  // Dừng loading sau khi hoàn thành
      }
    },

    goToLoginPage() {
      // Chuyển hướng về trang đăng nhập
      this.$router.push("/");
    },

    showMessage(errorMessage: string, type: string) {
      this.errorMessage = errorMessage;
      this.messageType = type;
    }
  }
});
</script>

<style scoped>
.register-page {
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
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
label {
  display: block;
  margin-top: 10px;
}
</style>








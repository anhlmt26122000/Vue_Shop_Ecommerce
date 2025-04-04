<template>
  <div class="register-page">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register Form</title>
</head>
<body>
<form>
    <h3>Register here</h3>

    <label for="username">Username</label>
    <input type="text" placeholder="Username" id="username">

    <label for="password">Password</label>
    <input type="password" placeholder="Password" id="password">

    <label for="password">Confirm Password</label>
    <input type="password" placeholder="Confirm Password" id="confirm-password">

  <button>Register</button>
  <button  @click="goToLoginPage">Back to Login Page</button>
</form>
</body>

</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "RegisterPage",
  mounted() {
    document.title = "Register"; // Đổi tiêu đề trang
  },
  methods: {
    goToLoginPage(): void {
        this.$router.push("/"); // Điều hướng khi bấm Register
      },
    },
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
</style>








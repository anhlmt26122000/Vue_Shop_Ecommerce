<template>
  <div class="sidebar">
    <h2>Admin Dashboard</h2>
    <ul>
      <li><router-link to="/adminCategory" class="side-category">Categories</router-link></li>
      <li><router-link to="/adminProduct" class="side-product">Products</router-link></li>
      <li><router-link to="/adminUser" class="side-category">Users</router-link></li>
      <button class="btn-logout" @click="logout">Logout</button>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  name: "AdminNav",
  data() {
    return {
      token: localStorage.getItem("authToken"),
    };
  },
  methods: {
    logout() {
      if (!this.token) {
      console.error("No token found");
      return;  // Nếu không có token thì không gửi yêu cầu
      }
      axios.post("http://localhost:8080/api/auth/logout", {
        token: this.token,
      })
        .then(response => {
          console.log("Logout successful:", response.data);
          localStorage.removeItem("token"); // Xóa token khỏi localStorage
          axios.defaults.headers.common['Authorization'] = '';  // Xóa token khỏi tất cả các yêu cầu tiếp theo
          this.$router.push("/"); // Chuyển hướng về trang đăng nhập
        })
        .catch(error => {
          console.error("Logout failed:", error);
          // Xử lý lỗi nếu cần
        });
    }
  }
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.sidebar ul {
  list-style: none;
  padding-left: 0;
}

.sidebar ul li {
  margin: 15px 0;
}

.sidebar ul li a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  display: block;
  padding: 10px;
  border-radius: 5px;
}

.sidebar ul li a:hover {
  background-color: #34495e;
}

.router-link-exact-active {
  background-color: #34495e;
  /* Màu nền khi trang hiện tại được chọn */
}

.btn-logout {
  margin-top: 20%;
  width: 100%;
  color: aliceblue;
  background-color: #2843a5;
  margin-bottom: 2%;
}

.btn-logout:hover {
  background-color: #e74c3c;
}
</style>
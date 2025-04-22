<template>
    <div class="container">
        <!-- Sidebar -->
        <div class="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li><router-link to="/adminCategory" class="side-category">Categories</router-link></li>
                <li><router-link to="/adminProduct" class="side-product">Products</router-link></li>
                <li><router-link to="/adminUser" class="side-category">Users</router-link></li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <button class="btn-logout">Logout</button>
            <div id="users" class="content-section">
                <h3>Users Management</h3>
                <p>Manage your users here.</p>
                <button class="btn-add">Add</button>
                <table class="category-table">
                    <thead>
                        <tr>
                            <th class="col-stt">STT</th>
                            <th>ID</th>
                            <th>Username</th>
                            <th class="col-email">Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user,index) in users" :key="user.id">
                            <td>{{ index+1 }}</td>
                            <td>{{ user.id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.address }}</td>
                            <td><a href="abc"><img src="@/assets/img/pencil.png" class="action" title="Edit"></a>
                                <a href="abc"><img src="@/assets/img/bin.png" class="action" title="Delete"></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
    name: "AdminUserPage",
    data() {
        return {
            users: [] as { id: number; username: string; email:string ;firstName: string; lastName: string;
                address:number }[], // Directly defining the array type without an interface
        };
    },
    // Hàm lấy dữ liệu từ API
    created() {
            // Lấy token từ localStorage
            const token = localStorage.getItem("authToken");

            // Nếu token tồn tại, thực hiện yêu cầu với token trong header
            if (token) {
                axios.get('http://localhost:8080/api/users', {
                    headers: {
                        'Authorization': `Bearer ${token}`  // Gửi token qua header Authorization
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        this.users = response.data.result;
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            } else {
                this.$router.push('/');
            }
    }
});
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
}

.container {
    display: flex;
    min-height: 100vh;
    /* Đảm bảo container chiếm toàn bộ chiều cao của màn hình */
    max-width: 100%;
    /* Đảm bảo container chiếm toàn bộ chiều rộng của màn hình */
    margin: 0;
    padding: 0;
}

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

.main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f4f4f4;
    width: 100%;
}

.content-section {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.content-section.active {
    display: block;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    table-layout: fixed;
}

table th,
table td {
    padding: 15px;
    padding-left: 10px;
    text-align: left;
    border: 1px solid #ddd;
    word-wrap: break-word; /* Cho phép xuống dòng trong các từ dài */
    word-break: break-all; /* Ngắt từ nếu cần */
}

table th {
    background-color: #f4f4f4;
}
.col-stt {
    width: 4%;   /* Cột STT chiếm 5% chiều rộng */
}
.col-email {
    width: 20%;   /* Cột STT chiếm 5% chiều rộng */
}

table .action {
    width: 25px;
    margin-left: 10px;
    height: auto;
    border-radius: 5px;
}

.btn-add {
    float: right;
    width: 10%;
    color: aliceblue;
    background-color: #34495e;
    margin-bottom: 2%;
}

.btn-add:hover {
    background-color: #22caca;
}

.btn-logout {
    float: right;
    width: 10%;
    color: aliceblue;
    background-color: #2843a5;
    margin-bottom: 2%;
}

.btn-logout:hover {
    background-color: #e74c3c;
}

/* popup style */
.popup-form {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.product-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: black;
}

input[type='text'],
input[type='number'],
textarea,
select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f0f0f0;
    /* Màu nền xám */
    color: #000000;
    /* Màu chữ đen */
}

select option {
    color: #000000;
    /* Màu chữ đen */
}

input[type='file'] {
    padding: 5px;
}

.close:hover {
    background-color: #e74c3c;
    color: white;
}

.submit:hover {
    background-color: #2ecc71;
    color: white;
}

.form-container div:last-child {
    display: flex;
    justify-content: space-between;
    /* Đặt 2 nút ngang nhau */
}

button {
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    flex: 0.5;
    /* Cho phép các nút chiếm không gian đều */
}

button+button {
    margin-left: 10px;
    /* Khoảng cách giữa 2 nút */
}

.success-message {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #4caf50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    z-index: 1000;
    opacity: 0.9;
    animation: fadeOut 5s forwards;
}

@keyframes fadeOut {
    0% {
        opacity: 0.9;
    }

    100% {
        opacity: 0;
        display: none;
    }
}

/*  Confirm delete */
.popup-confirm {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
}

.popup-container h3 {
    margin-bottom: 20px;
}

.popup-container div {
    display: flex;
    justify-content: space-between;
    /* Đặt 2 nút ngang nhau */
}

span {
    color: black;
}

.product-form img {
    width: 100px;
    margin-left: 10px;
    height: auto;
    border-radius: 5px;
}

.pagination {
    display: flex;
    justify-content: center;
    /* Căn giữa các nút phân trang */
    align-items: center;
    margin-top: 20px;
    /* Tạo khoảng cách giữa bảng và phân trang */
}

.pagination button {
    width: 10px;
    margin: 0 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination button:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
}

.pagination button:hover {
    opacity: 0.8;
}

.pagination span {
    align-self: center;
    margin: 0 10px;
    font-weight: bold;
}
</style>
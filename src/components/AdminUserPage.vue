<template>
    <div class="container">
        <!-- Sidebar -->
        <AdminNav /> <!-- Use the AdminNav component here -->
        <!-- Main Content -->
        <div class="main-content">
            
            <div id="users" class="content-section">
                <h3>Users Management</h3>
                <p>Manage your users here.</p>
                <button class="btn-add" @click="openAddForm">Add User</button>
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
                        <tr v-for="(user, index) in users" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.firstName }}</td>
                            <td>{{ user.lastName }}</td>
                            <td>{{ user.address }}</td>
                            <td><a href="#" @click.prevent="openEditForm(user.id)"><img src="@/assets/img/pencil.png"
                                        class="action" title="Edit"></a>
                                <a href="#" @click.prevent="openDeleteConfirm(user.id)"><img src="@/assets/img/bin.png"
                                        class="action" title="Delete"></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="pagination">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>

                <span>Page {{ currentPage }} of {{ totalPages }}</span>

                <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>

        <!-- Popup form for adding User -->
        <div v-if="showAddForm" class="popup-form">
            <div class="form-container">
                <form @submit.prevent="addUser" class="user-form">
                    <h3>Add User</h3>
                    <div class="form-group">
                        <label for="username">UserName:</label>
                        <input v-model="user.username" type="text" id="username" required />
                    </div>

                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input v-model="user.password" type="password" id="password">
                    </div>

                    <div class="form-group">
                        <label for="confirm-password">Confirm Password:</label>
                        <input v-model="user.confirmPassword" type="password" id="confirm-password">
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input v-model="user.email" id="email" type="text">
                    </div>

                    <div class="form-group">
                        <label for="first-name">First Name:</label>
                        <input v-model="user.firstName" id="first-name" type="text">
                    </div>

                    <div class="form-group">
                        <label for="last-name">Last Name:</label>
                        <input v-model="user.lastName" id="last-name" type="text">
                    </div>

                    <div class="form-group">
                        <label for="address">Address:</label>
                        <textarea v-model="user.address" id="address"></textarea>
                    </div>

                    <p v-if="errorMessage" :class="messageType" class="error-message">
                        {{ errorMessage }}
                    </p>

                    <div>
                        <button type="button" @click="closeAddForm" class="close">Close</button>
                        <button type="submit" class="submit" :disabled="isSubmitting">Add</button>
                    </div>

                </form>
            </div>
        </div>

        <!-- Popup form for Edit User -->
        <div v-if="showEditForm" class="popup-form">
            <div class="form-container">
                <form @submit.prevent="editUser" class="user-form">
                    <h3>Edit User</h3>
                    <div class="form-group">
                        <label for="username">UserName:</label>
                        <input v-model="editedUser.username" type="text" id="username" required />
                    </div>

                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input v-model="editedUser.password" type="password" id="password">
                    </div>

                    <div class="form-group">
                        <label for="confirm-password">Confirm Password:</label>
                        <input v-model="editedUser.confirmPassword" type="password" id="confirm-password">
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input v-model="editedUser.email" id="email" type="text">
                    </div>

                    <div class="form-group">
                        <label for="first-name">First Name:</label>
                        <input v-model="editedUser.firstName" id="first-name" type="text">
                    </div>

                    <div class="form-group">
                        <label for="last-name">Last Name:</label>
                        <input v-model="editedUser.lastName" id="last-name" type="text">
                    </div>

                    <div class="form-group">
                        <label for="address">Address:</label>
                        <textarea v-model="editedUser.address" id="address"></textarea>
                    </div>

                    <p v-if="errorMessage" :class="messageType" class="error-message">
                        {{ errorMessage }}
                    </p>

                    <div>
                        <button type="button" @click="closeEditForm" class="close">Close</button>
                        <button type="submit" class="submit" :disabled="isSubmitting">Edit</button>
                    </div>

                </form>
            </div>
        </div>

        <!-- Success message popup -->
        <div v-if="successMessage" class="success-message">
            {{ successMessage }}
        </div>

        <!-- Popup confirm Delete -->
        <div v-if="showDeleteConfirm" class="popup-confirm">
            <div class="popup-container">
                <h3>Are you sure you want to delete this User?</h3>
                <div>
                    <button @click="closeDeleteConfirm" class="close">Close</button>
                    <button @click="deleteUser">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import AdminNav from "@/components/AdminNav.vue"; // Import AdminNav component

export default Vue.extend({
    name: "AdminUserPage",
    components: {
    AdminNav, 
    },
    data() {
        return {
            currentPage: 1,  // Trang hiện tại
            itemsPerPage: 5,  // Số lượng mục trên mỗi trang
            totalPages: 1, // Tổng số trang, mặc định là 1
            totalItems: 0, // Tổng số sản phẩm, sẽ được cập nhật từ API
            token: localStorage.getItem("authToken") || '',  // Khai báo token tại data
            users: [] as {
                id: string; username: string; password: string; email: string; firstName: string; lastName: string;
                address: string
            }[], // Directly defining the array type without an interface
            showAddForm: false,
            showEditForm: false,
            userToEdit: null,
            user: {
                id: '',
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                address: ''
            },
            editedUser: {
                id: '',
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                address: ''
            },
            successMessage: '',
            showDeleteConfirm: false,
            userToDelete: '',
            isSubmitting: false,
            errorMessage: '',
            messageType: '',
        };
    },
    // Hàm lấy dữ liệu từ API
    created() {
        document.title = "Admin - Users Management";
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            // Nếu token tồn tại, thực hiện yêu cầu với token trong header
            if (this.token) {
                axios.get('http://localhost:8080/api/users/page', {
                    params: {
                        page: this.currentPage,
                        size: this.itemsPerPage,  // Số lượng mục trên mỗi trang
                    },
                    headers: {
                        'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        this.users = response.data.result.content;
                        this.totalItems = response.data.result.totalElements;  // Tổng số sản phẩm từ 
                        if (response.data.result.totalElements === 0) {
                            this.successMessage = "No User found";  // Hiển thị thông báo không tìm thấy sản phẩm
                            setTimeout(() => {
                                this.successMessage = '';  // Ẩn thông báo sau 5 giây
                            }, 7000);
                        }
                        else this.totalPages = response.data.result.totalPages // Tổng số page từ API
                    })
                    .catch((error) => {
                        console.error('Error fetching users:', error);
                    });
            } else {
                this.$router.push('/');
            }
        },
        changePage(page: number): void {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.fetchUsers();
        },
        openAddForm() {
            this.showAddForm = true;
        },

        // Function to close the form
        closeAddForm() {
            this.showAddForm = false;
            this.user = {
                id: '',
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                address: ''
            };
        },
        openEditForm(userId: string) {
            // Tìm user cần chỉnh sửa và điền vào form
            const user = this.users.find(u => u.id === userId);
            if (user) {
                this.editedUser = { ...user, confirmPassword: '' };  // Sao chép thông tin sản phẩm vào editedUser;
                this.showEditForm = true;
            }
        },
        // Đóng form chỉnh sửa
        closeEditForm() {
            this.showEditForm = false;
            this.editedUser = {
                id: '',
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                firstName: '',
                lastName: '',
                address: ''
            };
        },
        addUser() {
            if (this.user.password !== this.user.confirmPassword) {
                this.showMessage('Passwords do not match', 'error');
                return;
            }
            this.isSubmitting = true;  // Bắt đầu gửi yêu cầu
            // Nếu token tồn tại, thực hiện yêu cầu với token trong header
            if (this.token) {
                const userData = {
                    username: this.user.username,
                    password: this.user.password,
                    email: this.user.email,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    address: this.user.address
                };
                axios.post('http://localhost:8080/api/users', userData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        this.users.push(response.data);  // Thêm sản phẩm mới vào danh sách
                        this.successMessage = "User added successfully!";  // Hiển thị thông báo thành công
                        setTimeout(() => {
                            this.successMessage = '';  // Ẩn thông báo sau 5 giây
                        }, 5000);
                        this.closeAddForm();  // Đóng form sau khi thêm sản phẩm thành công
                        this.fetchUsers();  // Tải lại danh sách sản phẩm
                    })
                    .catch((error) => {
                        console.error('Error adding user:', error);
                    })
                    .finally(() => {
                        this.isSubmitting = false;  // Kết thúc gửi yêu cầu
                    });
            } else {
                this.$router.push('/');
            }
        },
        editUser() {
            if (this.editedUser.password !== this.editedUser.confirmPassword) {
                this.showMessage('Passwords do not match', 'error');
                return;
            }
            this.isSubmitting = true;  // Bắt đầu gửi yêu cầu
            // Nếu token tồn tại, thực hiện yêu cầu với token trong header
            if (this.token) {
                const userData = {
                    username: this.editedUser.username,
                    password: this.editedUser.password,
                    email: this.editedUser.email,
                    firstName: this.editedUser.firstName,
                    lastName: this.editedUser.lastName,
                    address: this.editedUser.address
                };
                axios.put(`http://localhost:8080/api/users/${this.editedUser.id}`, userData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,  // Gửi token qua header Authorization
                        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        const index = this.users.findIndex(p => p.id === this.editedUser.id);
                        if (index !== -1) {
                            this.users[index] = response.data.result;  // Cập nhật user trong danh sách
                            this.successMessage = "Edit successfully";  // Hiển thị thông báo thành công
                            setTimeout(() => {
                                this.successMessage = '';  // Ẩn thông báo sau 7 giây
                            }, 7000);
                            this.closeEditForm();  // Đóng form sau khi gửi yêu cầu
                        }
                    })
                    .catch((error) => {
                        console.error('Error fetching categories:', error);
                    });
            } else {
                this.$router.push('/');
            }
        },
        showMessage(errorMessage: string, type: string) {
            this.errorMessage = errorMessage;
            this.messageType = type;
        },
        openDeleteConfirm(userId: string) {
            this.userToDelete = userId;  // Lưu ID của sản phẩm cần xóa
            this.showDeleteConfirm = true;  // Hiển thị popup xác nhận xóa
        },
        closeDeleteConfirm() {
            this.showDeleteConfirm = false;  // Đóng popup xác nhận xóa
            this.userToDelete = '';  // Đặt lại ID sản phẩm cần xóa
        },
        deleteUser() {
            if (this.userToDelete) {
                axios.delete(`http://localhost:8080/api/users/${this.userToDelete}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                    }
                })
                    .then(() => {
                        // Nếu API trả về dữ liệu hợp lệ
                        this.users = this.users.filter(user => user.id !== (this.userToDelete as string));  // Ép kiểu nếu cần thiết
                        this.successMessage = "User deleted successfully!";  // Hiển thị thông báo thành công
                        setTimeout(() => {
                            this.successMessage = '';  // Ẩn thông báo sau 5 giây
                        }, 5000);
                        this.closeDeleteConfirm();  // Đóng popup xác nhận xóa
                        this.fetchUsers();  // Tải lại danh sách sản phẩm
                    })
                    .catch((error) => {
                        console.error('Error deleting product:', error);
                    });
            }
        },
    },
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
    word-wrap: break-word;
    /* Cho phép xuống dòng trong các từ dài */
    word-break: break-all;
    /* Ngắt từ nếu cần */
}

table th {
    background-color: #f4f4f4;
}

.col-stt {
    width: 4%;
    /* Cột STT chiếm 5% chiều rộng */
}

.col-email {
    width: 20%;
    /* Cột STT chiếm 5% chiều rộng */
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

.user-form {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
    height: 30%;
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
    width: 100%;
    /* Đảm bảo phần tử này chiếm toàn bộ chiều rộng của phần tử chứa */
    margin-top: 10px;
    /* Đảm bảo có khoảng cách giữa các phần tử */
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
    flex: 1;
    /* Cho các nút chiếm không gian đều hơn */
    display: inline-block;
    margin-right: 10px;
    /* Đảm bảo có khoảng cách giữa 2 nút */
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

.user-form img {
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

/* Thêm style cho thông báo lỗi nếu cần */
.error-message {
    color: red;
    font-size: 12px;
}
</style>
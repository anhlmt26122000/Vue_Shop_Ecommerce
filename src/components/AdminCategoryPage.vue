<template>
    <div class="container">
        <!-- Sidebar -->
        <AdminNav />
        <!-- Main Content -->
        <div class="main-content">
            <div id="categories" class="content-section">
                <h3>Categories Management</h3>
                <p>Manage your categories here.</p>
                <button class="btn-add" @click="openAddForm">Add Category</button>
                <table>
                    <thead>
                        <tr>
                            <th class="stt">STT</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th class="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(category, index) in categories" :key="category.id">
                            <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                            <td>{{ category.name }}</td>
                            <td>{{ category.description }}</td>
                            <td> <img :src="require(`@/assets/img/${category.image}`)" alt="Image" v-if="category.image"
                                    class="product" />
                                <span v-else>No Image</span>
                            </td>
                            <td><a href="#" @click.prevent="openEditForm(category.id)"><img
                                        src="@/assets/img/pencil.png" class="action" title="Edit"></a>
                                <a href="#" @click.prevent="openDeleteConfirm(category.id)"><img
                                        src="@/assets/img/bin.png" class="action" title="Delete"></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Phân trang -->
            <div class="pagination">
                <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>

                <span>Page {{ currentPage }} of {{ totalPages }}</span>

                <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
            </div>
        </div>

        <!-- Popup form for adding category -->
        <div v-if="showAddForm" class="popup-form">
            <div class="form-container">
                <form @submit.prevent="addCategory" class="category-form">
                    <h3>Add Category</h3>
                    <div>
                        <label for="name">Name:</label>
                        <input v-model="category.name" type="text" id="name" required />
                    </div>

                    <div>
                        <label for="description">Description:</label>
                        <textarea v-model="category.description" id="description"></textarea>
                    </div>

                    <div>
                        <label for="image">Image:</label>
                        <input type="file" @change="onFileChange($event, 'category')" id="image" />
                        <!-- Hiển thị hình ảnh nếu có -->
                        <div v-if="category.image">
                            <img :src="require(`@/assets/img/${category.image}`)" alt="Selected Image" />
                        </div>
                        <span v-else>No image selected</span>
                    </div>


                    <div>
                        <button type="button" @click="closeAddForm" class="close">Close</button>
                        <button type="submit" class="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Popup form for Edit category -->
        <div v-if="showEditForm" class="popup-form">
            <div class="form-container">
                <form @submit.prevent="editCategory" class="category-form">
                    <h3>Edit Category</h3>
                    <div>
                        <label for="name">Name:</label>
                        <input v-model="editedCategory.name" type="text" id="name" required />
                    </div>

                    <div>
                        <label for="description">Description:</label>
                        <textarea v-model="editedCategory.description" id="description"></textarea>
                    </div>

                    <div>
                        <label for="image">Image:</label>
                        <input type="file" @change="onFileChange($event, 'editedCategory')" id="image" />
                        <!-- Hiển thị hình ảnh nếu có -->
                        <div v-if="editedCategory.image">
                            <img :src="require(`@/assets/img/${editedCategory.image}`)" alt="Selected Image" />
                        </div>
                        <span v-else>No image selected</span>

                    </div>

                    <div>
                        <button type="button" @click="closeEditForm" class="close">Close</button>
                        <button type="submit" class="submit">Edit</button>
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
                <h3>Are you sure you want to delete this category?</h3>
                <div>
                    <button @click="closeDeleteConfirm" class="close">Close</button>
                    <button @click="deleteCategory">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import AdminNav from "@/components/AdminNav.vue"; // Import component AdminNav

export default Vue.extend({
    name: "AdminCategoryPage",
    components: {
        AdminNav, // Đăng ký component AdminNav
    },
    data() {
        return {
            currentPage: 1,  // Trang hiện tại
            itemsPerPage: 5,  // Số lượng mục trên mỗi trang
            totalPages: 0, // Tổng số trang, mặc định là 1
            totalItems: 0, // Tổng số sản phẩm, sẽ được cập nhật từ API
            token: localStorage.getItem("authToken") || '',  // Khai báo token tại data
            categories: [] as { id: number; name: string; description: string; image: string }[], // Directly defining the array type without an interface
            showAddForm: false,
            showEditForm: false,
            categoryToEdit: null,  // ID category cần chỉnh sửa
            category: {
                name: '',
                description: '',
                image: '',
            },
            editedCategory: {
                id: null as number | null,
                name: '',
                description: '',
                image: '',
            },  // Dữ liệu của category đang chỉnh sửa
            successMessage: '',  // Biến lưu thông báo thành công
            showDeleteConfirm: false,  // Biến điều khiển popup confirm Delete
            categoryToDelete: null as number | null,  // ID category cần xóa
        };
    },
    // Hàm lấy dữ liệu từ API
    created() {
        document.title = 'Admin Category'; // Đổi tiêu đề trang
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {// Nếu token tồn tại, thực hiện yêu cầu với token trong header
        if (this.token) {
            axios.get(`http://localhost:8080/api/categories/page`, {
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
                    this.categories = response.data.result.content;
                    this.totalItems = response.data.result.totalElements;  // Tổng số sản phẩm từ API
                    this.totalPages = response.data.result.totalPages // Tổng số page từ API
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });
        } else {
            this.$router.push('/');
        }},
        // Phương thức thay đổi trang
        changePage(page: number): void {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.fetchCategories();  // Gọi lại hàm fetchCategories để lấy dữ liệu cho trang mới
        },
        // Function to open the form
        openAddForm() {
            this.showAddForm = true;
        },

        // Function to close the form
        closeAddForm() {
            this.showAddForm = false;
            this.resetForm();
        },
        resetForm() {
            this.category = {
                name: '',
                description: '',
                image: '',
            };
        },
        openEditForm(categoryId: number) {
            // Tìm category cần chỉnh sửa và điền vào form
            const category = this.categories.find(c => c.id === categoryId);
            if (category) {
                this.editedCategory = { ...category };  // Sao chép dữ liệu của category vào form
                this.showEditForm = true;
            }
        },
        // Đóng form chỉnh sửa
        closeEditForm() {
            this.showEditForm = false;
            this.editedCategory = {
                id: null,
                name: '',
                description: '',
                image: '',
            };
        },

        // Function to handle the submission of the form
        addCategory() {
            // Nếu token tồn tại, thực hiện yêu cầu với token trong header
            if (this.token) {
                const categoryData = {
                    name: this.category.name,
                    description: this.category.description,
                    image: this.category.image,  // Giả sử bạn cũng muốn gửi ảnh 
                };
                axios.post('http://localhost:8080/api/categories', categoryData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,  // Gửi token qua header Authorization
                        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        this.categories.push(response.data.result);  // Thêm category mới vào danh sách
                        this.successMessage = "Add successfully";  // Hiển thị thông báo thành công
                        setTimeout(() => {
                            this.successMessage = '';  // Ẩn thông báo sau 5 giây
                        }, 7000);
                        this.closeAddForm();  // Đóng form sau khi gửi yêu cầu
                        this.fetchCategories
                    })
                    .catch((error) => {
                        console.error('Error fetching categories:', error);
                    });
            } else {
                this.$router.push('/');
            }
        },
        editCategory() {
            if (this.token) {
                const categoryData = {
                    name: this.editedCategory.name,
                    description: this.editedCategory.description,
                    image: this.editedCategory.image,  // Giả sử bạn cũng muốn gửi ảnh (dữ liệu này cần được xử lý đặc biệt nếu là file)
                };
                axios.put(`http://localhost:8080/api/categories/${this.editedCategory.id}`, categoryData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,  // Gửi token qua header Authorization
                        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        const index = this.categories.findIndex(c => c.id === this.editedCategory.id);
                        if (index !== -1) {
                            this.categories[index] = response.data.result;  // Cập nhật category trong danh sách
                            this.successMessage = "Edit successfully";  // Hiển thị thông báo thành công
                            setTimeout(() => {
                                this.successMessage = '';  // Ẩn thông báo sau 5 giây
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
        // Hàm xử lý thay đổi file (chọn ảnh)
        onFileChange(event: Event, targetCategory: 'category' | 'editedCategory') {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];

                // Lấy tên tệp (ví dụ: 'hublot_01.img')
                const fileName = file.name;

                // Lưu tên tệp vào category.image
                if (targetCategory === 'category') {
                    this.category.image = fileName;
                } else if (targetCategory === 'editedCategory') {
                    this.editedCategory.image = fileName;
                }

                // (Tùy chọn) Nếu bạn cần lưu trữ tệp hình ảnh vào thư mục trên server, bạn cần thực hiện upload tệp và lấy URL.
                // Trong trường hợp này, bạn chỉ cần lưu tên tệp để tạo đường dẫn động sau này.
            }
        },
        
        // Mở popup confirm Delete
        openDeleteConfirm(categoryId: number) {
            this.categoryToDelete = categoryId;
            this.showDeleteConfirm = true;
        },

        // Đóng popup confirm Delete
        closeDeleteConfirm() {
            this.showDeleteConfirm = false;
            this.categoryToDelete = null;
        },

        // Xử lý xóa category
        deleteCategory() {
            if (this.categoryToDelete) {
                // Giả sử API xóa category với ID
                axios.delete(`http://localhost:8080/api/categories/${this.categoryToDelete}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                    }
                })
                    .then(() => {
                        // Xóa thành công, cập nhật lại danh sách categories
                        this.categories = this.categories.filter(category => category.id !== this.categoryToDelete);
                        this.closeDeleteConfirm();  // Đóng popup confirm
                        this.successMessage = "Delete successfully";  // Hiển thị thông báo thành công
                        setTimeout(() => {
                            this.successMessage = '';  // Ẩn thông báo sau 7 giây
                        }, 7000);
                    })
                    .catch(error => {
                        console.error('Error deleting category:', error);
                    });
            }
        },
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
}

table th {
    background-color: #f4f4f4;
}
table th.stt,th.actions {
    width: 8%;
    text-align: center;
}

table .product {
    width: 50px;
    margin-left: 10px;
    height: auto;
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

.category-form {
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
textarea {
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

.category-form img {
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

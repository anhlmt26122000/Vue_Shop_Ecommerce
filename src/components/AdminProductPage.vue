<template>
    <div class="container">
        <!-- Sidebar -->
        <div class="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li><router-link to="/adminCategory" class="side-category">Categories</router-link></li>
                <li><router-link to="/adminProduct" class="side-product">Products</router-link></li>
                <li><router-link to="/adminUser" class="side-user">Users</router-link></li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <button class="btn-logout">Logout</button>
            <div id="products" class="content-section">
                <h3>Products Management</h3>
                <p>Manage your products here.</p>
                <button class="btn-add" @click="openAddForm">Add Product</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td><img :src="require(`@/assets/img/${product.image}`)" alt="Product Image"
                                    class="product" /></td>
                            <td>{{ product.code }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price }} $</td>
                            <td>{{ product.stock }}</td>
                            <td>{{ product.categoryName }}</td>
                            <td><a href="#" @click.prevent="openEditForm(product.id)"><img src="@/assets/img/pencil.png"
                                        class="action" title="Edit"></a>
                                <a href="#" @click.prevent="openDeleteConfirm(product.id)"><img
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

        <!-- Popup form for adding Product -->
        <div v-if="showAddForm" class="popup-form">
            <div class="form-container">
                <form @submit.prevent="addProduct" class="product-form">
                    <h3>Add Product</h3>
                    <div>
                        <label for="name">Name:</label>
                        <input v-model="product.name" type="text" id="name" required />
                    </div>

                    <div>
                        <label for="description">Description:</label>
                        <textarea v-model="product.description" id="description"></textarea>
                    </div>

                    <div>
                        <label for="image">Image:</label>
                        <input type="file" @change="onFileChange($event, 'product')" id="image" />
                        <!-- Hiển thị hình ảnh nếu có -->
                        <div v-if="product.image">
                            <img :src="require(`@/assets/img/${product.image}`)" alt="Selected Image" />
                        </div>
                        <span v-else>No image selected</span>
                    </div>

                    <div>
                        <label for="price">Price:</label>
                        <input v-model="product.price"  min="0" type="number"
                            id="price" required  />
                    </div>

                    <div>
                        <label for="stock">Stock:</label>
                        <input v-model="product.stock" min="0" type="number"
                            id="stock" required />
                    </div>

                    <div>
                        <label for="categoryName">Category:</label>
                        <select v-model="product.categoryId" id="categoryName" required>
                            <option value="" disabled>Select a category</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>


                    <div>
                        <button type="button" @click="closeAddForm" class="close">Close</button>
                        <button type="submit" class="submit" :disabled="isSubmitting">Add</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Popup form for Edit Product -->
        <div v-if="showEditForm" class="popup-form">
            <div class="form-container">
                <form @submit.prevent="editProduct" class="product-form">
                    <h3>Edit Product</h3>
                    <div>
                        <label for="name">Name:</label>
                        <input v-model="editedProduct.name" type="text" id="name" required />
                    </div>

                    <div>
                        <label for="description">Description:</label>
                        <textarea v-model="editedProduct.description" id="description"></textarea>
                    </div>

                    <div>
                        <label for="image">Image:</label>
                        <input type="file" @change="onFileChange($event, 'editedProduct')" id="image" />
                        <!-- Hiển thị hình ảnh nếu có -->
                        <div v-if="editedProduct.image">
                            <img :src="require(`@/assets/img/${editedProduct.image}`)" alt="Selected Image" />
                        </div>
                        <span v-else>No image selected</span>

                    </div>

                    <div>
                        <label for="price">Price:</label>
                        <input v-model="editedProduct.price" type="number" id="price" required />
                    </div>

                    <div>
                        <label for="stock">Stock:</label>
                        <input v-model="editedProduct.stock" type="number" id="stock" required />
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
                <h3>Are you sure you want to delete this Product?</h3>
                <div>
                    <button @click="closeDeleteConfirm" class="close">Close</button>
                    <button @click="deleteProduct">Delete</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
    name: "AdminProductPage",
    data() {
        return {
            currentPage: 1,  // Trang hiện tại
            itemsPerPage: 5,  // Số lượng mục trên mỗi trang
            totalPages: 1, // Tổng số trang, mặc định là 1
            totalItems: 0, // Tổng số sản phẩm, sẽ được cập nhật từ API
            token: localStorage.getItem("authToken") || '',  // Khai báo token tại data
            products: [] as {
                id: number; code: string; name: string; description: string; image: string;
                price: number; stock: number; categoryId: number; categoryName: string
            }[], // Directly defining the array type without an interface
            showAddForm: false,
            showEditForm: false,
            productToEdit: null,  // ID Product cần chỉnh sửa
            product: {
                id: 0,
                code: '',
                name: '',
                description: '',
                image: '',
                price: 0,
                stock: 0,
                categoryId: 0,
                categoryName: ''
            },
            editedProduct: {
                id: 0,
                code: '',
                name: '',
                description: '',
                image: '',
                price: 0,
                stock: 0,
                categoryId: 0,
                categoryName: ''
            },
            successMessage: '',  // Biến lưu thông báo thành công
            showDeleteConfirm: false,  // Biến điều khiển popup confirm Delete
            productToDelete: null as number | null,  // ID Product cần xóa
            categories: [] as {
                id: number; name: string; description: string; image: string;
            }[], // Danh sách categories
            isSubmitting: false,  // Biến điều khiển trạng thái gửi form

        };
    },
    // Hàm lấy dữ liệu từ API
    created() {
        document.title = 'Admin Product'; // Đổi tiêu đề trang
        this.fetchProducts();
    },
    methods: {
        fetchProducts() {
            if (this.token) {
                axios.get('http://localhost:8080/api/products/page', {
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
                        this.products = response.data.result.content;
                        this.totalItems = response.data.result.totalElements;  // Tổng số sản phẩm từ 
                        if(response.data.result.totalElements === 0) {
                            this.successMessage = "No product found";  // Hiển thị thông báo không tìm thấy sản phẩm
                            setTimeout(() => {
                                this.successMessage = '';  // Ẩn thông báo sau 5 giây
                            }, 7000);
                        }
                        else this.totalPages = response.data.result.totalPages // Tổng số page từ API
                    })
                    .catch((error) => {
                        console.error('Error fetching products:', error);
                    });
            } else {
                this.$router.push('/');
            }
        },

        fetchCategories() {// Nếu token tồn tại, thực hiện yêu cầu với token trong header
            axios.get(`http://localhost:8080/api/categories`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                }
            })
                .then((response) => {
                    // Nếu API trả về dữ liệu hợp lệ
                    this.categories = response.data.result
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });
        },

        changePage(page: number): void {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
            this.fetchProducts();
        },
        // Function to open the form
        openAddForm() {
            this.showAddForm = true;
            this.fetchCategories();  // Gọi hàm lấy danh sách categories khi mở form
        },

        // Function to close the form
        closeAddForm() {
            this.showAddForm = false;
            this.product = {
                id: 0,
                code: '',
                name: '',
                description: '',
                image: '',
                price: 0,
                stock: 0,
                categoryId: 0,
                categoryName: ''
            };
        },
        openEditForm(productId: number) {
            // Tìm product cần chỉnh sửa và điền vào form
            const product = this.products.find(p => p.id === productId);
            if (product) {
                this.editedProduct = { ...product };  // Sao chép thông tin sản phẩm vào editedProduct
                this.showEditForm = true;
            }
        },
        // Đóng form chỉnh sửa
        closeEditForm() {
            this.showEditForm = false;
            this.editedProduct = {
                id: 0,
                code: '',
                name: '',
                description: '',
                image: '',
                price: 0,
                stock: 0,
                categoryId: 0,
                categoryName: ''
            };
        },
        // Function to handle the submission of the form
        addProduct() {
            this.isSubmitting = true;  // Đặt trạng thái gửi form là true
            // Nếu token tồn tại, thực hiện yêu cầu với token trong header
            if (this.token) {
                const productData = {
                    name: this.product.name,
                    description: this.product.description,
                    image: this.product.image,
                    price: this.product.price,
                    stock: this.product.stock,
                    categoryId: this.product.categoryId
                };
                axios.post('http://localhost:8080/api/products', productData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,  // Gửi token qua header Authorization
                        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        this.products.push(response.data.result);  // Thêm product mới vào danh sách
                        this.successMessage = "Add successfully";  // Hiển thị thông báo thành công
                        setTimeout(() => {
                            this.successMessage = '';  // Ẩn thông báo sau 5 giây
                        }, 7000);
                        this.closeAddForm();  // Đóng form sau khi gửi yêu cầu
                        this.fetchProducts
                    })
                    .catch((error) => {
                        console.error('Error fetching categories:', error);
                    })
                    .finally(() => {
                        this.isSubmitting = false;  // Đặt trạng thái gửi form là false sau khi hoàn thành
                    });
            } else {
                this.$router.push('/');
            }
        },
        editProduct() {
            if (this.token) {
                const productData = {
                    name: this.editedProduct.name,
                    description: this.editedProduct.description,
                    image: this.editedProduct.image,
                    price: this.editedProduct.price,
                    stock: this.editedProduct.stock,
                    categoryId: this.editedProduct.categoryId
                };
                axios.put(`http://localhost:8080/api/products/${this.editedProduct.id}`, productData, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,  // Gửi token qua header Authorization
                        'Content-Type': 'application/json',  // Đảm bảo gửi dữ liệu dưới dạng JSON
                    }
                })
                    .then((response) => {
                        // Nếu API trả về dữ liệu hợp lệ
                        const index = this.products.findIndex(p => p.id === this.editedProduct.id);
                        if (index !== -1) {
                            this.products[index] = response.data.result;  // Cập nhật category trong danh sách
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
        // Hàm xử lý thay đổi file (chọn ảnh)
        onFileChange(event: Event, targetProduct: 'product' | 'editedProduct') {
            const target = event.target as HTMLInputElement;
            if (target.files && target.files[0]) {
                const file = target.files[0];

                // Lấy tên tệp (ví dụ: 'hublot_01.img')
                const fileName = file.name;

                // Lưu tên tệp vào product.image
                if (targetProduct === 'product') {
                    this.product.image = fileName;
                } else if (targetProduct === 'editedProduct') {
                    this.editedProduct.image = fileName;
                }
            }
        },

        // Mở popup confirm Delete
        openDeleteConfirm(productId: number) {
            this.productToDelete = productId;
            this.showDeleteConfirm = true;
        },

        // Đóng popup confirm Delete
        closeDeleteConfirm() {
            this.showDeleteConfirm = false;
            this.productToDelete = null;
        },

        // Xử lý xóa category
        deleteProduct() {
            if (this.productToDelete) {
                // Giả sử API xóa category với ID
                axios.delete(`http://localhost:8080/api/products/${this.productToDelete}`, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                    }
                })
                    .then(() => {
                        // Xóa thành công, cập nhật lại danh sách product
                        this.products = this.products.filter(product => product.id !== this.productToDelete);
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

<!-- <style scoped>
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
}

table th {
    background-color: #f4f4f4;
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
</style> -->
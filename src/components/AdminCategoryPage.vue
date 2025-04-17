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
            <div id="categories" class="content-section">
                <h3>Categories Management</h3>
                <p>Manage your categories here.</p>
                <button class="btn-add">Add</button>
                <table class="category-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Category 1</td>
                            <td>Category description goes here.</td>
                            <td><img src="path_to_image_1.jpg" alt="Category 1" class="category-image" /></td>
                            <td><a href="abc"><img src="@/assets/img/pencil.png" class="action" title="Edit"></a>
                                <a href="abc"><img src="@/assets/img/bin.png" class="action" title="Delete"></a>
                            </td>                           
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Category 2</td>
                            <td>Another category description.</td>
                            <td><img src="path_to_image_2.jpg" alt="Category 2" class="category-image" /></td>
                            <td><a href="abc"><img src="@/assets/img/pencil.png" class="action" title="Edit"></a>
                                <a href="abc"><img src="@/assets/img/bin.png" class="action" title="Delete"></a>
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Category 3</td>
                            <td>Yet another description for a category.</td>
                            <td><img src="path_to_image_3.jpg" alt="Category 3" class="category-image" /></td>
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

export default Vue.extend({
    name: "AdminCategoryPage",
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
    background-color: #34495e; /* Màu nền khi trang hiện tại được chọn */
}
.main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f4f4f4;
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

h3 {
    margin-bottom: 15px;
}

.category-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.category-table th,
.category-table td {
    padding: 15px;
    padding-left: 10px;
    text-align: left;
    border: 1px solid #ddd;
}

.category-table th {
    background-color: #f4f4f4;
}

.category-table img {
    width: 25px;
    margin-left: 10px;
    height: auto;
    border-radius: 5px;
}
.btn-add{
    float: right;
    width: 10%;
    color: aliceblue;
    background-color: #34495e;
    margin-bottom: 2%;
}

button:hover{
    background-color: green;
}
.btn-logout{
    float: right;
    width: 10%;
    color: aliceblue;
    background-color: #2843a5;
    margin-bottom: 2%;
}
</style>
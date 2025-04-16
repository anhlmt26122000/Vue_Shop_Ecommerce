<template>
    <div>
        <div class="container">
        <!-- Sidebar -->
        <div class="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li><a href="#" @click="showSection('categories')">Categories</a></li>
                <li><a href="#" @click="showSection('products')">Products</a></li>
                <li><a href="#" @click="showSection('users')">Users</a></li>
            </ul>
        </div>

        <!-- Main Content -->
        <div class="main-content">
            <div id="categories" class="content-section" :class="{'active': activeSection === 'categories'}">
                <h3>Categories Management</h3>
                <p>Manage your categories here.</p>
            </div>
            <div id="products" class="content-section" :class="{'active': activeSection === 'products'}">
                <h3>Products Management</h3>
                <p>Manage your products here.</p>
            </div>
            <div id="users" class="content-section" :class="{'active': activeSection === 'users'}">
                <h3>Users Management</h3>
                <p>Manage your users here.</p>
            </div>
        </div>
    </div>
    </div>
</template>
  
<script lang="ts">
  import Vue from "vue";
  
  export default Vue.extend({
  name: "AdminPage",
  data() {
    return {
      activeSection: 'categories' // mặc định hiển thị phần Categories
    };
  },
  methods: {
    showSection(sectionId: string) {
      this.activeSection = sectionId; // cập nhật section đang được chọn
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

.main-content {
    flex-grow: 1;
    padding: 20px;
    background-color: #f4f4f4;
}

.content-section {
    display: none;
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
</style>

  

  
<template>
    <footer class="bg-dark" id="tempaltemo_footer">
    <div class="container">
        <div class="row">

            <div class="col-md-4 pt-5">
                <h2 class="h2 text-light border-bottom pb-3 border-light logo">Zento</h2>
                <ul class="list-unstyled text-light footer-link-list">
                    <li>
                        <i class="fas fa-map-marker-alt fa-fw"></i>
                        Mitec Building, Duong Dinh Nghe, Yen Hoa Ward, Cau Giay District, Hanoi, Vietnam
                    </li>
                    <li>
                        <i class="fa fa-phone fa-fw"></i>
                        <a class="text-decoration-none" href="tel:012-345-6789">012-345-6789</a>
                    </li>
                    <li>
                        <i class="fa fa-envelope fa-fw"></i>
                        <a class="text-decoration-none" href="mailto:anhlmt@newwave.com.vn">anhlmt@newwave.com.vn</a>
                    </li>
                </ul>
            </div>

            <div class="col-md-4 pt-5">
                <h2 class="h2 text-light border-bottom pb-3 border-light">Products</h2>
                <ul class="list-unstyled text-light footer-link-list">
                    <li v-for="category in categories" :key="category.id">
                    <a class="text-decoration-none" :href="`#${category.name}`">{{ category.name }}</a>
                    </li>
                </ul>
            </div>

            <div class="col-md-4 pt-5">
                <h2 class="h2 text-light border-bottom pb-3 border-light">Further Info</h2>
                <ul class="list-unstyled text-light footer-link-list">
                    <li><a class="text-decoration-none" href="#">Home</a></li>
                    <li><a class="text-decoration-none" href="#">About Us</a></li>
                    <li><a class="text-decoration-none" href="#">Shop Locations</a></li>
                    <li><a class="text-decoration-none" href="#">FAQs</a></li>
                    <li><a class="text-decoration-none" href="#">Contact</a></li>
                </ul>
            </div>

        </div>

        <div class="row text-light mb-4">
            <div class="col-12 mb-3">
                <div class="w-100 my-3 border-top border-light"></div>
            </div>
            <div class="col-auto me-auto">
                <ul class="list-inline text-left footer-icons">
                    <li class="list-inline-item border border-light rounded-circle text-center">
                        <a class="text-light text-decoration-none" target="_blank" href="http://facebook.com/"><i class="fab fa-facebook-f fa-lg fa-fw"></i></a>
                    </li>
                    <li class="list-inline-item border border-light rounded-circle text-center">
                        <a class="text-light text-decoration-none" target="_blank" href="https://www.instagram.com/"><i class="fab fa-instagram fa-lg fa-fw"></i></a>
                    </li>
                    <li class="list-inline-item border border-light rounded-circle text-center">
                        <a class="text-light text-decoration-none" target="_blank" href="https://twitter.com/"><i class="fab fa-twitter fa-lg fa-fw"></i></a>
                    </li>
                    <li class="list-inline-item border border-light rounded-circle text-center">
                        <a class="text-light text-decoration-none" target="_blank" href="https://www.linkedin.com/"><i class="fab fa-linkedin fa-lg fa-fw"></i></a>
                    </li>
                </ul>
            </div>
            <div class="col-auto">
                <label class="sr-only" for="subscribeEmail">Email address</label>
                <div class="input-group mb-2">
                    <input type="text" class="form-control bg-dark border-light" id="subscribeEmail" placeholder="Email address" style="color: white;">
                    <div class="input-group-text btn-success text-light">Subscribe</div>
                </div>
            </div>
        </div>
    </div>

    <div class="w-100 bg-black py-3">
        <div class="container">
            <div class="row pt-2">
                <div class="col-12">
                    <p class="text-left text-light">
                        Copyright &copy; 2025  Zento Shop
                    </p>
                </div>
            </div>
        </div>
    </div>

</footer>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import Vue from "vue";
  
  export default Vue.extend({
  data() {
    return {
      categories: [] as { id: number; name: string }[], // Directly defining the array type without an interface
    };
  },
  created() {
    // Lấy token từ localStorage
    const token = localStorage.getItem("authToken");

    // Nếu token tồn tại, thực hiện yêu cầu với token trong header
    if (token) {
      axios.get('http://localhost:8080/api/categories', {
        headers: {
          'Authorization': `Bearer ${token}`  // Gửi token qua header Authorization
        }
      })
      .then((response) => {
        // Nếu API trả về dữ liệu hợp lệ
        this.categories = response.data.result;
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
    } else {
      console.error('No auth token found');
    }
  },
});
  </script>



  
<template>
    <footer class="bg-dark" id="tempaltemo_footer">
      <div class="container">
        <div class="row">
          <div class="col-md-4 pt-5">
            <h2 class="h2 text-success border-bottom pb-3 border-light logo">Zay Shop</h2>
            <ul class="list-unstyled text-light footer-link-list">
              <li>
                <i class="fas fa-map-marker-alt fa-fw"></i>
                123 Consectetur at ligula 10660
              </li>
              <li>
                <i class="fa fa-phone fa-fw"></i>
                <a class="text-decoration-none" href="tel:010-020-0340">010-020-0340</a>
              </li>
              <li>
                <i class="fa fa-envelope fa-fw"></i>
                <a class="text-decoration-none" href="mailto:info@company.com">info@company.com</a>
              </li>
            </ul>
          </div>
  
          <div class="col-md-4 pt-5">
            <h2 class="h2 text-light border-bottom pb-3 border-light">Products</h2>
            <ul class="list-unstyled text-light footer-link-list">
              <!-- Sử dụng <router-link> cho các liên kết nội bộ nếu cần -->
              <li><a class="text-decoration-none" href="#">Luxury</a></li>
              <li><a class="text-decoration-none" href="#">Sport Wear</a></li>
              <li><a class="text-decoration-none" href="#">Men's Shoes</a></li>
              <li><a class="text-decoration-none" href="#">Women's Shoes</a></li>
              <li><a class="text-decoration-none" href="#">Popular Dress</a></li>
              <li><a class="text-decoration-none" href="#">Gym Accessories</a></li>
              <li><a class="text-decoration-none" href="#">Sport Shoes</a></li>
            </ul>
          </div>
  
          <div class="col-md-4 pt-5">
            <h2 class="h2 text-light border-bottom pb-3 border-light">Further Info</h2>
            <ul class="list-unstyled text-light footer-link-list">
              <!-- Sử dụng <router-link> cho các liên kết nội bộ nếu cần -->
              <li><router-link class="text-decoration-none" to="/">Home</router-link></li>
              <li><router-link class="text-decoration-none" to="/about">About Us</router-link></li>
              <li><a class="text-decoration-none" href="#">Shop Locations</a></li>
              <li><a class="text-decoration-none" href="#">FAQs</a></li>
              <li><router-link class="text-decoration-none" to="/contact">Contact</router-link></li>
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
                <a class="text-light text-decoration-none" target="_blank" rel="noopener noreferrer" href="http://facebook.com/"><i class="fab fa-facebook-f fa-lg fa-fw"></i></a>
              </li>
              <li class="list-inline-item border border-light rounded-circle text-center">
                <a class="text-light text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><i class="fab fa-instagram fa-lg fa-fw"></i></a>
              </li>
              <li class="list-inline-item border border-light rounded-circle text-center">
                <a class="text-light text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://twitter.com/"><i class="fab fa-twitter fa-lg fa-fw"></i></a>
              </li>
              <li class="list-inline-item border border-light rounded-circle text-center">
                <a class="text-light text-decoration-none" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/"><i class="fab fa-linkedin fa-lg fa-fw"></i></a>
              </li>
            </ul>
          </div>
          <div class="col-auto">
            <label class="sr-only" for="subscribeEmail">Email address</label>
            <div class="input-group mb-2">
              <input type="text" class="form-control bg-dark border-light" id="subscribeEmail" placeholder="Email address">
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
                Copyright © 2024 Your Company Name <!-- Cập nhật năm -->
                | Designed by <a rel="sponsored noopener noreferrer" href="https://templatemo.com" target="_blank">TemplateMo</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  
  export default Vue.extend({
    name: "AppFooter",
    // Không cần data, methods, mounted... cho footer tĩnh này
    // Nếu các script custom.js hay templatemo.js cần chạy sau khi footer render,
    // bạn có thể cần gọi hàm khởi tạo của chúng trong mounted(), nhưng hãy cẩn thận.
    // mounted() {
    //   // Ví dụ: nếu có hàm initFooter() trong custom.js được load global
    //   if (typeof window.initFooter === 'function') {
    //     window.initFooter();
    //   }
    // }
  });
  </script>
  
  <style scoped>
  /* Thêm CSS scoped nếu bạn muốn ghi đè hoặc thêm style chỉ cho footer */
  /* Ví dụ: */
  /*
  .footer-link-list a:hover {
    color: #f8f9fa !important; // Ghi đè màu khi hover nếu cần
  }
  */
  
  /* Nếu templatemo.css và custom.css chỉ chứa style cho footer,
     bạn có thể import chúng ở đây thay vì global, nhưng phải bỏ scoped */
  /* @import '../assets/css/templatemo.css'; */
  /* @import '../assets/css/custom.css'; */
  
  </style>
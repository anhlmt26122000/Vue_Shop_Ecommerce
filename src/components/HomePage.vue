<template>
    <div>
        <!-- Start Top Nav -->
        <AppHeader />
        <!-- Close Header -->

        <!-- Modal -->
        <div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="w-100 pt-1 mb-5 text-right">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form action="" method="get" class="modal-content modal-body border-0 p-0">
                    <div class="input-group mb-2">
                        <input type="text" class="form-control" id="inputModalSearch" name="q" placeholder="Search ...">
                        <button type="submit" class="input-group-text bg-success text-light">
                            <i class="fa fa-fw fa-search text-white"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>



        <!-- Start Banner Hero -->
        <div id="template-mo-zay-hero-carousel" class="carousel slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="0" class="active"></li>
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="1"></li>
                <li data-bs-target="#template-mo-zay-hero-carousel" data-bs-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="container">
                        <div class="row p-5">
                            <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img class="img-fluid" src="@/assets/img/banner_img_02.jpg" alt="">
                            </div>
                            <div class="col-lg-6 mb-0 d-flex align-items-center">
                                <div class="text-align-left align-self-center">
                                    <h1 class="h1 text-success"><b>Zento</b> eCommerce</h1>
                                    <h3 class="h2">Modern and Minimalist</h3>
                                    <p>
                                        Welcome to Zento – Where Minimalism Meets Modern Style
                                        At Zento, we believe that simplicity is the ultimate sophistication. Our curated
                                        collection of accessories, apparel, and footwear is designed for those who
                                        appreciate clean aesthetics, quality craftsmanship, and effortless elegance.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="container">
                        <div class="row p-5">
                            <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img class="img-fluid" src="@/assets/img/banner_img_01.jpg" alt="">
                            </div>
                            <div class="col-lg-6 mb-0 d-flex align-items-center">
                                <div class="text-align-left">
                                    <h1 class="h1">Gym and popular fashion</h1>
                                    <h3 class="h2">Accessory and watches</h3>
                                    <p>
                                        With a commitment to quality and style, we bring you fashion that is both
                                        functional and statement-worthy.
                                        Elevate your wardrobe with pieces that embody modern sophistication and everyday
                                        practicality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="container">
                        <div class="row p-5">
                            <div class="mx-auto col-md-8 col-lg-6 order-lg-last">
                                <img class="img-fluid" src="@/assets/img/banner_img_03.jpg" alt="">
                            </div>
                            <div class="col-lg-6 mb-0 d-flex align-items-center">
                                <div class="text-align-left">
                                    <h1 class="h1">Shopping online</h1>
                                    <h3 class="h2">Elevate your style, embrace simplicity. </h3>
                                    <p>
                                        Discover a shopping experience that blends minimalism with contemporary fashion,
                                        ensuring you always look refined without unnecessary complexity.
                                        Whether you're searching for the perfect statement accessory, sleek outfit, or
                                        stylish footwear, we’ve got you covered.
                                        Elevate your style, embrace simplicity. <strong>Shop now!</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev text-decoration-none w-auto ps-3" href="#template-mo-zay-hero-carousel"
                role="button" data-bs-slide="prev">
                <i class="fas fa-chevron-left"></i>
            </a>
            <a class="carousel-control-next text-decoration-none w-auto pe-3" href="#template-mo-zay-hero-carousel"
                data-bs-slide="next">
                <i class="fas fa-chevron-right"></i>
            </a>
        </div>
        <!-- End Banner Hero -->


        <!-- Start Categories of The Month -->
        <section class="container py-5">
            <div class="row text-center pt-3">
                <div class="col-lg-6 m-auto">
                    <h1 class="h1">Categories of The Month</h1>
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
            <div class="row">
                <div v-for="category in categories" :key="category.id" class="col-12 col-md-4 p-5 mt-3">
                    <a href="#"><img :src="require(`@/assets/img/${category.image}`)" class="top3-category-image"></a>
                    <h5 class="text-center mt-3 mb-3">{{ category.name }}</h5>
                    <p class="text-center"><a class="btn btn-success">Go Shop</a></p>
                </div>
            </div>
        </section>
        <!-- End Categories of The Month -->


        <!-- Start Featured Product -->
        <section class="bg-light">
            <div class="container py-5">
                <div class="row text-center py-3">
                    <div class="col-lg-6 m-auto">
                        <h1 class="h1">Featured Product</h1>
                        <p>
                            Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div v-for="product in products" :key="product.id" class="col-12 col-md-4 mb-4">
                        <div class="card h-100">
                            <a href="#">
                                <img :src="require(`@/assets/img/${product.image}`)" class="top3-product-image" alt="...">
                            </a>
                            <div class="card-body">
                                <ul class="list-unstyled d-flex justify-content-between">
                                    <li>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                    </li>
                                    <li class="text-muted text-right">{{product.price}} $</li>
                                </ul>
                                <a href="shop-single.html" class="h2 text-decoration-none text-dark">{{ product.name }}</a>
                                <p class="card-text">
                                    {{product.description}}
                                </p>
                                <p class="text-muted">Reviews (24)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Featured Product -->

        <AppFooter />
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import axios from 'axios';



export default Vue.extend({
    name: 'HomePage',
    props: {
        msg: String,
    },
    components: {
        AppHeader,
        AppFooter,
    },
    mounted() {
        document.title = 'HomePage'; // Đổi tiêu đề trang
    },
    data() {
        return {
            categories: [] as { id: number; name: string; description: string; image: string }[],
            products: [] as { id: number; name: string; description: string; image: string ;price :number}[],
            token: localStorage.getItem("authToken") || ''// Directly defining the array type without an interface
        };
    },
    created() {
        this.fetchCategories();
        this.fetchProducts();
    },
    methods: {
        fetchCategories() {
            // Fetch categories from the API
            if (this.token) {
                axios.get('http://localhost:8080/api/categories', {
                    headers: {
                        'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                    }
                })
                .then((response) => {
                    // Nếu API trả về dữ liệu hợp lệ
                    this.categories = response.data.result.slice(0, 3); // Lấy 3 mục đầu tiên
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });
            } else {
                console.error('No auth token found');
            }
        },
        fetchProducts() {
            // Fetch products from the API
            if (this.token) {
                axios.get('http://localhost:8080/api/products', {
                    headers: {
                        'Authorization': `Bearer ${this.token}`  // Gửi token qua header Authorization
                    }
                })
                .then((response) => {
                    // Nếu API trả về dữ liệu hợp lệ
                    this.products = response.data.result.slice(0, 3); // Lấy 3 mục đầu tiên
                })
                .catch((error) => {
                    console.error('Error fetching products:', error);
                });
            } else {
                console.error('No auth token found');
            }
        },
    },
});
</script>

<style scoped>
    /* Add your styles here */
    .top3-category-image{
        width: 400px;
        height: 400px;
    }
    .top3-product-image{
        width: 400px;
        height: 600px;
    }
</style>

<template>
	<div class="price_page">
		<h3 class="title">{{this.productData.name}}</h3>
		<p class="intro">{{this.productData.describe}}</p>
		<h4 class="price">${{this.productData.price}}</h4>
		<span class="buybtn">立即购买</span>
		<div class="product">
			<img src="../../../assets/img/home/product_1.png" />
		</div>

	</div>
</template>

<script>
import ProductService from '@/service/product/ProductService'
export default {
	name: 'priceWrap',
	data () {
    return {
			productService: ProductService,
			productData: {
				'createdAt': 1534758817390,
				'creator': '5b7a63a46cd3dd0dd704662f',
				'describe': '',
				'discount': 0,
				'name': '',
				'pics': [],
				'price': 0,
				'status': 0
			}
    }
	},
	created () {
		this.getProduct()
	},
  methods: {
		getProduct() {
			this.productService.fetchAllProduct({}).then((results) => {
				if (results.data.success) {
					this.productData = results.data.data[0]
				}
			})
		}
  }
}
</script>

<style lang="scss" scoped>
	@import '~@/assets/styles/public';
	.price_page {
		/*border:1px solid red;*/
		text-align: center;
		box-shadow: 0 50px 50px #1d1e21;
		/*color: #FFFFFF;*/
		padding-top: 120px;
		.title {
			font-size: 30px;
			font-weight: bold;
			color: #455eca;
			line-height: 50px;
		}
		.intro {
			font-size: 18px;
			color: #d8dce6;
		}
		.price {
			font-size: 30px;
			line-height: 95px;
		}
		.product {}
		.buybtn {
			@include btn_product_buy;
			font-size: 16px;
			margin-bottom: 120px;
			/*display: block;*/
		}
	}
</style>
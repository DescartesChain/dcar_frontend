<template>
	<div class="buy_page">
		<div class="content">
			<p class="procuct">
				<span>{{this.productData.name}}</span>
				<!-- <span class="version">x1</span> -->
			</p>
			<span class="buy">购买</span>
		</div>
	</div>
</template>

<script>
import ProductService from '@/service/product/ProductService'
export default {
  name: 'buyWrap',
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
	.buy_page {
		width: 100%;
		background-color: #18171a;
		.content {
			margin: auto;
			line-height: 80px;
			height: 80px;
			max-width: 1200px;
			border-bottom:2px solid #2b2f39;
			/*border-bottom: 1px solid red;*/
			display: flex;
			justify-content: space-between;
			align-items: center;
			.procuct {
				/*float: left;*/
				color: #FFFFFF;
				font-size: 24px;
				font-weight: bold;
				.version {
					/*margin-left: 10px;*/
				}
			}
			.buy {
				@include btn_product_buy;				
				/*margin-top: 20px;*/
				/*float: right;*/
			}
		}
	}
</style>

<template>
  <div class="bind_info">
    <div class="row img_box">
      <div class="col-md-5 round_pic">
          <img src="~@/assets/img/setup-info/head.png" alt="">
          <p>预览效果</p>
      </div>
      <div class="col-md-7 original_pic">
          <img src="~@/assets/img/setup-info/head.png" alt="">
          <input type="file" @change="uploadImg($event)" class="filepath" id="update"/>
          <p>
              <label for="update">
                  重新上传
              </label>
          </p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/service/user/UserService'
export default {
  name: 'ChangeHead',
  props: {
    message: {},
  },
  data () {
    return {
      userService: UserService,
      // dataMain: 'zizizi'
    };
  },
  methods: {
    // giveAdvice () {
    //   this.$emit('give-advice', '123456')
    // },
    uploadImg (event) {
      console.log(localStorage.getItem('userid'))
      // this.userService.uploadHeadImage(localStorage.getItem('userid'), event.target.files[0]).then((results) => {
      //   console.log(results)
      // })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '~@/assets/styles/public';
.bind_info {
  width: 90%;
  margin: 0 auto;
  font-size: $font_sm;
}
.round_pic{
    text-align: center;
}
.round_pic > img {
  width: 146px;
  height: 146px;
  border-radius: 50%;
}
.round_pic>p{
    text-align: center;
    padding-top:20px;
}
.original_pic{
    text-align: right;
}
.original_pic>img{
    width:98%;
}
.original_pic>p{
    text-align: left;
    color:#E87213;
    padding-top:12px;
    cursor: pointer;
}
.filepath{
    display: none;
}
</style>

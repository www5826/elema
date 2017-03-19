/**
* Created by 吴建平 on 2017/3/19.
* For:用于展示评价的星星组件
*/

<template>
  <div class="star">
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
      props:{
          size:{
              type:Number
          },
          score:{
              type:Number
          }
      },
      computed:{
        itemClasses() {
            const STAR_LENGTH = 5;//星星的长度
            const STAR_ON = 'on';//全星
            const STAR_OFF = 'off';//没有星
            const STAR_HALF = 'half';//半星

            let result = [];

            let score = Math.floor(this.score * 2) / 2;
            let hasDecimals = score % 1 !== 0;//检测这个数是不是小数
            let integer = Math.floor(score);//检测有几个整数
            //添加全星进去
          for(let i = 0;i < integer;i++){
              result.push(STAR_ON);
          }
          //添加半星
          if(hasDecimals){
              result.push(STAR_HALF)
          }

          while(result.length < STAR_LENGTH){
            result.push(STAR_OFF)
          }
        }
      }
  }
</script>
<style rel="stylesheet/scss">
  .star{
    .star-item{
      margin-right: 22px;

    }
  }
</style>

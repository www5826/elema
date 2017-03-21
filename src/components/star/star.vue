/**
* Created by 吴建平 on 2017/3/19.
* For:用于展示评价的星星组件
*/

<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" class="star-item" :class="itemClass"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType(){
        return 'star-' + this.size;
      },
      itemClasses() {
        const STAR_LENGTH = 5;//星星的长度
        const STAR_ON = 'on';//全星
        const STAR_OFF = 'off';//没有星
        const STAR_HALF = 'half';//半星

        let result = [];

        let score = Math.floor(this.score * 2) / 2;
        let hasDecimals = score % 1 !== 0;//检测这个数是不是小数
        let integer = Math.floor(score) > 5? 5 : Math.floor(score);//检测有几个整数
        //添加全星进去
        for (let i = 0; i < integer; i++) {
          result.push(STAR_ON);
        }
        //添加半星
        if (hasDecimals) {
          result.push(STAR_HALF)
        }

        while (result.length < STAR_LENGTH) {
          result.push(STAR_OFF)
        }

        return result;
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">

  @import '../../common/sass/index.scss';
  @import '../../common/sass/mixin.scss';

  .star{
    display: inline-block;
    .star-item {
       display: inline-block;
    }
    &.star-48 {
      .star-item {
        display: inline-block;
        width:24px;
        height: 24px;
        margin-right: 22px;
        &:last-child{
          margin-right: 0;
        }
        &.on {
          @include brand-img(star48_on,24px,24px);
        }
        &.half {
          @include brand-img(star48_half,24px,24px);
        }
        &.off {
          @include brand-img(star48_off,24px,24px);
        }
      }
    }
    &.star-36 {
       .star-item {
         width:  18px;
         height: 18px;
         margin-right: 16px;
         &:last-child{
           margin-right: 0;
         }
         &.on {
           @include brand-img(star48_on,18px,18px);
         }
         &.half {
           @include brand-img(star48_half,18px,18px);
         }
         &.off {
           @include brand-img(star48_off,18px,18px);
         }
       }
     }
    &.star-24 {
      .star-item {
        width:  12px;
        height: 12px;
        margin-right: 6px;
        &:last-child{
          margin-right: 0;
        }
        &.on {
          @include brand-img(star48_on,12px,12px);
        }
        &.half {
          @include brand-img(star48_half,12px,12px);
        }
        &.off {
          @include brand-img(star48_off,12px,12px);
        }
      }
    }

  }
</style>

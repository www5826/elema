/**
* Created by 吴建平 on 2017/3/25.
* For:食物的详情页
*/

<template>
  <transition name="food">
    <div class="food" v-show="showFlag">
      <div class="back" @click="back">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="img-loader">
        <img class="img" :src="food.image" alt="详情">
      </div>
      <div class="food-info border-1px">
        <div class="right">
          <p class="name">{{food.name}}</p>
          <p class="situation">月售{{food.sellCount}}&nbsp;&nbsp;好评率{{food.rating}}%</p>
          <div class="price">
            <span class="new-price">￥{{food.price}}</span>
            <span v-show="food.oldPrice != ''" class="old-price"><del>{{food.oldPrice}}</del></span>
          </div>
        </div>
        <div class="add-car" @click="addFirst" v-show="!food.count || food.count == 0">
          <span>加入购物车</span>
        </div>
        <div class="car-wrapper" v-show="food.count && food.count >= 1">
          <v-car-control :food="food"></v-car-control>
        </div>
      </div>
      <v-split v-show="food.info"></v-split>
      <!--商品介绍-->
      <div class="food-intro-wrapper" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <p class="food-intro">{{food.info}}</p>
      </div>
      <v-split></v-split>
      <!--评价-->

    </div>
  </transition>
</template>
<script type="text/ecmascript-6">

  import vue from 'vue';
  import carControl from './../carControl/carControl.vue';
  import split from './../split/split';

  export default{
    props: {
      food: {
        type: null
      }
    },
    data(){
      return {
        showFlag: false
      }
    },
    methods: {
      show(){
        this.showFlag = true;
      },
      addFirst(){
        if (!this.food.count) {
          vue.set(this.food, 'count', 1)
        }
      },
      back(){
        this.showFlag = false;
      }
    },
    components: {
      'v-car-control': carControl,
      'v-split': split
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  @import './../../common/sass/index.scss';

  .food {
    position: fixed;
    left: 0;
    bottom: 45px;
    width: 100%;
    height: 100%;
    z-index: 20;
    background: #fff;
    &.food-enter {
      transform: translate3D(100%, 0, 0);
      transition: all 0.5s
    }
    &.food-enter-to {
      transform: translate3D(0, 0, 0);
      transition: all 0.5s
    }
    &.food-leave{
      transform: translate3D(0,0,0);
      transition:all 0.5s;
    }
    &.food-leave-active{
      transform: translate3D(100%,0,0);
      transition: all 0.5s;
    }
    .back {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      position: absolute;
      top: 50px;
      left: 10px;
      z-index: 40;
      font-size: 24px;
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
    }
    .img-loader {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 100%;
      .img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .food-info {
      position: relative;
      .right {
        flex: 1;
        padding: 18px 18px 18px 10px;
        .name {
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 14px;
          padding: 2px 0 4px 0;
        }
        .situation {
          font-size: 10px;
          color: rgb(147, 153, 159);
          line-height: 10px;
          padding: 4px 0;
        }
        .price {
          margin-top: 18px;
          .new-price {
            font-size: 14px;
            color: rgb(255, 7, 5);
            font-weight: 700;
            line-height: 24px;
          }
          .old-price {
            font-size: 10px;
            color: rgb(147, 153, 159);
            font-weight: 700;
            line-height: 24px;
          }
        }
      }
      .add-car {
        display: inline-block;
        position: absolute;
        right: 18px;
        bottom: 18px;
        border-radius: 12px;
        line-height: 24px;
        width: 74px;
        height: 24px;
        padding: 6px 6px;
        color: #fff;
        font-size: 10px;
        background: rgb(0, 160, 220);
        text-align: center;
      }
      .car-wrapper {
        position: absolute;
        right: 18px;
        bottom: 18px;
        z-index: 30;
      }
    }
    .food-intro-wrapper {
      padding: 18px;
      .title {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 6px;
      }
      .food-intro {
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
        color: rgb(77, 85, 93);
      }
    }
  }
</style>

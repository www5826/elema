/**
* Created by 吴建平 on 2017/3/22.
* For:购物控制组件
*/

<template>
  <div class="car-control">
    <transition name="fade">
      <div class="decrease" @click.stop.prevent="decrease($event)" v-show="food.count > 0"><i class="icon-remove_circle_outline"></i></div>
    </transition>
    <div class="count" v-show="food.count > 0">{{food.count}}</div>
    <div class="add" @click.stop.prevent="addGoods($event)"><i class="icon-add_circle"></i></div>
  </div>
</template>
<script type="text/ecmascript-6">

  import vue from 'vue';

  export default{
    props: {
      food: {
        type: null
      }
    },
    created(){
    },
    methods: {
      decrease(event){
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {//如果该属性，则创建
          vue.set(this.food, 'count', 1);
        } else {
          this.food.count--;
        }
      },
      addGoods(event){
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {//如果该属性，则创建
          vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .car-control {
    line-height: 24px;
    .fade-enter-active,.fade-leave{
      transition: opacity 0.5s;
    }
    .fade-enter,.fade-leave-active{
      opacity: 0;
    }
    .decrease {
      display: inline-block;
      padding: 2px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      line-height: 24px;
    }
    .count {
      width: 20px;
      font-size: 10px;
      color: rgb(147, 153, 159);
      line-height: 24px;
      text-align: center;
      display: inline-block;
      vertical-align: top;
    }
    .add {
      display: inline-block;
      padding: 2px;
      font-size: 24px;
      color: rgb(0, 160, 220);
      line-height: 24px;
    }
  }
</style>

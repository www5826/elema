/**
* Created by 吴建平 on 2017/3/21.
* For:购物车组件
*/

<template>
  <div class="shop-car">
    <div class="content-left">
      <transition
        enter-active-class="animated bounceIn"
      >
      <div class="logo-wrapper">
        <div class="logo" :class="{'heighLight':totalCount > 0}">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="num">{{totalCount}}</div>
      </div>
      </transition>
      <div class="price-wrapper">
        <span class="price" :class="{'heighLight':totalCount > 0}">￥{{totalMoney}}</span>
      </div>
      <div class="deliveryPrice">
        <span>配送费￥<span>{{deliveryPrice}}</span>元</span>
      </div>
    </div>
    <div class="content-right" :class="payClass">
      <span class="min-price">{{payDes}}</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: {
      seller: {
        type: Object
      },
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default(){
          return [
            {
              price: 25,
              count: 1
            }
          ];
        }
      }
    },
    computed: {
      totalMoney(){
        let money = 0;
        this.selectFoods.forEach((el, index) => {
          money += el.price * el.count;
        });
        return money + this.deliveryPrice;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((el, index) => {
          count += el.count;
        });
        return count;
      },
      payDes(){
        if (this.totalMoney == 0) {
          return `￥20元起送`;
        } else if (this.totalMoney < this.minPrice) {
          let diff = this.minPrice - this.totalMoney;
          return `还差${diff}元起送`;
        } else {
          return "去结算";
        }
      },
      payClass(){
        if (this.totalMoney > this.minPrice) {
          return "enough";
        } else {
          return "not-enough";
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .shop-car {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #fff;
    width: 100%;
    height: 45px;
    background: #141d27;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #141d27;
        position: relative;
        top: -10px;
        margin-left: 12px;
        box-sizing: border-box;
        .num {
          display: inline-block;
          background: rgb(240, 20, 20);
          width: 24px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          height: 16px;
          border-radius: 20px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          line-height: 16px;
          text-align: center;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 20;
        }
        .logo {
          display: inline-block;
          width: 44px;
          height: 44px;
          line-height: 44px;
          background: #2B343C;
          border-radius: 50%;
          margin: 6px;
          z-index: 10;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.4);
          text-align: center;
          &.heighLight {
            background: #00A0DC;
            color: #fff;
          }
          .icon {
          }
        }
      }
      .price-wrapper {
        display: inline-block;
        vertical-align: top;
        margin: 10px 0;
        padding: 0 5px;
        line-height: 24px;
        box-sizing: border-box;
        border-right: 1px solid #919396;
        .price {
          display: inline-block;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          &.price {
            color: #fff;
          }
        }
      }
      .deliveryPrice {
        display: inline-block;
        color: rgba(255, 255, 255, 0.4);
        vertical-align: top;
        line-height: 45px;
        height: 45px;
        box-sizing: border-box;
        font-size: 16px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      text-align: center;
      padding: 15px 8px;
      font-weight: 700;
      &.enough {
        background: #048A3F;
        color: #fff;
      }
      &.not-enough {
        background: #2B333B;
        color: #979A9C;
      }
    }
  }
</style>

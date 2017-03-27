/**
* Created by 吴建平 on 2017/3/21.
* For:购物车组件
*/

<template>
  <div class="shop-car">
    <div class="content-left" @click="toggleClick">
      <div class="logo-wrapper">
        <div class="logo" :class="{'heighLight':totalCount > 0}">
          <i class="icon-shopping_cart"></i>
        </div>
        <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
      </div>
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
    <transition name="shop">
      <div class="shop-list-wrapper" v-show="toggle">
        <div class="shop-list-title border-1px">
          <span class="shop-list-title-left">购物车</span>
          <span class="shop-list-title-right" @click="empty">清空</span>
        </div>
        <div class="shop-list" ref="shop">
          <ul>
            <li class="shop-list-item" v-for="item in selectFoods">
              <span class="goods-name">{{item.name}}</span>
              <div class="price-area">
                <span class="total-price">￥<span class="total-price-num">{{item.price * item.count}}</span></span>
                <v-car class="car" :food="item"></v-car>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="shop">
      <div class="shade" v-show="toggle" @click="toggleClick"></div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">

  import carControl from '../carControl/carControl.vue';
  import BScroll from 'better-scroll';

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
              price: 0,
              count: 0
            }
          ];
        }
      }
    },
    computed: {
      totalMoney(){
        let money = 0;
        this.selectFoods.forEach((el) => {
          money += el.price * el.count;
        });
        return money + this.deliveryPrice;
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((el) => {
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
      },
      toggle(){
        if (this.showList && this.totalCount > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    components: {
      'v-car': carControl
    },
    data(){
      return {
        showList: false,
        scroll: Object
      }
    },
    methods: {
      toggleClick(){
        this.showList = !this.showList;
        this.$nextTick(() => {
          new BScroll(this.$refs.shop, {
            probeType: 3,
            click: true
          });
        });
      },
      empty(){
        this.selectFoods.forEach((el) => {
          el.count = 0;
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  @import '../../common/sass/line.scss';

  .shop-car {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    color: #fff;
    width: 100%;
    height: 45px;
    background: #141d27;
    z-index:30;
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

    .shop-list-wrapper {
      position: absolute;
      bottom: 45px;
      left: 0;
      width: 100%;
      z-index: -1;
      /*购物车清单*/
      &.shop-enter, &.shop-leave-active {
        opacity: 0;
        transition: 0.5s;
      }
      &.shop-enter-active, &.shop-leave {
        transition: opacity 0.5s;
      }
      .shop-list-title {
        width: 100%;
        height: 40px;
        background: #f3f5f7;
        line-height: 40px;
        .shop-list-title-left {
          font-size: 14px;
          color: rgb(7, 17, 27);
          float: left;
          font-weight: 200;
          margin-left: 18px;
        }
        .shop-list-title-right {
          color: rgb(0, 160, 220);
          font-size: 12px;
          float: right;
          margin-right: 18px;
        }

      }
      .shop-list {
        background: #fff;
        width: 100%;
        max-height: 260px;
        overflow: hidden;
        .shop-list-item {
          height: 45px;
          padding: 12px 18px;
          box-sizing: border-box;
          .goods-name {
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price-area {
            display: inline-block;
            float: right;
            line-height: 24px;
            .total-price {
              color: rgb(240, 20, 20);
              font-size: 10px;
              vertical-align: top;
              .total-price-num {
                font-size: 14px;
                font-weight: 700;
                margin-right: 12px;
                vertical-align: top;
              }
            }
            .car {
              display: inline-block;
            }
          }
        }
      }
    }
    .shade {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -2;
      background: rgba(7, 17, 27, 0.6);
      &.shop-enter, &.shop-leave-active {
        opacity: 0;
      }
      &.shop-enter-active, &.shop-leave {
        transition: opacity 0.5s;
      }
    }
  }
</style>

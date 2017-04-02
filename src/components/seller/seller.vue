/**
* Created by 吴建平 on 2017/4/1.
* For:商家组件
*/
<template>
  <div class="seller-wrapper">
    <div class="seller-content">
      <!--商家概览-->
      <div class="overview">
        <div class="seller-name">
          <h1 class="title">{{seller.name}}</h1>
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="seller-count">({{seller.ratingCount}})</span>
          <span class="seller-sell">月售{{seller.sellCount}}单</span>
        </div>
        <div class="border-1px"></div>
        <div class="desc">
          <div class="block">
            <h1 class="desc-title">起送价</h1>
            <div class="desc-content">
              <span class="desc-num">{{seller.minPrice}}<span class="desc-unit">元</span></span>
            </div>
          </div>
          <div class="block">
            <h1 class="desc-title">商家配送</h1>
            <div class="desc-content">
              <span class="desc-num">{{seller.deliveryPrice}}<span class="desc-unit">元</span></span>
            </div>
          </div>
          <div class="block">
            <h1 class="desc-title">平均配送时间</h1>
            <div class="desc-content">
              <span class="desc-num">{{seller.deliveryTime}}<span class="desc-unit">分钟</span></span>
            </div>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <!--公告与活动-->
      <div class="active">
        <h1 class="title">公告与活动</h1>
        <p class="active-content border-1px-1">{{seller.bulletin}}</p>
        <ul>
          <li class="active-item border-1px" v-for="item in seller.supports">
            <span class="active-item-content">
              <i class="icon" :class="privilege[item.type]"></i>
              <span class="active-item-desc">{{item.description}}</span>
            </span>
          </li>
        </ul>
      </div>
      <!--分割线-->
      <v-split></v-split>
      <!--商家实景-->
      <div class="shop-pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="pics">
          <ul class="pics-ul" ref="ul">
            <li class="pics-item" v-for="pic in seller.pics" ref="li">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <!--商家信息-->
      <div class="infos">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="border-1px-1" v-for="info in seller.infos">
            <span class="info-content">{{info}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  import star from './../star/star';
  import split from './../split/split';
  import BScroll from 'better-scroll';

  export default{
    props: {
      seller: {}
    },
    created(){
      this.privilege = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    mounted(){
      this._setUlWidth();
    },
    watch: {
      'seller'(){
        this._setUlWidth();
      }
    },
    mounted(){
      this._setUlWidth();
    },
    methods: {
      _getUlWidth(){
        if (this.seller.pics) {
          let liLength = this.seller.pics.length;
          return liLength * 126 - 6;
        }
      },
      _setUlWidth(){
        this.$refs.ul.style.width = this._getUlWidth() + 'px';
        this.$nextTick(() => {
          new BScroll(this.$refs.pics, {
            scrollX: true,
            eventPassthrough: 'vertical'
          })
        })
      }
    },
    components: {
      'v-star': star,
      'v-split': split
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import './../../common/sass/index';

  .seller-content {
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .overview {
      padding: 18px;
      .seller-name {
        .title {
          font-size: 14px;
          color: $black;
          line-height: 14px;
          margin-bottom: 8px;
        }
        .seller-count {
          margin-left: 8px;
          font-size: 10px;
          vertical-align: top;
          line-height: 18px;
        }
        .seller-sell {
          font-size: 10px;
          color: $black;
          line-height: 18px;
          margin-left: 12px;
          vertical-align: top;
        }
      }
      .border-1px {
        margin-top: 18px;
      }
      .desc {
        display: flex;
        padding-top: 18px;
        .block {
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child {
            border-right: none;
          }
          .desc-title {
            font-size: 10px;
            color: $gray;
          }
          .desc-content {
            margin-top: 8px;
            color: $black;
            .desc-num {
              font-size: 24px;
              font-weight: 200;
              line-height: 24px;
            }
            .desc-unit {
              font-size: 10px;
            }
          }
        }
      }
    }
    .active {
      padding: 18px 18px 0 18px;
      .active-content {
        padding: 8px 12px 16px 12px;
        font-size: 12px;
        color: rgb(240, 20, 20);
        line-height: 24px;
        font-weight: 200;
      }
      .active-item {
        padding: 16px 12px;
        .active-item-content {
          .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
          }
          .decrease {
            @include brand-img(decrease_1, 16px, 16px);
          }
          .discount {
            @include brand-img(discount_1, 16px, 16px);
          }
          .guarantee {
            @include brand-img(guarantee_1, 16px, 16px);
          }
          .invoice {
            @include brand-img(invoice_1, 16px, 16px);
          }
          .special {
            @include brand-img(special_1, 16px, 16px);
          }
          .active-item-desc {
            vertical-align: top;
            font-size: 12px;
            font-weight: 200;
            color: $black;
            line-height: 16px;
            margin-left: 6px;
          }
        }
      }
    }
    .shop-pics {
      padding: 18px 0 18px 18px;
      .pics-wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 12px;
        .pics-item {
          display: inline-block;
          width: 120px;
          height: 90px;
          margin-right: 6px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
    .infos{
      padding:18px 18px 0 18px;
      .border-1px-1{
        padding:16px 12px;
        font-size: 12px;
        font-weight: 200;
        color: $black;
        line-height: 16px;
      }
    }
  }
</style>

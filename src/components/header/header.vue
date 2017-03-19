<template>
  <div class="header">
    <div class="avatar-wrap">
      <div class="head">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content-wrap">
        <div class="content-title">
          <span class="brand"></span>
          <span class="title">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div v-if="seller.supports" class="support">
          <span class="support-icon" :class="privilege[seller.supports[0].type]"></span>
          <span class="support-content">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="btn" v-show="detailShowFlag" @click="detailShow()">
        <span class="privilege-num">{{seller.supports.length}}个</span>
        <i class="icon-arrow_right"></i>
      </div>
    </div>
    <div class="bulletin">
      <i class="bulletin-icon"></i>
      <div class="bulletin-content">{{seller.bulletin}}</div>
    </div>
    <div class="detail clear-fix">
      <div class="detail-wrapper">
        <div class="detail-main">
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
          <p>{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-footer">
        <i class="detail-close"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
          detailShowFlag:false
      }
    },
    methods:{
      detailShow:function(){
        this.detailShowFlag = true;
      }
    },
    created(){
        this.privilege = ['decrease','discount','guarantee','invoice','special'];
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/index.scss';

  .header {
    background: #ccc;
    color: #fff;

    .avatar-wrap {
      position: relative;
      font-size: 0;
      .head {
        display: inline-block;
        margin:24px 0 18px 24px;
        img{
          border-radius: 4px;
        }
      }
      .content-wrap {
        display: inline-block;
        margin-left: 16px;
        height: 64px;
        overflow: hidden;

        .content-title {
          font-size: 16px;
          font-weight: bold;
          line-height: 16px;
          padding:2px 0 4px 0;
          .brand {
            width: 30px;
            height: 16px;
            display: inline-block;
            @include brand-img(brand,30px,18px);
          }
          .title{
            margin-left: 6px;
            vertical-align: top;
          }
        }
        .description{
            font-size: 12px;
            font-weight: 200;
            line-height: 12px;
            padding:4px 0 5px 0;
        }
        .support{
          padding:5px 0 2px 0;
          display: -webkit-flex;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .support-icon{
            display: inline-block;
            width:12px;
            height:12px;
          }
          .support-content{
              font-size: 10px;
              font-weight: 200;
              margin: auto 0 auto 4px;
          }
          .decrease{
            @include brand-img(decrease_1,12px,12px);
          }
          .discount{
            @include brand-img(discount_1,12px,12px);
          }
          .guarantee{
            @include brand-img(guarantee_1,12px,12px);
          }
          .invoice{
            @include brand-img(invoice_1,12px,12px);
          }
          .special{
            @include brand-img(special_1,12px,12px);
          }

        }
      }
      .btn{
        height:12px;
        -webkit-border-radius:10px;
        -moz-border-radius:10px;
        border-radius:10px;
        display: inline-block;
        background: rgba(0,0,0,0.2);
        padding:7px 8px 7px 8px;
        position: absolute;
        right:12px;
        bottom:16px;
        .privilege-num{
          display: inline-block;
          height:12px;
          line-height: 12px;
          font-weight: 200;
          font-size: 10px;
        }
      }
    }
    .bulletin{
      width:100%;
      height:28px;
      line-height: 28px;
      background: rgba(7,17,27,0.2);
      .bulletin-icon{
        width: 22px;
        height:12px;
        display: inline-block;
        @include brand-img(bulletin,22px,12px);
        margin-left: 10px;
        padding-top: 7px;
      }
      .bulletin-content{
        width:310px;
        padding: 0 0 0 4px;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        font-size: 10px;
      }
    }
    .detail{
      width: 100%;
      height:100%;
      background: rgba(0,0,0,0.8);
      position: fixed;
      left:0;
      top:0;
      overflow: auto;
      z-index:100;
      .detail-wrapper{
        min-height:100%;
        .detail-main{
          padding-bottom: 64px;
        }
      }
      .detail-footer{
        position: relative;
        height:64px;
        margin-top: -64px;
        clear: both;
        background: red;
        .detail-close{
          display: inline-block;
          width: 32px;
          height: 32px;
          font-size: 32px;
        }
      }
    }
  }

</style>

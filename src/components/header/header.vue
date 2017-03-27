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
      <div v-if="seller.supports" class="btn" @click="detailShow()">
        <span class="privilege-num">{{seller.supports.length}}个</span>
        <i class="icon-arrow_right"></i>
      </div>
    </div>
    <!--公告-->
    <div class="bulletin">
      <span class="bulletin-icon"></span>
      <span class="bulletin-content">{{seller.bulletin}}</span>
      <i class="bulletin-go"></i>
    </div>
    <!--弹出详情页-->
    <div v-show="detailShowFlag" class="detail clear-fix">
      <div class="detail-wrapper">
        <div class="detail-main">
          <div class="detail-title">{{seller.name}}</div>
          <v-star class="detail-star" :size="48" :score="seller.score"></v-star>
          <!--详情页小标题-->
          <div class="detail-info">
            <div class="detail-info-line"></div>
            <div class="detail-info-title">优惠信息</div>
            <div class="detail-info-line"></div>
          </div>
          <!--详情页的优惠信息-->
          <div class="privilege-info">
            <ul>
              <li class="privilege-list" v-if="seller.supports" v-for="(item,index) in seller.supports">
                <span class="item" :class="privilege[seller.supports[index].type]"></span>
                <span class="item-2" :class="">{{seller.supports[index].description}}</span>
              </li>
            </ul>
          </div>
          <!--详情页小标题-->
          <div class="detail-info">
            <div class="detail-info-line"></div>
            <div class="detail-info-title">商家公告</div>
            <div class="detail-info-line"></div>
          </div>
          <!--弹出层的公告内容-->
          <div class="bulletin-info">
            <p class="bulletin-text">
              {{seller.bulletin}}
            </p>
          </div>
        </div>
      </div>
      <div class="detail-footer">
        <div class="detail-close" @click="detailHide">
          <i class="icon-close"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  import star from '../star/star';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        detailShowFlag: false
      }
    },
    methods: {
      detailShow(){
        this.detailShowFlag = true;
      },
      detailHide(){
        this.detailShowFlag = false;
      }
    },
    created(){
      this.privilege = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
    },
    components: {
      'v-star': star
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
        margin: 24px 0 18px 24px;
        img {
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
          padding: 2px 0 4px 0;
          .brand {
            width: 30px;
            height: 16px;
            display: inline-block;
            @include brand-img(brand, 30px, 18px);
          }
          .title {
            margin-left: 6px;
            vertical-align: top;
          }
        }
        .description {
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
          padding: 4px 0 5px 0;
        }
        .support {
          font-size: 0;
          height: 16px;
          padding: 5px 0 2px 0;
          line-height: 16px;
          .support-icon {
            display: inline-block;
            width: 12px;
            height: 12px;
          }
          .support-content {
            display: inline-block;
            font-size: 10px;
            font-weight: 200;
            margin: 0 0 0 4px;
            vertical-align: top;
          }
          .decrease {
            @include brand-img(decrease_1, 12px, 12px);
          }
          .discount {
            @include brand-img(discount_1, 12px, 12px);
          }
          .guarantee {
            @include brand-img(guarantee_1, 12px, 12px);
          }
          .invoice {
            @include brand-img(invoice_1, 12px, 12px);
          }
          .special {
            @include brand-img(special_1, 12px, 12px);
          }

        }
      }
      .btn {
        height: 12px;
        -webkit-border-radius: 10px;
        -moz-border-radius: 10px;
        border-radius: 10px;
        display: inline-block;
        background: rgba(0, 0, 0, 0.2);
        padding: 7px 8px 7px 8px;
        position: absolute;
        right: 12px;
        bottom: 16px;
        .privilege-num {
          display: inline-block;
          height: 12px;
          line-height: 12px;
          font-weight: 200;
          font-size: 10px;
        }
      }
    }
    .bulletin {
      clear: both;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      background: rgba(7, 17, 27, 0.2);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .bulletin-icon {
        display: inline-block;
        width: 22px;
        height: 12px;
        @include brand-img(bulletin, 22px, 12px);
      }
      .bulletin-content {
        padding: 0 0 0 4px;
        font-size: 10px;
      }
      .bulletin-go {
        display: inline-block;
        width: 12px;
        height: 12px;
      }
    }
    .detail {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      top: 0;
      overflow: auto;
      z-index: 100;
      .detail-wrapper {
        width: 100%;
        min-height: 100%;
        overflow: hidden;
        .detail-main {
          margin-bottom: 64px;
          .detail-title {
            text-align: center;
            font-size: 16px;
            font-weight: 700;
            color: rgb(255, 255, 255);
            margin: 64px auto 16px auto;
          }
          .detail-star {
            width: 100%;
            text-align: center;
            margin: 16px auto 28px auto;
          }
          .detail-info {
            display: flex;
            width: 80%;
            margin: 28px auto 12px auto;
            .detail-info-line {
              flex: 1;
              position: relative;
              top: 6px;
              border-top: 1px solid rgba(255, 255, 255, 0.2);
            }
            .detail-info-title {
              padding: 0 12px;
            }
          }
          .privilege-info {
            .privilege-list {
              width: 80%;
              height: 16px;
              line-height: 16px;
              margin: 12px auto;
              font-size: 0;
            }
            .item {
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-left: 12px;
            }
            .item-2 {
              display: inline-block;
              font-size: 12px;
              margin-left: 6px;
              vertical-align: top;
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
          }
          .bulletin-info {
            .bulletin-text {
              width: 80%;
              margin: 24px auto;
              font-size: 12px;
              font-weight: 200;
              line-height: 24px;
            }
          }
        }
      }
      .detail-footer {
        position: relative;
        height: 64px;
        margin-top: -64px;
        clear: both;
        text-align: center;
        .detail-close {
          display: inline-block;
          width: 32px;
          height: 32px;
          padding:3px;
          font-size: 32px;
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }

</style>

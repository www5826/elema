/**
* Created by 吴建平 on 2017/3/30.
* For:评价组件
*/


<template>
  <div class="evaluate-wrapper" ref="evaluate">
    <div class="evaluate">
      <div class="overview">
        <div class="overview-left">
          <h1 class="overview-left-title">{{seller.score}}</h1>
          <p class="overview-left-des">综合评分</p>
          <p class="overview-left-compare">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="overview-right-server">
            <span class="server">服务态度</span>
            <v-star class="star" :size="24" :score="seller.serviceScore"></v-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="overview-right-server">
            <span class="server">服务态度</span>
            <v-star class="star" :size="24" :score="seller.foodScore"></v-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="overview-right-server">
            <span class="server">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-rating class="rating border-1px" @select="selectType" @toggle="toggleComment" :rating="ratings"></v-rating>
      <!--评论列表-->
      <div class="comment-wrapper">
        <ul>
          <li v-show="needShow(item)" class="comment-item" v-for="item in ratings">
            <div class="user">
              <img style="border-radius: 50%" :src="item.avatar" width="28" height="28">
              <div class="username-wrapper">
                <div class="username">{{item.username}}</div>
                <v-star class="star" :size="24" :score="item.score"></v-star>
                <span class="sendtime" v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              </div>
            </div>
            <div class="comment-time">{{item.rateTime}}</div>
            <div class="comment-content-wrapper">
              <div class="comment-content">{{item.text}}</div>
              <span class="recommend-wrapper">
                <i class="icon"
                   :class="{'icon-thumb_up':item.rateType === 0,'icon-thumb_down':item.rateType === 1}"></i>
                <span class="recommend" v-for="rem in item.recommend">{{rem}}</span>
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  import BScroll from 'better-scroll';//引入滚动插件
  import rating from 'components/rating/rating';//引入评价组件
  import star from 'components/star/star';//引入评价组件
  import split from 'components/split/split';//引入分割线组件

  const ERR_OK = 0;//成功状态
  const ALL = 2;//全选

  export default{
    props: {
        seller:{}
    },
    data(){
      return {
        //从数据库获取的评价
        ratings: [],
        //评价组件选择的状态
        selectedType: ALL,
        //评价组件只选择内容按钮
        onlyComment: false
      }
    },
    created(){
      this.$http.get('/api/ratings').then(res => {
        let result = res.body;
        if (result.errno === ERR_OK) {
          this.ratings = result.data;
          this.$nextTick(() => {
            this._initBScroll();
          })
        }
      });

    },
    methods: {
      _initBScroll(){
        this.scroll = new BScroll(this.$refs.evaluate, {
          click: true
        });
      },
      //从子组件传来的选择值
      selectType(type){
        this.selectedType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      toggleComment(bool){
        this.onlyComment = bool;
        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      needShow(item){
        //过滤掉没有内容的评价
        if (this.onlyComment && item.text === '') {
          return false;
        }
        if (this.selectedType === ALL) {
          return true;
        } else {
          return this.selectedType === item.rateType;
        }
      }
    },
    components: {
      'v-rating': rating,
      'v-star': star,
      'v-split': split
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  @import './../../common/sass/index';

  .evaluate-wrapper {
    position: fixed;
    top: 174px;
    bottom: 0;
    overflow: hidden;
  }

  .evaluate {
    .overview {
      display: flex;
      padding: 18px 0;
      .overview-left {
        flex: 0 0 127px;
        width: 127px;
        text-align: center;
        border-right: 1px solid #ccc;
        .overview-left-title {
          font-size: 25px;
          color: rgb(255, 153, 0);
          line-height: 28px;
          padding-top: 3px;
        }
        .overview-left-des {
          font-size: 12px;
          color: rgb(7, 17, 27);
          margin-top: 6px;
          line-height: 12px;
        }
        .overview-left-compare {
          font-size: 10px;
          color: rgb(163, 168, 173);
          line-height: 10px;
          margin-top: 8px;
          padding-bottom: 3px;
        }
      }
      .overview-right {
        flex: 1;
        padding: 0 24px;
        .server {
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .overview-right-server {
          margin-top: 8px;
          .star {
            margin-left: 12px;
          }
          .score {
            font-size: 12px;
            color: rgb(255, 153, 0);
            line-height: 18px;
            margin-left: 12px;
          }
          .time {
            font-size: 12px;
            color: rgb(147, 153, 159);
            line-height: 18px;
            margin-left: 12px;
          }
        }
      }
    }
    .rating {
      padding: 18px;
    }
    .comment-wrapper {
      .comment-item {
        position: relative;
        padding: 18px;
        .user {
          .username-wrapper {
            display: inline-block;
            .username {
              font-size: 10px;
              color: $black;
            }
            .star {
              margin-top: 4px;
            }
            .sendtime {
              font-size: 10px;
              font-weight: 200;
              color: $gray;
              line-height: 12px;
              margin-left: 6px;
            }
          }
        }
        .comment-time {
          position: absolute;
          right: 18px;
          top: 18px;
          font-size: 10px;
          color: $gray;
        }
        .comment-content-wrapper {
          padding: 6px 0 0 20px;
          .comment-content {
            font-size: 12px;
            color: $black;
            line-height: 18px;
          }
          .recommend-wrapper {
            display: inline-block;
            margin-top: 8px;
            font-size: 0;
            .icon {
              font-size: 12px;
              &.icon-thumb_up {
                color: rgb(0, 160, 220);
              }
              &.icon-thumb_down {
                color: rgb(183, 187, 191);
                line-height: 16px;
              }
            }
            .recommend {
              border: 1px solid rgba(7, 17, 27, 0.1);
              border-radius: 2px;
              padding: 0 6px;
              font-size: 9px;
              color: rgb(147, 153, 159);
              line-height: 16px;
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
</style>

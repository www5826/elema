/**
* Created by 吴建平 on 2017/3/20.
* For:商品的组件
*/

<template>
  <div class="goods">
    <div class="menu" ref="menu">
      <ul>
        <li :class="{'select':currentIndex === index}" class="item border-1px" v-for="(item,index) in goods" @click="selectMenu(index,$event)">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="privilege[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-list" ref="goods">
      <ul>
        <li v-for="title in goods" class="list-item-hook">
          <p class="title">{{title.name}}</p>
          <ul>
            <li class="goods-info border-1px" v-if="title.foods" v-for="item in title.foods">
              <div class="left">
                <img width="56" height="56" :src="item.image" alt="美食">
              </div>
              <div class="right">
                <p class="name">{{item.name}}</p>
                <p v-show="item.description != ''" class="des">{{item.description}}</p>
                <p class="situation">月售{{item.sellCount}}&nbsp;&nbsp;好评率{{item.rating}}%</p>
                <div class="price">
                  <span class="new-price">￥{{item.price}}</span>
                  <span v-show="item.oldPrice != ''" class="old-price"><del>￥24</del></span>
                </div>
              </div>
              <div class="car-control-wrapper">
                <v-carControl :food="item"></v-carControl>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcar :selectFoods="selectFoods" :seller="seller" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></v-shopcar>
  </div>
</template>
<script type="text/ecmascript-6">

  import BScroll from 'better-scroll';
  import shopCar from './../shopcar/shopcar.vue';
  import carControl from './../carControl/carControl.vue';


  const ERR_OK = '0';//成功状态

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: [],
        liHeight:[],
        scrollY:0,
        selectFlag:false,
        goodsScroll:Object
      }
    },
    created(){
      this.privilege = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then(res => {
        let result = res.body;
        if (result.errno == ERR_OK) {
          this.goods = result.data;
          this.$nextTick(() => {
            this._initBScroll();
          })
        }
      });
    },
    computed:{
      currentIndex(){
          let height = this.liHeight;
          for(let i = 0;i < height.length;i++){
              let firstHeight = height[i];
              let secondHeight = height[i + 1];
              if(this.scrollY > firstHeight - 100 && this.scrollY < secondHeight){
                  return i + 1;
              }
          }
          return 0;
      },
      selectFoods(){
          let selectedFoods = [];
           this.goods.forEach((good)=>{
               good.foods.forEach((el)=>{
                   if(el.count > 0){
                       selectedFoods.push(el);
                   }
               })
           });
        return selectedFoods;
      }
    },
    methods: {
      _initBScroll(){
        this.goodsScroll = new BScroll(this.$refs.goods,{
            probeType:3,
            click:true
        });
        let menuScroll = new BScroll(this.$refs.menu,{
            click:true
        });
        this.computedHeight();
        this.getScrollHeight();
      },
      computedHeight(){
          let height = 0;
          let oLi = this.$refs.goods.getElementsByClassName('list-item-hook');
          for(let i = 0;i < oLi.length;i++){
              height += oLi[i].clientHeight;
              this.liHeight.push(height);
          }
      },
      getScrollHeight(){
        //获取滚动时的高度
        this.goodsScroll.on('scroll',(pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      selectMenu(index,event){
          if(!event._constructed){
              return;
          }
          let foodList = this.$refs.goods.getElementsByClassName('list-item-hook');
          let el = foodList[index];
          this.goodsScroll.scrollToElement(el,300);
      }
    },
    components:{
      'v-shopcar':shopCar,
      'v-carControl': carControl
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import '../../common/sass/index.scss';

  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 45px;
    overflow: hidden;
    .menu {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .select{
        z-index:15;
        font-weight: 700;
        background: #fff;
      }
      .item {
        display: table;
        width: 56px;
        height: 56px;
        padding: 0 12px;
        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          &.decrease {
            @include brand-img(decrease_3, 12px, 12px);
          }
          &.discount {
            @include brand-img(discount_3, 12px, 12px);
          }
          &.guarantee {
            @include brand-img(guarantee_3, 12px, 12px);
          }
          &.invoice {
            @include brand-img(invoice_3, 12px, 12px);
          }
          &.special {
            @include brand-img(special_3, 12px, 12px);
          }
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          font-size: 12px;
          line-height: 16px;
        }
      }
    }
    .goods-list {
      flex: 1;
      .title {
        height: 27px;
        font-size: 12px;
        font-weight: 700;
        color: rgb(147, 153, 159);
        line-height: 27px;
        background: #f3f5f7;
        border-left: 2px solid #d9dde1;
        padding-left: 14px;
      }
      .goods-info {
        display: flex;
        .left {
          flex: 0 0 74px;
          padding: 18px 0 18px 18px;
        }
        .right {
          flex: 1;
          padding: 18px 18px 18px 10px;
          .name {
            font-size: 14px;
            color: rgb(7, 17, 27);
            line-height: 14px;
            padding: 2px 0 4px 0;
          }
          .des, .situation {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;
            padding: 4px 0;
          }
          .price {
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
        .car-control-wrapper{
          display: inline-block;
          position: absolute;
          right:18px;
          bottom:18px;
        }
      }
    }
  }
</style>

/**
* Created by 吴建平 on 2017/3/20.
* For:商品的组件
*/

<template>
  <div class="goods">
    <div class="menu">
      <ul>
        <li class="item border-1px" v-for="item in goods">
          <span class="text">
            <span v-show="item.type > 0" class="icon" :class="privilege[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-list"></div>
  </div>
</template>
<script type="text/ecmascript-6">

  const ERR_OK = '0';//成功状态

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data(){
      return {
        goods: []
      }
    },
    created(){
      this.privilege = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
      this.$http.get('/api/goods').then(res => {
        let result = res.body;
        if (result.errno == ERR_OK) {
          this.goods = result.data;
        }
      });
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
    overflow: auto;
    .menu {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
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
          line-height: 14px;
        }
      }
    }
    .goods-list {
      flex: 1;
    }
  }
</style>

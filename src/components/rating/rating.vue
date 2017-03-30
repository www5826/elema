/**
* Created by 吴建平 on 2017/3/27.
* For:评价组件
*/
<template>
  <div class="rating">
    <div class="label">
      <span @click="select(2,$event)" :class="{'active':selectType === 2}" class="block all">{{desc.all}}<span
        class="count">{{rating.length}}</span></span>
      <span @click="select(0,$event)" :class="{'active':selectType === 0}" class="block positive">{{desc.positive}}<span
        class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" :class="{'active':selectType === 1}" class="block negative">{{desc.negative}}<span
        class="count">{{negatives.length}}</span></span>
    </div>
    <div class="border-1px"></div>
    <div class="check" @click="toggle">
      <i class="icon-check_circle" :class="{'on':onlyComment}"></i>
      <span class="content">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  const POSITIVE = 0;//积极的评价
  const NEGATIVE = 1;//消极的评价
  const ALL = 2;//全部

  export default{
    props: {
      rating: {
        type: Array,
        default(){
          return []
        }
      },
      initSelectType: {
        type: Number,
        default: ALL
      },
      initOnlyComment: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default(){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data(){
      return {
        onlyComment: this.initOnlyComment,
        selectType: this.initSelectType
      }
    },
    methods: {
      select(type, event){
        if (!event._constructed) {
          return;
        }
        this.selectType = type;
        this.$emit('select',type);
      },
      toggle(){
        this.onlyComment = !this.onlyComment;
        this.$emit('toggle',this.onlyComment);
      }
    },
    computed: {
      positives(){
        return this.rating.filter((item) => {
          return item.rateType === POSITIVE;
        });
      },
      negatives(){
        return this.rating.filter((item) => {
          return item.rateType === NEGATIVE;
        });
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

  @import './../../common/sass/index';

  .rating {
    background: #fff;
    .label {
      .block {
        width: 60px;
        height: 30px;
        font-size: 12px;
        border-radius: 3px;
        padding: 8px 12px;
        color: #fff;
        line-height: 30px;
        background: rgb(0, 160, 220);
        .count {
          font-size: 8px;
          margin-left: 3px;
        }
        &.active {
          background: rgb(0, 160, 220);
          color: #fff;
        }
      }
      .all {
        background: rgba(0, 160, 220, 0.2);
        color: rgb(77, 85, 93);
      }
      .positive {
        background: rgba(0, 160, 220, 0.2);
        color: rgb(77, 85, 93);
      }
      .negative {
        background: rgba(77, 85, 93, 0.2);
        color: rgb(77, 85, 93);
      }
    }
    .border-1px {
      padding-top: 18px;
    }
    .check {
      margin: 12px 0;
      color: rgb(147, 153, 159);
      .icon-check_circle {
        font-size: 24px;
        line-height: 24px;
        &.on {
          color: #079B62;
        }
      }
      .content {
        font-size: 12px;
        line-height: 24px;
        vertical-align: top;
      }
    }
  }
</style>

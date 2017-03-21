<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue';

  const ERR_OK = 0;

  export default{
    data() {
      return {
        seller: {}
      };
    },
    created(){
      this.$http.get('/api/seller').then(res => {
        let result = res.body;
        if (result.errno == ERR_OK) {
          this.seller = result.data;
        }
      });
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'common/sass/index.scss';

  #app {
    .tab {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      .tab-item {
        flex: 1;
        text-align: center;
      }
      .router-link-active {
        color: rgb(240, 20, 20);
      }

    }
  }
</style>

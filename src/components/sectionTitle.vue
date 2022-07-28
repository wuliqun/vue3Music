<template>
  <div class="m-section-title" :class="`m-section-title-${type}`">
    <router-link :to="route" class="title">{{ title }}</router-link>
    <div class="navs">
      <template v-for="(nav, index) in navs" :key="nav.title">
        <router-link :to="nav.route" class="nav">{{ nav.title }}</router-link>
        <span v-if="index < navs!.length - 1" class="sep">|</span>
      </template>
    </div>
    <router-link :to="route" class="more" :class="`more-${moreType}`" v-show="moreType !== 0">更多</router-link>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  moreType: {
    type: Number,
    default: 0
  },
  type: {
    type: Number,
    default: 1
  }, // 类型
  title: String,
  route: {
    type: [String, Object]
  },
  navs: Array<any>
});

console.log(props)


</script>
<style lang="scss">
.m-section-title {
  display: flex;
  align-items: center;
  height: 34px;
  padding-right: 10px;
  border-bottom: 2px solid #C10D0C;

  .title {
    font-size: 20px;
    color: #333;
    margin-right: 18px;
  }

  .navs {
    display: flex;
    color: #666;

    .nav {
      color: #666;  
      &:hover{
        text-decoration: underline;
      }    
    }
    .sep{
      margin:0 10px;
    }
  }
  .more{
    margin-left: auto;
    color:#666;
    margin-top: 5px;
    &:hover{
      text-decoration: underline;
    }
    &.more-1{
      padding-right: 15px;
      background-image: url(../img/index/arrow-right.png);
      background-position: right center;
      background-repeat: no-repeat;
    }
  }

  &.m-section-title-1 {
    position: relative;
    padding-left: 34px;

    &:before {
      position: absolute;
      content: "";
      top: 9px;
      left: 9px;
      width: 16px;
      height: 16px;
      box-sizing: border-box;
      border-radius: 50%;
      background-color: #fff;
      border: 5px solid #C10D0C;
    }
  }
}
</style>
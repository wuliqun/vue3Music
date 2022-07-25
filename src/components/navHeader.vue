<template>
  <div class="m-header">
    <div class="header">
      <h1 class="logo">
        <a href="/#/index"></a>
      </h1>
      <!-- 路由 -->
      <div class="links">
        <router-link :to="{ name: 'recommend' }" class="link" :class="{active:isDiscover}"
          >发现音乐</router-link
        >
        <router-link class="link" active-class="active" :to="{ name: 'my' }">我的音乐</router-link>
        <router-link class="link" active-class="active" :to="{ name: 'friend' }">关注</router-link>
        <a class="link" href="https://music.163.com/store/product" target="_blank">商城</a>
        <a class="link" href="https://music.163.com/musician/artist" target="_blank">音乐人</a>
        <router-link class="link hot" active-class="active" :to="{ name: 'download' }">下载客户端</router-link>
      </div>

      <!-- 搜索 -->
      <div class="search">
        <div class="ico-search"></div>
        <div class="input-wrapper">
          <input type="text" id="input" v-model="search" @focus="focusStatus = true" @blur="focusStatus = false" />
          <label v-show="showLabel" for="input">音乐/视频/电台/用户</label>
        </div>
      </div>

      <!-- 创作者中心 | 登录 -->
      <a href="https://music.163.com/login?targetUrl=%2Fcreatorcenter" class="creator">创作者中心</a>
      <a href="javascript:void(0);" class="login">登录</a>
    </div>

    <!-- 副导航 -->
    <div class="sub-nav">
      <div class="content" v-show="isDiscover">
        <div class="sub-links">
          <router-link class="sub-link" active-class="active" :class="{active:$route.name === 'recommend'}" :to="{name:'recommend'}">推荐</router-link>
          <router-link class="sub-link" active-class="active" :to="{name:'rank'}">排行榜</router-link>
          <router-link class="sub-link r" active-class="active" :to="{name:'playlist'}">歌单</router-link>
          <router-link class="sub-link" active-class="active" :to="{name:'djradio'}">主播电台</router-link>
          <router-link class="sub-link" active-class="active" :to="{name:'artist'}">歌手</router-link>
          <router-link class="sub-link" active-class="active" :to="{name:'album'}">新碟上架</router-link>
        </div> 
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed,ref } from 'vue';
import {  useRoute } from 'vue-router';
const focusStatus = ref('false');
const search = ref('');

const showLabel = computed(()=>{
  return !search.value && !focusStatus.value;
});

const route = useRoute();
const isDiscover = computed(()=>{
  return ['recommend','rank','djradio','artist','playlist','album'].indexOf(String(route.name)) !== -1;
});


</script>

<style lang="scss">
.m-header {
  box-sizing: border-box;
  background: #242424;
  .header {
    display: flex;
    align-items: center;
    width: 1100px;
    margin: 0 auto;
    border-bottom: 1px solid #000;
    .logo {
      width: 176px;
      height: 69px;
      background-repeat: no-repeat;
      background-image: url(../img/header/logo.png);
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    // 路由
    .links {
      display: flex;
      .link {
        position: relative;
        padding: 0 19px;
        line-height: 69px;
        font-size: 14px;
        color: #ccc;
        &.active,
        &:hover {
          background-color: #000;
          color: #fff;
        }
        &.active:after{
          content:"";
          position: absolute;
          left:50%;
          bottom:-0.5px;
          transform: translateX(-50%);
          width: 12px;
          height: 6px;
          background-image: url(../img/header/ico-arrow-up-1.png);
        }
        &.hot:before{
          content:"";
          position: absolute;
          top: 18px;
          right: -20px;
          width: 26px;
          height: 13px;
          background-image: url(../img/header/ico-hot.png);
        }
      }
    }

    // 搜索
    .search {
      display: flex;
      align-items: center;
      width: 158px;
      height: 32px;
      margin-left: auto;
      background-color: #fff;
      border-radius: 16px;
      .ico-search{
        flex-shrink: 0;
        width:13px;
        height: 14px;
        margin:0 6px 0 9px;
        background-image: url(../img/header/ico-search.png);
      }
      .input-wrapper{
        position: relative;
        color:#333;
        input{
          height:16px;
          width:125px;
        }
        label{
          position: absolute;
          line-height: 16px;
          top:0;
          left:0;
          color:#9b9b9b;
          cursor:text;
        }
      }
    }

    // 创作者中心
    .creator{
      margin:0 19px;
      padding: 0 14px;
      line-height: 30px;
      border:1px solid #ccc;
      color:#ccc;
      border-radius: 16px;
      &:hover{
        border-color:#fff;
        color:#fff;
      }
    }
    .login{
      color:#787878;
      &:hover{
        color:#999;
        text-decoration: underline;
      }
    }
  }

  // 次级导航
  .sub-nav{
    padding:3px 0;
    background-color: #C20C0C;
    border-bottom: 1px solid #a40011;
    .content{
      width: 1100px;
      margin:0 auto;
    }
    .sub-links{
      display: flex;
      margin-left: 180px;
      .sub-link{
        margin:4px 17px;
        padding:0 13px;
        color:#fff;
        line-height: 20px;
        border-radius: 10px;
        &.active,&:hover{
          background-color: #9B0909;
        }

        &.r{
          position: relative;
          &:after{
            content: "";
            position: absolute;
            top:2px;
            right: 5px;
            width: 8px;
            height: 8px;
            background-size: contain;
            background-image: url(../img/header/ico-r.png);
          }
        }
      }
    }
  }
}
</style>

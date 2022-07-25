<template>
  <div class="m-header">
    <div class="header">
      <h1 class="logo">
        <a href="/#/index"></a>
      </h1>
      <div class="links">
        <router-link class="link">发现音乐</router-link>
        <router-link class="link">我的音乐</router-link>
        <router-link class="link">关注</router-link>
        <a class="link" href="javascript:void(0)">商城</a>
        <a class="link" href="javascript:void(0)">音乐人</a>
        <router-link class="link">下载客户端</router-link>
      </div>
    </div>
  </div>  
</template>
<script lang="ts" setup>

</script>

<style lang="scss">
.m-header{
  box-sizing: border-box;
  background: #242424;
  border-bottom: 1px solid #000;
  .header{
    display: flex;
    align-items: center;
    width: 1100px;
    margin: 0 auto;
    .logo{
      width:176px;
      height:69px;
      background-repeat: no-repeat;
      background-image: url(../img/logo.png);
      a{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .links{
      display: flex;
      .link{
        padding:0 19px;
        line-height: 69px;
        color:#ccc;
      }
    }
  }
}
</style>

<template>
  <div class="m-banner" :style="bannerStyle">
    <div class="site-wrapper">
      <div class="swiper-container">
        <div class="mask"></div>
        <div class="swiper">
          <div class="slide" v-for="banner in banners" :key="banner.imageUrl">
            <a
              :href="banner.url"
              v-if="banner.url"
              target="_blank"
              class="banner-link"
            >
              <img :src="banner.imageUrl" class="banner-img" alt="" />
            </a>
            <router-link :to="{ name: 'index' }" v-else class="banner-link">
              <img :src="banner.imageUrl" class="banner-img" alt="" />
            </router-link>
          </div>
        </div>
        <div class="navigation">
          <a
            href="javascript:void(0);"
            class="swiper-prev"
            @click="slide(false)"
          ></a>
          <a
            href="javascript:void(0);"
            class="swiper-next"
            @click="slide(true)"
          ></a>
        </div>
      </div>
      <div class="download">
        <router-link :to="{ name: 'download' }" class="dld"></router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, Ref, reactive } from "vue";

import { blurImage } from "UTILS/utils";
import { apiBanner } from "../api";

let banners: Ref<any[]> = ref([]);

const bannerStyle = computed(() => {
  // if(data.swiper && banners.value.length){
  //   return {
  //     "background-image":`url(${blurImage(banners.value[data.swiper.realIndex].imageUrl)})`
  //   }
  // }
  return null;
});
function getBanner() {
  apiBanner().then((res) => {
    banners.value = res.banners;
  });
}
getBanner();
</script>
<style lang="scss">
.m-banner {
  background-size: 6000px;
  background-position: center center;
  .site-wrapper {
    display: flex;
    .swiper-container {
      position: relative;
      width: 730px;
      .mask {
        position: absolute;
        z-index: 5;
        top: 0;
        right: 0;
        width: 39px;
        height: 100%;
        background-image: url(../img/banner.png);
      }
      .banner-link {
        display: block;
        width: 100%;
        height: 285px;
        .banner-img {
          width: 100%;
          height: 100%;
        }
      }
      // 导航
      .navigation {
        .swiper-prev,
        .swiper-next {
          position: absolute;
          top: 50%;
          width: 37px;
          height: 63px;
          transform: translateY(-50%);
          background-image: url(../img/index/banner.png);
        }
        .swiper-prev {
          left: -70px;
          background-position: 0 -360px;
          &:hover {
            background-position: 0 -430px;
          }
        }
        .swiper-next {
          right: -320px;
          background-position: 0 -510px;
          &:hover {
            background-position: 0 -580px;
          }
        }
      }
      // 分页器
      .pagination{
        
      }
    }
    .download {
      width: 254px;
      height: 285px;
      padding-top: 185px;
      box-sizing: border-box;
      background-image: url(../img/index/download.png);
      .dld {
        display: block;
        width: 215px;
        height: 56px;
        margin: 0 auto;
        &:hover {
          background-image: url(../img/index/download.png);
          background-position: 0 -289px;
        }
      }
    }
  }
}
</style>
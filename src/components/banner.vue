<template>
  <div class="m-banner" :style="bannerStyle">
    <div class="site-wrapper">
      <div class="swiper-container">
        <div class="mask"></div>
        <div class="swiper">
          <transition
            name="banner"
            v-for="(banner, index) in banners"
            :key="banner.imageUrl"
          >
            <div class="slide" v-if="activeIndex === index">
              <a
                :href="banner.url"
                v-if="banner.url"
                target="_blank"
                class="banner-link"
              >
                <img :src="banner.imageUrl" class="banner-img" alt="" />
              </a>
              <router-link
                :to="getBannerRoute(banner)"
                v-else
                class="banner-link"
              >
                <img :src="banner.imageUrl" class="banner-img" alt="" />
              </router-link>
            </div>
          </transition>
        </div>
        <div class="navigation">
          <a
            href="javascript:void(0);"
            class="swiper-prev"
            @click="slidePrev"
          ></a>
          <a
            href="javascript:void(0);"
            class="swiper-next"
            @click="slideNext"
          ></a>
        </div>
        <div class="pagination">
          <div
            class="pagination-item"
            v-for="i in banners.length"
            :key="i"
            :class="{ active: i - 1 === activeIndex }"
            @click="slide(i - 1)"
          ></div>
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

// 获取轮播图
let banners: Ref<any[]> = ref([]);
const activeIndex = ref(0);

const bannerStyle = computed(() => {
  if (banners.value.length) {
    return {
      "background-image": `url(${blurImage(
        banners.value[activeIndex.value].imageUrl
      )})`,
    };
  }
  return null;
});
function getBanner() {
  apiBanner().then((res) => {
    banners.value = res.banners;
  });
}
getBanner();

function getBannerRoute(banner: any) {
  switch (banner.targetType) {
    // 歌单
    case 1000:
      return { name: "playlist", query: { playlistId: banner.targetId } };
    // 歌曲
    case 1:
      return { name: "song", query: { songId: banner.targetId } };
    // 音乐日历
    case 10:
      return { name: "album", query: { albumId: banner.targetId } };
  }
}

// 轮播逻辑
const interval = 3500;
let timer = setTimeout(() => {
  slideNext();
}, interval);
function slide(index: number) {
  clearTimeout(timer);
  activeIndex.value = index;
  timer = setTimeout(() => {
    slideNext();
  }, interval);
}
function slideNext() {
  let index = (activeIndex.value + 1) % banners.value.length;
  slide(index);
}
function slidePrev() {
  let index =
    (activeIndex.value + banners.value.length - 1) % banners.value.length;
  slide(index);
}
</script>
<style lang="scss">
.m-banner {
  background-size: 6000px;
  background-position: center center;
  transition: all 0.5s ease-in;
  .site-wrapper {
    display: flex;
    .swiper-container {
      position: relative;
      width: 730px;
      height: 285px;
      .mask {
        position: absolute;
        z-index: 5;
        top: 0;
        right: 0;
        width: 39px;
        height: 100%;
        background-image: url(../img/banner.png);
      }
      .swiper {
        width: 100%;
        height: 100%;
      }
      .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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
      .pagination {
        display: flex;
        justify-content: center;
        position: absolute;
        z-index: 10;
        left: 0;
        bottom: 5px;
        width: 100%;
        height: 20px;
        .pagination-item {
          width: 20px;
          height: 20px;
          cursor: pointer;
          background-image: url(../img/index/dot.png);
          &.active,
          &:hover {
            background-image: url(../img/index/dot-active.png);
          }
        }
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

  // banner 动画

  .banner-enter-from,
  .banner-leave-to {
    opacity: 0;
  }
  .banner-enter-to,
  .banner-leave-from {
    transition: opacity 0.5s ease-in;
  }
}
</style>
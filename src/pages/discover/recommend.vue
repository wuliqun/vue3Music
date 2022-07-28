<template>
  <div class="p-recommend">
    <banner />
    <div class="site-wrapper">
      <div class="recommend">
        <div class="r-left">
          <!-- 歌单推荐 -->
          <div class="r-list">
            <section-title v-bind="playlistTitle"></section-title>
          </div>

          <!-- 专辑推荐 -->
          <div class="r-list"></div>

          <!-- 热榜推荐 -->
          <div class="r-list"></div>
        </div>
        <div class="r-right"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import Banner from '../../components/banner.vue';
import SectionTitle from '../../components/sectionTitle.vue';
import playlists from '../../components/playlists.vue';

const playlistTitle = reactive({
  title: "热门推荐",
  route: '/playlist',
  type: 1,
  moreType: 1,
  navs: [
    {
      title: "华语",
      route: "/playlist?cat=华语"
    },
    {
      title: "流行",
      route: "/playlist?cat=流行"
    },
    {
      title: "摇滚",
      route: "/playlist?cat=摇滚"
    },
    {
      title: "民谣",
      route: "/playlist?cat=民谣"
    },
    {
      title: "电子",
      route: "/playlist?cat=电子"
    },
  ]
})

</script>
<style lang="scss">
.p-recommend {
  .recommend {
    display: flex;
    height: 500px;
    border: 1px solid #d3d3d3;
    background-color: #fff;
    border-width: 0 1px;

    .r-left {
      flex: 1;
      padding-top: 20px;
      border-right: 1px solid #d3d3d3;

      .r-list {
        width: 689px;
        margin: 0 auto 60px;
      }
    }

    .r-right {
      width: 252px;
    }
  }
}
</style>
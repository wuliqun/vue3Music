<template>
  <div class="p-recommend">
    <banner />
    <div class="site-wrapper">
      <div class="recommend">
        <div class="r-left">
          <!-- 歌单推荐 -->
          <div class="r-list">
            <section-title v-bind="playlistTitle"></section-title>
            <div class="playlist-wrapper">
              <playlists :list="recommendPlaylist"></playlists>
            </div>
          </div>

          <!-- 专辑推荐 -->
          <div class="r-list">
            <section-title v-bind="albumTitle"></section-title>
          </div>

          <!-- 热榜推荐 -->
          <div class="r-list"></div>
        </div>
        <div class="r-right"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue';
import Banner from '../../components/banner.vue';
import SectionTitle from '../../components/sectionTitle.vue';
import playlists from '../../components/playlists.vue';
import { apiGetRecommendPlaylist } from '../../api';

//#region 歌单推荐
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
});
const recommendPlaylist: Ref<any[]> = ref([]);
function getRecommendPlaylist() {
  return apiGetRecommendPlaylist().then(res => {
    recommendPlaylist.value = res.result;
  });
}
getRecommendPlaylist();
//#endregion

//#region 新碟上架
const albumTitle = reactive(
  {
    title: "新碟上架",
    route: '/album',
    type: 1,
    moreType: 1,
  })
//#endregion

</script>
<style lang="scss">
.p-recommend {
  .recommend {
    display: flex;
    border: 1px solid #d3d3d3;
    background-color: #fff;
    border-width: 0 1px;

    .r-left {
      flex: 1;
      padding-top: 20px;
      border-right: 1px solid #d3d3d3;

      .r-list {
        width: 689px;
        margin: 0 auto 10px;

        .playlist-wrapper {
          margin-top: 20px;
        }
      }
    }

    .r-right {
      width: 252px;
    }
  }
}
</style>
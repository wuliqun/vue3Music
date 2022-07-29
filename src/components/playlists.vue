<template>
  <div class="m-playlists">
    <div class="playlist-item" v-for="item in list" :key="item.id">
      <div class="img">
        <router-link :to="{ name: 'playlist', query: { playlistId: item.id } }" class="link" :title="item.name">
          <img :src="item.picUrl" alt="">
        </router-link>
        <div class="info">
          <div class="listen">
            <div class="ico"></div>
            <div class="num">{{ addNumUnit(item.playCount) }}</div>
          </div>
          <a href="javascript:void(0);" class="play"></a>
        </div>
      </div>
      <router-link :to="{ name: 'playlist', query: { playlistId: item.id } }" class="name" :title="item.name">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{ list: any[] }>();

function addNumUnit(num: number) {
  if (num >= 10000) {
    return Math.round(num / 10000) + '万';
  } else {
    return "" + num;
  }
}

</script>
<style lang="scss">
.m-playlists {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .playlist-item {
    margin-bottom: 30px;
    .img {
      position: relative;
      width: 140px;
      height: 140px;

      .link {
        display: block;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .info {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 27px;
        background-image: url(../img/playlist/info-bg.png);

        display: flex;
        align-items: center;
        justify-content: space-between;

        .listen {
          display: flex;
          margin-left: 10px;

          .ico {
            width: 14px;
            height: 11px;
            margin-right: 5px;
            background-position: 0 -24px;
            background-image: url(../img/index/iconall.png);
          }

          .num {
            color: #ccc;
          }
        }

        .play {
          width: 16px;
          height: 17px;
          margin-right: 10px;
          background-position: 0 0;
          background-image: url(../img/index/iconall.png);

          &:hover {
            background-position: 0 -60px;
          }
        }
      }
    }

    .name {
      display: block;
      width: 140px;
      margin-top: 5px;
      color:#000;
      line-height: 1.4;
      font-size: 14px;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
import { createRouter, createWebHashHistory } from 'vue-router';

const index = () => import('../pages/index.vue');
const discover = () => import('../pages/discover.vue');
const my = () => import('../pages/my.vue');
const friend = () => import('../pages/friend.vue');
const download = () => import('../pages/download.vue');


const recommend = () => import('../pages/discover/recommend.vue');
const rank = () => import('../pages/discover/rank.vue');
const djradio = () => import('../pages/discover/djradio.vue');
const artist = () => import('../pages/discover/artist.vue');
const playlist = () => import('../pages/discover/playlist.vue');
const album = () => import('../pages/discover/album.vue');
const song = () => import('../pages/discover/song.vue');



const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/index",
      name: "index",
      component: index,
      redirect:{name:'recommend'},
      children: [
        {
          path: "/recommend",
          name: "recommend",
          component: recommend
        },
        {
          path: "/rank",
          name: "rank",
          component: rank
        },
        {
          path: "/artist",
          name: "artist",
          component: artist
        },
        {
          path: "/djradio",
          name: "djradio",
          component: djradio
        },
        {
          path: "/playlist",
          name: "playlist",
          component: playlist
        },
        {
          path: "/album",
          name: "album",
          component: album
        },
        {
          path: "/song",
          name: "song",
          component: song
        },
      ]
    }, {
      path: "/my",
      name: "my",
      component: my
    }, {
      path: "/friend",
      name: "friend",
      component: friend
    }, {
      path: "/download",
      name: "download",
      component: download
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: {
        name: "recommend"
      }
    }
  ]
});

export default router;
<template>
  <div class="app">
    <nav-header />
    <router-view></router-view>
    <site-bottom />
  </div>
</template>
<script lang="ts" setup>
import NavHeader from '../components/navHeader.vue';
import SiteBottom from '../components/siteBottom.vue';
</script>
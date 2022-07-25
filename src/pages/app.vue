<template>
  <div class="app">
    <nav-header />
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
import NavHeader from '../components/navHeader.vue';
</script>
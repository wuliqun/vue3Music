<template>
  <div class="m-playlists">

  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{list:any[]}>();
</script>
<style lang="scss">
.m-playlists{
  display: flex;
  justify-content: space-between;  
}
</style>
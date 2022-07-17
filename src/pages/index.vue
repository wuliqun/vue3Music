<template>
  <div class="p-index">
    INDEX PAGE
  </div>
</template>
<script lang="ts" setup>
import { apiBanner } from '../api';

function getBanner(){
  apiBanner().then(res=>{
  })
}
getBanner();
</script>
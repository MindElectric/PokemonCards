<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import logo from './assets/logo/logo.png'
</script>

<template>
  <header class='fixed z-10 w-full'>
    <div class='flex items-center justify-center w-full h-16 bg-red-400'>
      <img :src="logo" alt="logo" width="200" />
    </div>
  </header>

  <RouterView />
</template>

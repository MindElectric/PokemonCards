<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    vid: String
})

const videoSrc = computed(() => new URL(`../../assets/videos/${props.vid}.mp4`, import.meta.url).href);
</script>

<template>
    <div class="w-full h-auto">
        <video autoplay muted loop>
            <source :src="videoSrc" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    </div>

</template>
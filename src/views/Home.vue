<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel/';
import Autoplay from 'embla-carousel-autoplay'

import { itemCarousel } from "@/assets/carousel_images/images"
</script>
<template>
    <Transition>
        <h1 class="text-5xl font-normal text-center py-44">Build your own Pokémon cards</h1>
    </Transition>
    <!-- Button -->
    <section class="flex justify-center mb-16">
        <Button size="lg" @click="$router.push('/create')" class="px-12 text-lg font-bold py-7">
            Create
        </Button>
    </section>

    <!-- Card carousel -->
    <section class="mb-16">
        <Carousel :opts="{
            loop: true,
        }" :plugins="[Autoplay({ delay: 5000 })]">
            <CarouselContent>
                <CarouselItem v-for="item in itemCarousel" class="flex justify-center bg-blue-400 ">
                    <img :src="item" alt="item1">
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>


    <div class="ml-12">
        <h2 class="mb-3 text-4xl font-bold">
            What to do?
        </h2>
        <p class="mb-16">
            Sint laboris esse magna eu id. Aute nisi adipisicing reprehenderit id eiusmod adipisicing id officia. In et
            sit
            nulla dolore Lorem minim. Pariatur minim Lorem ut sit pariatur dolore fugiat.
        </p>

        <Button class="px-12 mb-16 text-lg font-bold py-7" @click="$router.push('/create')">Create your own
            card!</Button>
    </div>

</template>

<style scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-enter-active {
    transition: all 2s ease;
}
</style>
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel/';
import Autoplay from 'embla-carousel-autoplay'

import { itemCarousel } from "@/assets/carousel_images/images"
import Player from '@/components/video/Player.vue';
</script>
<template>
    <div class="justify-center block py-32 mx-5 lg:flex lg:py-44">
        <Transition name="fade" appear>
            <h1 class="mb-10 text-5xl font-normal text-center lg:mb-0">Build your own Pokémon cards</h1>
        </Transition>

        <Transition name="slide-in" appear>
            <div class="isometric-container">
                <img :src="itemCarousel[0]" alt="item1" class="isometric-image">
            </div>
        </Transition>
    </div>
    <!-- Button -->
    <section class="flex justify-center mb-16">
        <RouterLink to="/create">

            <Button size="lg" class="px-12 text-lg font-bold py-7">
                Create
            </Button>
        </RouterLink>
    </section>

    <!-- Card carousel -->
    <section class="mb-16">
        <Carousel :opts="{
            loop: true,
        }" :plugins="[Autoplay({ delay: 5000 })]">
            <CarouselContent>
                <CarouselItem v-for="item in itemCarousel"
                    class="flex justify-center bg-gradient-to-r from-gray-800 to-black ">
                    <div class="isometric-container animate-float">
                        <img :src="item" alt="item1" class="h-64 p-9 md:h-96 isometric-image">
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>


    <section class="ml-12">
        <h2 class="mb-3 text-4xl font-bold">
            What to do?
        </h2>
        <p class="mb-10 lg:mb-16 lg:text-xl">
            Just fill out the form with your desired pokemon with its attributes!
        </p>

        <div class="flex justify-center w-4/6 mx-auto">
            <Player vid="ExampleFormDesktop" />
        </div>

        <p class="mt-10 mb-10 lg:mb-16 lg:text-xl">Once you have filled out the form, click the "Create" button and your
            card
            will be created! <br>
            Click the download button to download your card.
        </p>

        <div class="flex justify-center w-4/6 mx-auto">
            <Player vid="ExampleFormDesktop2" />
        </div>

        <RouterLink to="/create">
            <Button class="px-8 py-3 mt-10 mb-16 font-bold md:px-12 md:text-lg md:py-7">Create your own
                card!</Button>
        </RouterLink>
    </section>

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

.slide-in-enter-from {
    opacity: 0;
    transform: translateX(100px);
}

.slide-in-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.slide-in-enter-active {
    transition: all 2s ease-in-out;
}
</style>
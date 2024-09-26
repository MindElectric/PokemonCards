<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';
import type { Type } from '@/interfaces/pokemon';
import backgroundImg from '../../assets/background.png'
import * as pokemonImageTypes from '../../assets/poke_types/index'
import { downloadImage } from '@/helpers/downloadCanvas';

const props = defineProps({
    pokemonName: {
        type: String,
        required: true
    },
    nature: {
        type: String,
        required: true
    },
    ability: {
        type: String,
        required: true
    },
    moves: {
        type: Array as () => String[],
        required: true
    },
    nationalDex: {
        type: Number,
        required: true
    },
    hp: {
        type: Number,
        required: true
    },
    pokeTypes: {
        type: Array as () => Type[],
        required: true
    },
    art: {
        type: String,
        required: true,
        default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
    }
});


const width = 350;
const height = 200;
const canvas = ref<HTMLCanvasElement | null>(null);

const drawImage = () => {
    const ctx = (canvas.value as HTMLCanvasElement).getContext('2d');


    // Draw background image
    const background = new Image();
    background.src = backgroundImg;
    background.crossOrigin = 'anonymous';
    // Pokemon type images
    const type1Img = new Image();
    type1Img.crossOrigin = 'anonymous';
    const type2Img = new Image();
    type2Img.crossOrigin = 'anonymous';

    const sprite = new Image();
    sprite.src = props.art;
    sprite.crossOrigin = 'anonymous';
    background.onload = () => {
        ctx?.drawImage(background, 0, 0, width, height);
        type1Img.src = getImageUrl(props.pokeTypes[0].type.name);
        if (props.pokeTypes.length > 1) {
            type2Img.src = getImageUrl(props.pokeTypes[1].type.name);
        }


        sprite.onload = () => {
            ctx?.drawImage(sprite, 50, 30, 300, 300);
        };



        // type1Img.src = normal;
        type1Img.onload = () => {
            ctx?.drawImage(type1Img, 10, 50, 60, 60);
            if (props.pokeTypes.length > 1) {
                ctx?.drawImage(type2Img, 10, 100, 60, 60);

            }


            // Draw text
            if (ctx) {
                ctx.font = 'bold 21px Roboto';
                ctx.fillStyle = 'white';
                ctx.fillText(`${props.nationalDex}`, 107, 33);
                ctx.fillText(`${props.pokemonName}`, 170, 33);
                ctx.font = '16px Roboto';
                ctx.fillStyle = 'black';
                ctx.fillText(`${props.nature}`, 480, 89);
                ctx.fillText(` ${props.ability}`, 480, 132);
                ctx.fillText(`${props.moves![0]}`, 380, 188);
                ctx.fillText(`${props.moves![1]}`, 380, 230);
                ctx.fillText(`${props.moves![2]}`, 380, 272);
                ctx.fillText(`${props.moves![3]}`, 380, 314);

                ctx.font = 'bold 20px Roboto';
                ctx.fillStyle = '#A7DC64'
                ctx.fillText(`${props.hp} HP`, 55, 329);
            }
        };
    }
};

// Function to get pokemon type image URL
const getImageUrl = (name: string) => {
    return pokemonImageTypes[name as keyof typeof pokemonImageTypes];
};


const onClick = () => {
    downloadImage(props);
};

onMounted(() => {
    drawImage();
});


</script>
<template>
    <div>

        <div class="p-4 bg-white rounded-lg shadow-lg">
            <canvas id="canvasId" ref="canvas" :width="width" :height="height" class="border"></canvas>
        </div>
        <div>
            <button @click="onClick" class="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">
                Download Image
            </button>
        </div>
    </div>

</template>
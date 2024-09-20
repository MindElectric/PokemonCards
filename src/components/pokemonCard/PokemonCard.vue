<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';
import type { Type } from '@/interfaces/pokemon';
import backgroundImg from '../../assets/background.png'
import * as pokemonImageTypes from '../../assets/poke_types/index'

const props = defineProps({
  pokemonName: String,
  nature: String,
  ability: String,
  moves: Array,
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


const width = 600;
const height = 350;
const canvas = ref<HTMLCanvasElement | null>(null);

const drawImage = () => {
  const ctx = (canvas.value as HTMLCanvasElement).getContext('2d');
  const sprite = new Image();
  sprite.src = props.art;

  // Draw background image
  const background = new Image();
  background.src = backgroundImg;
  // Pokemon type images
  const type1Img = new Image();
  const type2Img = new Image();
  background.onload = () => {
    ctx?.drawImage(background, 0, 0, width, height);
    type1Img.src = getImageUrl(props.pokeTypes[0].type.name);
    if (props.pokeTypes.length > 1) {
      type2Img.src = getImageUrl(props.pokeTypes[1].type.name);
      console.log(type2Img);
    }


    // type1Img.src = normal;
    type1Img.onload = () => {
      ctx?.drawImage(type1Img, 10, 50, 60, 60);
      if (props.pokeTypes.length > 1) {
        ctx?.drawImage(type2Img, 10, 100, 60, 60);

      }
      ctx?.drawImage(sprite, 50, 30, 300, 300);

      // Draw text
      if (ctx) {
        ctx.font = 'bold 20px Roboto';
        ctx.fillStyle = 'white';
        ctx.fillText(`Name: ${props.pokemonName}`, 150, 33);
        ctx.font = '16px Roboto';
        ctx.fillStyle = 'black';
        ctx.fillText(`${props.nature}`, 480, 89);
        ctx.fillText(` ${props.ability}`, 480, 132);
        ctx.fillText(`${props.moves!.join(', ')}`, 20, 200);
      }
    };
  }
};

// Function to get pokemon type image URL
const getImageUrl = (name: string) => {
  return pokemonImageTypes[name as keyof typeof pokemonImageTypes];
};


const downloadImage = () => {
  const link = document.createElement('a');
  link.download = `${props.pokemonName}.png`;
  link.href = (canvas.value as HTMLCanvasElement).toDataURL('image/png');
  link.click();
};

onMounted(() => {
  drawImage();
});

onUpdated(() => {
  drawImage();
});

</script>
<template>
  <div>

    <div class="p-4 bg-white rounded-lg shadow-lg">
      <canvas ref="canvas" :width="width" :height="height" class="border"></canvas>
    </div>
    <div>
      <button @click="downloadImage" class="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">
        Download Image
      </button>
    </div>
  </div>

</template>
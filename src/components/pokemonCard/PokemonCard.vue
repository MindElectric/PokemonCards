<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue';
import backgroundImg from '../../assets/background.png'
import normal from '../../assets/poke_types/NORMAL.png'

const props = defineProps({
  pokemonName: String,
  nature: String,
  ability: String,
  moves: Array,
});

const width = 800;
const height = 600;
const canvas = ref<HTMLCanvasElement | null>(null);

const drawImage = () => {
  const ctx = (canvas.value as HTMLCanvasElement).getContext('2d');

  // Draw background image
  const background = new Image();
  background.src = backgroundImg;
  background.onload = () => {
    ctx?.drawImage(background, 0, 0, width, height);

    // Pokemon type images
    const type1Img = new Image();
    type1Img.src = normal;
    type1Img.onload = () => {
      ctx?.drawImage(type1Img, 50, 300, 100, 100);

    // Draw text
     if (ctx) {
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Name: ${props.pokemonName}`, 20, 50);
      ctx.fillText(`Nature: ${props.nature}`, 20, 100);
      ctx.fillText(`Ability: ${props.ability}`, 20, 150);
      ctx.fillText(`Moves: ${props.moves!.join(', ')}`, 20, 200);
    }
  };
}
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
    <div class="p-4 bg-white rounded-lg shadow-lg">
    <canvas ref="canvas" :width="width" :height="height" class="border"></canvas>
  </div>
  <div>
    <button @click="downloadImage" class="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700">
      Download Image
    </button>
  </div>
    
</template>
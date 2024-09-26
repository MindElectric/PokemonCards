import type { PokemonCardData } from "@/interfaces/pokemonCardData"
import * as pokemonImageTypes from '../assets/poke_types/index'
import backgroundImg from '../assets/background.png'
// export const downloadImage = (canvas: HTMLCanvasElement | null, pokemonName: string | undefined) => {
//     // Create an off-screen canvas
//     if (canvas) {
//         const offScreenCanvas = document.createElement('canvas');
//         const context = offScreenCanvas.getContext('2d');

//         // Set the desired dimensions for the downloaded image
//         const desiredWidth = 600; // Example width
//         const desiredHeight = 350; // Example height

//         offScreenCanvas.width = desiredWidth;
//         offScreenCanvas.height = desiredHeight;

//         // Draw the original canvas content onto the off-screen canvas
//         context?.drawImage(canvas, 0, 0, desiredWidth, desiredHeight);

//         // Create a link to download the image
//         const link = document.createElement('a');
//         link.download = `${pokemonName}.png`;
//         link.href = offScreenCanvas.toDataURL('image/png');
//         link.click();
//     }
// };

export const downloadImage = (data: PokemonCardData) => {
    const canvas = document.getElementById('canvasId') as HTMLCanvasElement | null;
    const width = 600;
    const height = 350;
    // const drawImage = () => {
    const ctx = canvas?.getContext('2d');


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
    sprite.src = data.art;
    sprite.crossOrigin = 'anonymous';
    background.onload = () => {
        ctx?.drawImage(background, 0, 0, width, height);
        type1Img.src = getImageUrl(data.pokeTypes[0].type.name);
        if (data.pokeTypes.length > 1) {
            type2Img.src = getImageUrl(data.pokeTypes[1].type.name);
        }


        sprite.onload = () => {
            ctx?.drawImage(sprite, 50, 30, 300, 300);
        };



        // type1Img.src = normal;
        type1Img.onload = () => {
            ctx?.drawImage(type1Img, 10, 50, 60, 60);
            if (data.pokeTypes.length > 1) {
                ctx?.drawImage(type2Img, 10, 100, 60, 60);

            }


            // Draw text
            if (ctx) {
                ctx.font = 'bold 21px Roboto';
                ctx.fillStyle = 'white';
                ctx.fillText(`${data.nationalDex}`, 107, 33);
                ctx.fillText(`${data.pokemonName}`, 170, 33);
                ctx.font = '16px Roboto';
                ctx.fillStyle = 'black';
                ctx.fillText(`${data.nature}`, 480, 89);
                ctx.fillText(` ${data.ability}`, 480, 132);
                ctx.fillText(`${data.moves![0]}`, 380, 188);
                ctx.fillText(`${data.moves![1]}`, 380, 230);
                ctx.fillText(`${data.moves![2]}`, 380, 272);
                ctx.fillText(`${data.moves![3]}`, 380, 314);

                ctx.font = 'bold 20px Roboto';
                ctx.fillStyle = '#A7DC64'
                ctx.fillText(`${data.hp} HP`, 55, 329);
            }
        };
    }
    if (canvas) {
        const link = document.createElement('a');
        link.download = `${data.pokemonName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } else {
        console.error('Canvas element not found');
    }
};



const getImageUrl = (name: string) => {
    return pokemonImageTypes[name as keyof typeof pokemonImageTypes];
};
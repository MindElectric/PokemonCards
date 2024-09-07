<script setup lang="ts">
import axios from 'axios';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';

import { ref } from 'vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import NatureSelect from '@/components/formSelects/NatureSelect.vue';
import AbilitySelect from '@/components/formSelects/AbilitySelect.vue';

const searchPoke = ref('')
const pokemon = ref([])
const selectPokemon = ref('')
const selectedPokemon = ref([]);

const getPokemon = async (value: string) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1000')
        const json = response.data.results
        const results = json.filter((pokemon: any) => {
            return (
                value &&
                pokemon &&
                pokemon.name &&
                pokemon.name.toLowerCase().includes(value.toLowerCase())
            )
        })
        pokemon.value = results

    } catch (error) {
        console.error(error);
    }
};

//Selecting a pokemon
const handleSelect = (value: string) => {
    selectPokemon.value = value
    console.log("You selected ", selectPokemon.value)
    pokemon.value = []
    searchPoke.value = selectPokemon.value
    getPokemonData(selectPokemon.value)
}

const getPokemonData = async (pokemonName: string) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        console.log(response.data)
        return selectedPokemon.value = response.data
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="mt-10 ">
        <form>
            <div class="flex justify-center">
                <div>
                    <label class="text-3xl font-bold">Pokémon Name</label>
                    <Input v-model="searchPoke" @update:model-value="getPokemon(searchPoke)" placeholder="Pikachu" />
                    <ScrollArea v-show="pokemon.length"
                        class="mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                        <div v-for="pokemon in pokemon" :key="pokemon" @click="handleSelect(pokemon.name)"
                            class="pl-3 hover:bg-slate-200">
                            {{ pokemon.name }}
                        </div>

                    </ScrollArea>
                </div>

                <div class="ml-20">
                    <label class="text-3xl font-bold">Nickname (optional)</label>
                    <Input />
                </div>

            </div>

            <!-- Nature -->
            <div class="flex justify-center mt-10">
                <div class="w-1/4">
                    <NatureSelect />
                </div>
            </div>

            <!-- Ability -->
            <div class="flex justify-center mt-10">
                <div class="w-1/4">
                    <AbilitySelect :abilities="selectedPokemon.abilities" />
                </div>
            </div>

            <!-- Moves -->
            <label class="mt-10 ml-20 text-3xl font-bold">Moves</label>
            <div class="flex mt-5 justify-evenly">
                <div class="flex w-4/5">
                    <!-- Move 1 -->
                    <Input placeholder="Move 1" class="mr-5" />
                    <!-- Move 2 -->
                    <Input placeholder="Move 2" />
                </div>
            </div>

            <div class="flex mt-10 justify-evenly">
                <div class="flex w-4/5">
                    <!-- Move 3 -->
                    <Input placeholder="Move 3" class="mr-5" />
                    <!-- Move 4 -->
                    <Input placeholder="Move 4" />
                </div>
            </div>

            <!-- Button -->
            <div class="flex justify-center mt-10 mb-14">
                <Button type="submit">Create</Button>
            </div>

        </form>
    </div>
</template>
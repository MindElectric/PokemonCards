<script setup lang="ts">
import axios from 'axios';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';

import { ref } from 'vue';
import NatureSelect from '@/components/formSelects/NatureSelect.vue';
import AbilitySelect from '@/components/formSelects/AbilitySelect.vue';
import MovesInput from '@/components/MovesInput/MovesInput.vue';
import type { Pokemon, SimplePokemon } from '@/interfaces';

const searchPoke = ref('')
const pokemon = ref([] as SimplePokemon[])

// Name of the pokemon
const selectPokemon = ref('')
// Data of the pokemon (name, moves, abilities, etc)
const selectedPokemon = ref({} as Pokemon);


const isReadOnlyToggle = ref(true);

const getPokemon = async (value: string) => {
    try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1000')
        const json = response.data.results
        if (value != selectPokemon.value) {
            isReadOnlyToggle.value = true
        }
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
    pokemon.value = []
    searchPoke.value = selectPokemon.value
    getPokemonData(selectPokemon.value)
    isReadOnlyToggle.value = false;
}

// Get data of the selected pokemon when selected
const getPokemonData = async (pokemonName: string) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
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
                    <!-- List of pokemons -->
                    <div class="relative">
                        <div v-show="pokemon.length"
                            class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                            <div v-for="poke in pokemon" :key="poke.name" @click="handleSelect(poke.name)"
                                class="pl-3 hover:bg-slate-200">
                                {{ poke.name }}
                            </div>

                        </div>
                    </div>
                </div>

                <div class="ml-20">
                    <label class="text-3xl font-bold">Nickname (optional)</label>
                    <Input />
                </div>

            </div>

            <!-- Nature -->
            <div class="flex justify-center mt-10">
                <div class="w-1/4">
                    <NatureSelect :isDisabled="isReadOnlyToggle" />
                </div>
            </div>

            <!-- Ability -->
            <div class="flex justify-center mt-10">
                <div class="w-1/4">
                    <AbilitySelect :abilities="selectedPokemon.abilities" :isDisabled="isReadOnlyToggle" />
                </div>
            </div>

            <!-- Moves -->
            <!-- TODO: Add moves array -->
            <MovesInput :isReadOnly="isReadOnlyToggle" :moves="selectedPokemon.moves" />

            <!-- Button -->
            <div class="flex justify-center mt-10 mb-14">
                <Button type="submit">Create</Button>
            </div>

        </form>
    </div>
</template>
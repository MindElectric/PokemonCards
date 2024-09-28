<script setup lang="ts">
import axios from 'axios';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';

import { ref } from 'vue';
import NatureSelect from '@/components/formSelects/NatureSelect.vue';
import AbilitySelect from '@/components/formSelects/AbilitySelect.vue';
import type { Pokemon, SimplePokemon } from '@/interfaces';
import MovesSelect from '@/components/formSelects/MovesSelect.vue';
import PokemonCard from '@/components/pokemonCard/PokemonCard.vue';
import capitalizeString from '@/utils/capitalize'
import FormDialog from '@/components/alertDialog/FormDialog.vue'
import PokemonCardSM from '@/components/pokemonCard/PokemonCardSM.vue';


const showPokemonCard = ref(false);
const searchPoke = ref('')
const pokemon = ref([] as SimplePokemon[])

// Name of the pokemon
const selectPokemon = ref('')
// Data of the pokemon (name, moves, abilities, etc)
const selectedPokemon = ref({} as Pokemon);


const isReadOnlyToggle = ref(true);

const selectedNature = ref('');

const selectedAbility = ref('');

const resetValues = () => {
    selectPokemon.value = ''
    selectedPokemon.value = {} as Pokemon
    selectedNature.value = ''
    selectedAbility.value = ''
    selectedMoves.value = []
    pokemon.value = []
    move1.value = ''
    move2.value = ''
    move3.value = ''
    move4.value = ''
}

const getPokemon = async (value: string) => {
    try {
        resetValues()
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1000')
        const json = response.data.results
        if (value != selectPokemon.value) {
            isReadOnlyToggle.value = true
        }
        const results = json.filter((pokemon: SimplePokemon) => {
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
const handleSelect = async (value: string) => {
    const pokemonName = capitalizeString(value)
    searchPoke.value = pokemonName
    selectPokemon.value = value
    //erase previous data
    pokemon.value = []
    selectedNature.value = ''
    selectedAbility.value = ''
    selectedMoves.value = []
    await getPokemonData(selectPokemon.value)
    //User is able to interact with the form
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

const receiveNature = (nature: string) => {
    selectedNature.value = nature
}


const receiveAbilities = (ability: string) => {
    selectedAbility.value = ability
}
// Moves
const move1 = ref('');
const move2 = ref('');
const move3 = ref('');
const move4 = ref('');

const selectedMoves = ref([] as string[]);

const sprite = ref('');

const receiveMove1 = (move: string) => {
    move1.value = move
}
const receiveMove2 = (move: string) => {
    move2.value = move
}
const receiveMove3 = (move: string) => {
    move3.value = move
}
const receiveMove4 = (move: string) => {
    move4.value = move
}

const onSubmit = async () => {
    selectedMoves.value = [move1.value, move2.value, move3.value, move4.value]
    sprite.value = selectedPokemon.value.sprites.other!['official-artwork'].front_default
    showPokemonCard.value = true
    // Create pokemon card
}

//Close dialog
const onCancel = (toggle: boolean) => {
    showPokemonCard.value = toggle
}

const reset = () => {
    resetValues()
    searchPoke.value = ''
    isReadOnlyToggle.value = true
}

</script>

<template>
    <div class="mt-10 ">
        <form @submit.prevent="onSubmit">
            <div class="flex justify-center">
                <div>
                    <label class="text-3xl font-bold">Pokémon Name</label>
                    <Input v-model="searchPoke" @update:model-value="getPokemon(searchPoke)" placeholder="Pikachu"
                        name="Pokemon" required />
                    <!-- List of pokemons -->
                    <div class="relative">
                        <div v-show="pokemon.length"
                            class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                            <div v-for="poke in pokemon" :key="poke.name" @click="handleSelect(poke.name)"
                                class="pl-3 hover:bg-slate-200">
                                {{ capitalizeString(poke.name) }}
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
                    <NatureSelect :isDisabled="isReadOnlyToggle" @natureSelected="receiveNature"
                        :searchChange="selectPokemon" />
                </div>
            </div>

            <!-- Ability -->
            <div class="flex justify-center mt-10">
                <div class="w-1/4">
                    <AbilitySelect :abilities="selectedPokemon.abilities" :isDisabled="isReadOnlyToggle"
                        @abilitySelected="receiveAbilities" :searchChange="selectPokemon" />
                </div>
            </div>

            <!-- Moves -->
            <label class="mt-10 ml-20 text-3xl font-bold">Moves</label>
            <div class="flex mt-5 justify-evenly">
                <div class="flex w-4/5">
                    <!-- Move 1 -->
                    <div class="w-full mr-5">
                        <MovesSelect :isReadOnly="isReadOnlyToggle" :moves="selectedPokemon.moves" placeholder="Move 1"
                            :isRequired='true' @moveSelected="receiveMove1" :searchChange="selectPokemon" />

                    </div>
                    <div class="w-full">
                        <MovesSelect :isReadOnly="isReadOnlyToggle" :move="move2" :moves="selectedPokemon.moves"
                            placeholder="Move 2" @moveSelected="receiveMove2" :searchChange="selectPokemon" />
                    </div>
                </div>
            </div>
            <div class="flex mt-5 justify-evenly">
                <div class="flex w-4/5">
                    <!-- Move 1 -->
                    <div class="w-full mr-5">
                        <MovesSelect :isReadOnly="isReadOnlyToggle" :move="move3" :moves="selectedPokemon.moves"
                            placeholder="Move 3" @moveSelected="receiveMove3" :searchChange="selectPokemon" />

                    </div>
                    <div class="w-full">
                        <MovesSelect :isReadOnly="isReadOnlyToggle" :move="move4" :moves="selectedPokemon.moves"
                            placeholder="Move 4" @moveSelected="receiveMove4" :searchChange="selectPokemon" />
                    </div>
                </div>
            </div>

            <!-- Button -->
            <div class="flex justify-center mt-10 mb-14">
                <div>
                    <Button type="submit">Create</Button>
                </div>
                <div class="ml-10">
                    <Button type="button" @click="reset">Reset</Button>
                </div>
            </div>

        </form>

        <!-- Image -->
        <div v-if="showPokemonCard">
            <FormDialog @cancel="onCancel">
                <!-- Big Pokemon Card for lage screen -->
                <div class="hidden lg:block">
                    <PokemonCard :pokemonName="searchPoke" :art="sprite" :nature="selectedNature"
                        :pokeTypes="selectedPokemon.types" :ability="selectedAbility" :moves="selectedMoves"
                        :nationalDex="selectedPokemon.id" :hp="selectedPokemon.stats[0].base_stat" />
                </div>

                <!-- Small Pokemon Card for small screen -->
                <div class="block lg:hidden">
                    <PokemonCardSM :pokemonName="searchPoke" :art="sprite" :nature="selectedNature"
                        :pokeTypes="selectedPokemon.types" :ability="selectedAbility" :moves="selectedMoves"
                        :nationalDex="selectedPokemon.id" :hp="selectedPokemon.stats[0].base_stat" />
                </div>
            </FormDialog>
            <!-- <PokemonCard :pokemonName="searchPoke" :art="sprite" :nature="selectedNature"
                :pokeTypes="selectedPokemon.types" :ability="selectedAbility" :moves="selectedMoves"
                :nationalDex="selectedPokemon.id" :hp="selectedPokemon.stats[0].base_stat" /> -->
        </div>
    </div>
</template>
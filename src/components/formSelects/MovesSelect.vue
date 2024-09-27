<script setup lang="ts">
import { onUpdated, ref } from 'vue';
import type { Move } from '@/interfaces/pokemon';
import Input from '../ui/input/Input.vue';
import capitalizeString from '@/utils/capitalize';

const props = defineProps({
    isReadOnly: {
        type: Boolean,
        default: true
    },
    moves: {
        type: Array as () => Move[],
        default: []
    },
    placeholder: {
        type: String,
        required: false
    },
    isRequired: {
        type: Boolean
    },
    searchChange: {
        type: String
    }
})

const move1 = ref('');
const filteredMovesArray1 = ref([] as Move[]);

const moveName1 = (move: string, moves: Move[]) => {
    const filteredMoves = moves.filter(m => {
        return (
            move &&
            m.move.name.toLowerCase().includes(move.toLowerCase())
        )
    });
    filteredMovesArray1.value = filteredMoves;
};

const emits = defineEmits(['moveSelected']);
const emitMove = (move: string) => {
    // console.log("Emitting moveSelected with index:", move); // Debugging log
    emits('moveSelected', move);
};

const handleSelect1 = (value: string) => {
    const capitalizedValue = capitalizeString(value)
    move1.value = capitalizedValue
    filteredMovesArray1.value = []
    emitMove(capitalizedValue)

}

const handleChange = () => {
    if (props.searchChange === '') {
        move1.value = '';
    }
}

onUpdated(() => {
    if (props.searchChange === '') {
        handleChange();
    }
})

</script>

<template>
    <div class="w-full">
        <Input v-model="move1" :readonly="isReadOnly" :placeholder="placeholder" class="mr-5"
            @update:model-value="moveName1(move1, moves)" :required="isRequired" />
        <div class="relative">
            <div v-show="filteredMovesArray1.length"
                class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                <div v-for="(move, index) in filteredMovesArray1" :key="filteredMovesArray1[index].move.name"
                    @click="handleSelect1(filteredMovesArray1[index].move.name)" class="pl-3 hover:bg-slate-200">
                    {{ capitalizeString(filteredMovesArray1[index].move.name) }}
                </div>

            </div>
        </div>
    </div>





    <!-- <Select :disabled="isReadOnly" :name="placeholder" :required="isRequired">
        <SelectTrigger>
            <SelectValue :placeholder='placeholder' />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Moves</SelectLabel>
                <SelectItem v-for="(move, index) in moves" :value="moves[index].move.name">
                    <button @click.prevent="emitMove(moves[index].move.name)">{{ moves[index].move.name }}</button>
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select> -->


    <!-- This works alone 🤔 -->
    <!-- <button v-for="(move, index) in moves" :value="moves[index].move.name"
        @click.prevent="emitMove(moves[index].move.name)">
        {{ moves[index].move.name }}
    </button> -->



</template>
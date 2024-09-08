<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { ref } from 'vue';
import type { Move } from '@/interfaces/pokemon';

defineProps({
    isReadOnly: {
        type: Boolean,
        default: true
    },
    moves: {
        type: Array as () => Move[],
        default: []
    }
})

const move1 = ref('');
const move2 = ref('');
const move3 = ref('');
const move4 = ref('');
const movesArray = ref([]);
const filteredMovesArray = ref([] as Move[]);

const moveName = (move: string, moves: Move[]) => {
    console.log(move);
    const filteredMoves = moves.filter(m => {
        return (
            move &&
            m &&
            m.move.name &&
            m.move.name.toLowerCase().includes(move.toLowerCase())
        )
    });
    console.log(filteredMoves);
    filteredMovesArray.value = filteredMoves;
};

const handleSelect = (value: string) => {
    console.log("You selected ", value)
}

</script>

<template>
    <label class="mt-10 ml-20 text-3xl font-bold">Moves</label>
    <div class="flex mt-5 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 1 -->
            <div class="w-full">
                <Input v-model="move1" :readonly="isReadOnly" placeholder="Move 1" class="mr-5"
                    @update:model-value="moveName(move1, moves)" />
                <div class="relative">
                    <div v-show="filteredMovesArray.length"
                        class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                        <div v-for="(move, index) in filteredMovesArray" :key="filteredMovesArray[index].move.name"
                            @click="handleSelect(filteredMovesArray[index].move.name)" class="pl-3 hover:bg-slate-200">
                            {{ filteredMovesArray[index].move.name }}
                        </div>

                    </div>
                </div>
            </div>
            <!-- Move 2 -->
            <div class="w-full">
                <Input :readonly="isReadOnly" placeholder="Move 2" />

            </div>
        </div>
    </div>

    <div class="flex mt-10 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 3 -->
            <Input :readonly="isReadOnly" placeholder="Move 3" class="mr-5" />
            <!-- Move 4 -->
            <Input :readonly="isReadOnly" placeholder="Move 4" />
        </div>
    </div>
</template>
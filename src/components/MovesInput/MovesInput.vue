<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { onMounted, ref } from 'vue';
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

const moveName = (move: string) => {
    console.log(move)
}

const handleSelect = (value: string) => {
    console.log("You selected ", value)
}

</script>

<template>
    <label class="mt-10 ml-20 text-3xl font-bold">Moves</label>
    <div class="flex mt-5 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 1 -->
            <Input :readonly="isReadOnly" placeholder="Move 1" class="mr-5" @update:model-value="moveName(move1)" />
            <div class="relative">
                <div class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                    <div v-for="(move, index) in moves" :key="moves[index].move.name"
                        @click="handleSelect(moves[index].move.name)" class="pl-3 hover:bg-slate-200">
                        {{ moves[index].move.name }}
                    </div>

                </div>
            </div>
            <!-- Move 2 -->
            <Input :readonly="isReadOnly" placeholder="Move 2" />
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
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
const filteredMovesArray1 = ref([] as Move[]);
const filteredMovesArray2 = ref([] as Move[]);
const filteredMovesArray3 = ref([] as Move[]);
const filteredMovesArray4 = ref([] as Move[]);

const moveName1 = (move: string, moves: Move[]) => {
    const filteredMoves = moves.filter(m => {
        return (
            move &&
            m &&
            m.move.name &&
            m.move.name.toLowerCase().includes(move.toLowerCase())
        )
    });
    filteredMovesArray1.value = filteredMoves;
};

const moveName2 = (move: string, moves: Move[]) => {
    const filteredMoves = moves.filter(m => {
        return (
            move &&
            m &&
            m.move.name &&
            m.move.name.toLowerCase().includes(move.toLowerCase())
        )
    });
    filteredMovesArray2.value = filteredMoves;
};

const moveName3 = (move: string, moves: Move[]) => {
    const filteredMoves = moves.filter(m => {
        return (
            move &&
            m &&
            m.move.name &&
            m.move.name.toLowerCase().includes(move.toLowerCase())
        )
    });
    filteredMovesArray3.value = filteredMoves;
};

const moveName4 = (move: string, moves: Move[]) => {
    const filteredMoves = moves.filter(m => {
        return (
            move &&
            m &&
            m.move.name &&
            m.move.name.toLowerCase().includes(move.toLowerCase())
        )
    });
    filteredMovesArray4.value = filteredMoves;
};

const handleSelect1 = (value: string) => {
    move1.value = value
    filteredMovesArray1.value = []
}

const handleSelect2 = (value: string) => {
    move2.value = value
    filteredMovesArray2.value = []
}

const handleSelect3 = (value: string) => {
    move3.value = value
    filteredMovesArray3.value = []
}

const handleSelect4 = (value: string) => {
    move4.value = value
    filteredMovesArray4.value = []
}

</script>

<template>
    <label class="mt-10 ml-20 text-3xl font-bold">Moves</label>
    <div class="flex mt-5 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 1 -->
            <div class="w-full">
                <Input v-model="move1" :readonly="isReadOnly" placeholder="Move 1" class="mr-5"
                    @update:model-value="moveName1(move1, moves)" />
                <div class="relative">
                    <div v-show="filteredMovesArray1.length"
                        class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                        <div v-for="(move, index) in filteredMovesArray1" :key="filteredMovesArray1[index].move.name"
                            @click="handleSelect1(filteredMovesArray1[index].move.name)"
                            class="pl-3 hover:bg-slate-200">
                            {{ filteredMovesArray1[index].move.name }}
                        </div>

                    </div>
                </div>
            </div>
            <!-- Move 2 -->
            <div class="w-full">
                <Input v-model="move2" :readonly="isReadOnly" placeholder="Move 2" class="ml-5"
                    @update:model-value="moveName2(move2, moves)" />
                <div class="relative">
                    <div v-show="filteredMovesArray2.length"
                        class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                        <div v-for="(move, index) in filteredMovesArray2" :key="filteredMovesArray2[index].move.name"
                            @click="handleSelect2(filteredMovesArray2[index].move.name)"
                            class="pl-3 hover:bg-slate-200">
                            {{ filteredMovesArray2[index].move.name }}
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>

    <div class="flex mt-10 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 3 -->
            <div class="w-full">
                <Input v-model="move3" :readonly="isReadOnly" placeholder="Move 3" class="mr-5"
                    @update:model-value="moveName3(move3, moves)" />
                <div class="relative">
                    <div v-show="filteredMovesArray3.length"
                        class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                        <div v-for="(move, index) in filteredMovesArray3" :key="filteredMovesArray3[index].move.name"
                            @click="handleSelect3(filteredMovesArray3[index].move.name)"
                            class="pl-3 hover:bg-slate-200">
                            {{ filteredMovesArray3[index].move.name }}
                        </div>

                    </div>
                </div>
            </div>

            <!-- Move 4 -->
            <div class="w-full">
                <Input v-model="move4" :readonly="isReadOnly" placeholder="Move 4" class="ml-5"
                    @update:model-value="moveName4(move4, moves)" />
                <div class="relative">
                    <div v-show="filteredMovesArray4.length"
                        class="absolute z-10 w-full mt-2 overflow-y-auto border rounded-md max-h-44 bg-slate-50">

                        <div v-for="(move, index) in filteredMovesArray4" :key="filteredMovesArray4[index].move.name"
                            @click="handleSelect4(filteredMovesArray4[index].move.name)"
                            class="pl-3 hover:bg-slate-200">
                            {{ filteredMovesArray4[index].move.name }}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
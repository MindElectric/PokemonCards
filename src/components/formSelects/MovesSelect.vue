<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
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

// const move1 = ref('');
// const move2 = ref('');
// const move3 = ref('');
// const move4 = ref('');
// const movesArray = ref([] as string[]);

</script>

<template>
    <label class="mt-10 ml-20 text-3xl font-bold">Moves</label>
    <div class="flex mt-5 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 1 -->
            <div class="w-full mr-5">
                <Select :disabled="isReadOnly">
                    <SelectTrigger>
                        <SelectValue placeholder="Move 1" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Moves</SelectLabel>
                            <SelectItem v-for="(move, index) in moves" :value="index.toString()">
                                {{ moves[index].move.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <!-- Move 2 -->
            <div class="w-full">
                <Select :disabled="isReadOnly">
                    <SelectTrigger>
                        <SelectValue placeholder="Move 2" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Moves</SelectLabel>
                            <SelectItem v-for="(move, index) in moves" :value="index.toString()">
                                {{ moves[index].move.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>

        </div>
    </div>

    <div class="flex mt-10 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 3 -->
            <div class="w-full mr-5">
                <Select :disabled="isReadOnly">
                    <SelectTrigger>
                        <SelectValue placeholder="Move 3" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Moves</SelectLabel>
                            <SelectItem v-for="(move, index) in moves" :value="index.toString()">
                                {{ moves[index].move.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <!-- Move 4 -->
            <div class="w-full">
                <Select :disabled="isReadOnly">
                    <SelectTrigger>
                        <SelectValue placeholder="Move 4" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Moves</SelectLabel>
                            <SelectItem v-for="(move, index) in moves" :value="index.toString()">
                                {{ moves[index].move.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import natures from '@/assets/natures/natures.json'
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

defineProps({
    isDisabled: {
        type: Boolean,
    }
})

const natureName = ref('');

const emits = defineEmits(['natureSelected']);

const emitNature = (nature: string) => {
    emits('natureSelected', nature);
};

</script>

<template>
    <label class="text-3xl font-bold">Nature</label>
    <Select :disabled="isDisabled" required v-model="natureName" @update:model-value="emitNature(natureName)">
        <SelectTrigger>
            <SelectValue placeholder="Select a Nature" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Natures</SelectLabel>
                <SelectItem v-for="nature in natures.natures" :value="nature.name" :key="nature.name">
                    {{ nature.name }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>
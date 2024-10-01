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
import { onUpdated, ref } from 'vue';

const props = defineProps({
    isDisabled: {
        type: Boolean,
    },
    searchChange: {
        type: String,
    }
})

const natureName = ref('');

const emits = defineEmits(['natureSelected']);

const emitNature = (nature: string) => {
    emits('natureSelected', nature);
};

const handleChange = () => {
    if (props.searchChange === '') {
        natureName.value = '';
    }
}

onUpdated(() => {
    if (props.searchChange === '') {
        handleChange();
    }
})

</script>

<template>
    <label class="text-3xl font-bold" for="Nature">Nature</label>
    <Select name="Nature" :disabled="isDisabled" required v-model="natureName"
        @update:model-value="emitNature(natureName)">
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
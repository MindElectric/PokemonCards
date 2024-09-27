<script setup lang="ts">
import { onUpdated, ref } from "vue";
import type { Ability } from "../../interfaces/pokemon"
import capitalizeString from "@/utils/capitalize";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

const props = defineProps({
    abilities: {
        type: Array as () => Ability[],
        default: [],
    },
    isDisabled: {
        type: Boolean,
    },
    searchChange: {
        type: String,
    }
})

const abilityName = ref('');

const emits = defineEmits(['abilitySelected']);

const emitAbility = (ability: string) => {
    const capitalizedAbility = capitalizeString(ability);
    emits('abilitySelected', capitalizedAbility);
};

const handleChange = () => {
    if (props.searchChange === '') {
        abilityName.value = '';
    }
}

onUpdated(() => {
    if (props.searchChange === '') {
        handleChange();
    }
})

</script>

<template>
    <label class="text-3xl font-bold">Ability</label>
    <Select :disabled="isDisabled" required v-model="abilityName" @update:model-value="emitAbility(abilityName)">
        <SelectTrigger>
            <SelectValue placeholder="Select an Ability" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Abilities</SelectLabel>
                <SelectItem v-for="(ability, index) in abilities" :value="ability.ability.name"
                    :key="`${index}-${ability.ability.name}`">

                    {{ capitalizeString(abilities[index].ability.name) }}

                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>

</template>
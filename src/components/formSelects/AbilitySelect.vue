<script setup lang="ts">
import type { Ability } from "../../interfaces/pokemon"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'

defineProps({
    abilities: {
        type: Array as () => Ability[],
        default: [],
    },
    isDisabled: {
        type: Boolean,
    }
})

const emits = defineEmits(['abilitySelected']);

const emitMove = (move: string) => {
    console.log("Emitting move: ", move)
    emits('abilitySelected', move);
};

</script>

<template>
    <label class="text-3xl font-bold">Ability</label>
    <Select :disabled="isDisabled" required>
        <SelectTrigger>
            <SelectValue placeholder="Select an Ability" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Abilities</SelectLabel>
                <SelectItem v-for="(ability, index) in abilities" :value="index.toString()"
                    :key="`${index}-${ability.ability.name}`" @click="emitMove(abilities[index].ability.name)">
                    {{ abilities[index].ability.name }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>

</template>
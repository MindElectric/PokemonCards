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
</script>

<template>
    <label class="text-3xl font-bold">Ability</label>
    <Select :disabled="isDisabled">
        <SelectTrigger>
            <SelectValue placeholder="Select an Ability" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Abilities</SelectLabel>
                <SelectItem v-for="(ability, index) in abilities" :value="index.toString()">
                    {{ abilities[index].ability.name }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>

</template>
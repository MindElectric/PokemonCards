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

defineProps({
    abilities: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <label class="text-3xl font-bold">Ability</label>
    <Select>
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
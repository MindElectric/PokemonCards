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

</script>

<template>
    <label class="text-3xl font-bold">Nature</label>
    <Select>
        <SelectTrigger>
            <SelectValue placeholder="Select a Nature" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Natures</SelectLabel>
                <SelectItem v-for="nature in natures.natures" :value="nature.id">
                    {{ nature.name }}
                </SelectItem>
            </SelectGroup>
        </SelectContent>
    </Select>
</template>
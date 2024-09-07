<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';

defineProps({
    isReadOnly: {
        type: Boolean,
        default: true
    },
    moves: {
        type: Array,
        required: true
    }
})
</script>

<template>
    <label class="mt-10 ml-20 text-3xl font-bold">Moves</label>
    <div class="flex mt-5 justify-evenly">
        <div class="flex w-4/5">
            <!-- Move 1 -->
            <Input :readonly="isReadOnly" placeholder="Move 1" class="mr-5" />
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
<template>
    <div class="shell-text">
        {{ text }}
    </div>
</template>

<script setup lang="ts">
    defineProps({
        text: {
            type: String,
            default: ''
        }
    });
</script>
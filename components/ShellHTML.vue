<template>
    <div class="shell-html">
        <div v-html="html"></div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        html: {
            type: String,
            default: ''
        }
    });
</script>
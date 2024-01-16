<template>
    <div class="container flex flex-row justify-center my-4">
        <button v-for="i in total" :key="i" :class="['dot', { 'dot-active': i <= current }, 'button', 'disabled',]"></button>
    </div>

</template>

<script setup>

const props = defineProps({
    total : {
        type: Number,
        required: true,
        default: 10
    },
    initial : {
        type: Number,
        required: false,
        default: 0
    }
})

const current = ref(props.initial)

</script>

<style scoped>
    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: black;
        margin: 0 5px;
        border: none;
        outline: none;
    }

    .dot-active {
        background-color: greenyellow;
    }
</style>
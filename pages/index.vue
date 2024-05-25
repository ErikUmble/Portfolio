<template>
    <ShellWindow @command-executed="checkTasks($event)" :prompt-placeholder="promptPlaceholder" ref="shell"><template v-slot:footer><ProgressDots :total="tasks.length" :current="tasksCompleted"/></template></ShellWindow> 
    

</template>
<script setup>
import { useFileSystem } from '~/composables/states';
import ShellWindow from '../components/ShellWindow.vue';
import Path from '../types/path';

const shell = ref(null);
const filesystem = useFileSystem();
const promptPlaceholder = ref('Type a command...');
const tasks = ref([
    {completed: false, validate: (commandInput, shell) => {return commandInput === 'ls'}},
    {completed: false, validate: (commandInput, shell) => commandInput === 'cd /'},
]);

const tasksCompleted = computed(() => tasks.value.filter(task => task.completed).length);

const checkTasks = (commandInput) => {
    if (tasksCompleted.value === tasks.value.length) return;
    for (let i = 0; i < tasks.value.length; i++) {
        if (tasks.value[i]?.completed) continue; 
        else if (shell.value) tasks.value[i].completed = tasks.value[i].validate(commandInput, shell.value);
        break;
    } 
}


</script>
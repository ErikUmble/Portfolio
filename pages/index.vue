<template>
    <ShellWindow @command-executed="checkTasks($event)" :prompt-placeholder="promptPlaceholder" :default-command="promptPlaceholder" ref="shell"><template v-slot:footer><ProgressDots :total="tasks.length" :current="tasksCompleted"/></template></ShellWindow> 
    <ConfettiExplosion v-if="confettiOn" />


</template>
<script setup>
import { useFileSystem } from '~/composables/states';
import ShellWindow from '../components/ShellWindow.vue';
import Path from '../types/path';
import ConfettiExplosion from "vue-confetti-explosion";

const shell = ref(null);
const filesystem = useFileSystem();
const env = useUserEnvironment();
const confettiOn = ref(false);
const tasks = ref([
    {completed: false, title: "Learn about me", placeholder: "whoami", validate: (commandInput, shell) => commandInput === 'whoami'},
    {completed: false, title: "List categories available", placeholder: "ls", validate: (commandInput, shell) => commandInput === 'ls'},
    {completed: false, title: "Goto projects", placeholder: "cd /projects", validate: (commandInput, shell) => commandInput.includes('cd') && commandInput.includes('projects')},
    {completed: false, title: "List projects", placeholder: "ls", validate: (commandInput, shell) => commandInput === 'ls'},
    {completed: false, title: "Find out about Total Farm Model", placeholder: "cat total-farm-model", validate: (commandInput, shell) => commandInput.includes("total-farm-model")},
    {completed: false, title: "Use tab autocomplete", placeholder: "Type `cat w` then press tab to autocomplete and hit enter", validate: (commandInput, shell) => commandInput === 'cat wumpus-world'},
    {completed: false, title: "Learn about another project", placeholder: "Use cat again to learn about another project", validate: (commandInput, shell) => commandInput.includes("cat") && (commandInput.includes("nand2tetris") || commandInput.includes("beta-b"))},
    {completed: false, title: "Goto education", placeholder: "cd /education", validate: (commandInput, shell) => commandInput.includes("cd") && commandInput.includes("education")},
    {completed: false, title: "Find out about my college experience", placeholder: "cat college-undergrad", validate: (commandInput, shell) => commandInput === 'cat college-undergrad'},
    {completed: false, title: "Keep exploring", placeholder: "Keep exploring ...", validate: (commandInput, shell) => env.getPath().toString().includes("professional-experience")},

]);

const tasksCompleted = computed(() => tasks.value.filter(task => task.completed).length);

watch(() => tasksCompleted.value, (newVal) => {
    if (tasksCompleted.value === tasks.value.length) {
        confettiOn.value = true;
        setTimeout(() => {
            confettiOn.value = false;
        }, 5000);
    }

})

const promptPlaceholder = computed(() => {
    if (tasksCompleted.value === tasks.value.length) return "";
    return tasks.value[tasksCompleted.value].placeholder;
})

const checkTasks = (commandInput) => {
    if (tasksCompleted.value === tasks.value.length) return;
    for (let i = 0; i < tasks.value.length; i++) {
        if (tasks.value[i]?.completed) continue; 
        else if (shell.value) tasks.value[i].completed = tasks.value[i].validate(commandInput, shell.value);
        break;
    } 
}



</script>
  
  <template>
    <div @click="inputRef?.focus()" class="terminal-container w-full flex-col">
      <div class="terminal w-full">
        <div v-for="run, idx in runHistory" :key="idx" class="output">
          <div v-if="idx < runHistory.length">
            <span class="text-success">{{ run.environment.user.name }}@webshell</span><span>:</span><span class="text-info">{{ run.environment.path.toString() }}</span><span>$</span>
            <span>&nbsp;{{ run.input }}</span>
          </div>
          <div ref="outputRefs"></div>
        </div>
        <div class="input-line">
          <span class="text-success">{{ env.getUser().name }}@webshell</span><span>:</span><span class="text-info">{{ env.getPath().toString() }}</span><span>$</span>
          <input class="terminal-input" autofocus ref="inputRef"
            v-model="command"
            @keyup.enter="executeCommand"
            :placeholder="promptPlaceholder"
          />
        </div>
        
      </div>
      <slot name="footer"></slot>
    </div>
  </template>

 <script setup lang="ts">
    import { ref } from 'vue';
    import emulateCommand from '../functions/emulateCommand';
    import Path from '../types/path';
    import type User from '../types/user';
    import type Environment from '~/types/environment';
    import type Runnable from '~/types/runnable';
    import FilePoint from '~/types/filepoint';
    import { useFileSystem, useUserEnvironment } from '~/composables/states';
    import findFile from '~/functions/findFile';


    defineProps({
      promptPlaceholder: {
        type: String,
        default: 'Type a command...'
      },
    });
    const emit = defineEmits(['update:filesystem', 'command-executed']);
    const filesystem = useFileSystem();
    const env = useUserEnvironment();
  
    const runHistory = ref([] as Runnable[])
    const command = ref('');

    const inputRef = ref<HTMLInputElement | null>(null);
    const outputRefs = ref([]);

    const executeCommand = () => {
        // Emulate command execution
      
        runHistory.value.push({ environment: {user: env.getUser(), path: env.getPath()} as Environment, input: command.value });
        nextTick(() => {
          emulateCommand(command.value, env.getUser(), env.getPath(), outputRefs.value.slice(-1)[0]);        
          if (inputRef.value) {
            inputRef.value.value = '';
            inputRef.value.focus();
          }
        });
        emit('command-executed', command.value);
        
    };

    const lastRun = () => {
      if (runHistory.value.length > 0) {
        return runHistory.value[runHistory.value.length - 1];
      }
      return null;
    }
    onMounted(() => {

    });

    defineExpose({ lastRun });
 </script>

  
  <style scoped>
  .terminal-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    overflow-y: auto; /* Allow vertical scrolling */
  }
  
  .terminal {
    max-width: 600px;
    min-height: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .input-line {
    display: flex;
    align-items: center;
  }
  
  .prompt {
    color: #4caf50;
    margin-right: 8px;
  }
  
  input {
    flex: 1;
    padding: 8px;
    font-size: 16px;
    border: none;
    outline: none;
    box-sizing: none;
    background: transparent;
  }
  </style>
  
  
  <template>
    <div @click="inputRef?.focus()" class="terminal-container w-full flex-col">
      <div class="terminal w-full" ref="terminalRef">
        <div v-for="execution, idx in executionHistory" :key="idx" class="output">
          <div v-if="idx < executionHistory.length">
            <span class="text-success">{{ execution.run.environment.user.name }}@webshell</span><span>:</span><span class="text-info">{{ execution.run.environment.path.toString() }}</span><span>$</span>
            <span>&nbsp;{{ execution.run.input }}</span>
          </div>
          <component :is="outputComponents[idx].component" v-bind="outputComponents[idx].props" :key="'output-' + idx" v-if="idx < outputComponents.length" />
        </div>
        <div class="input-line">
          <span class="text-success">{{ env.getUser().name }}@webshell</span><span>:</span><span class="text-info">{{ env.getPath().toString() }}</span><span>$</span>
          <input class="terminal-input" autofocus ref="inputRef"
            v-model="command"
            @keydown="handleKeydown($event)"
            :placeholder="promptPlaceholder"
          />
        </div>
        
      </div>
      <slot name="footer"></slot>
    </div>
  </template>

 <script setup lang="ts">
    import { ref, watch } from 'vue';
    import emulateCommand from '../functions/emulateCommand';
    import { useFileSystem, useUserEnvironment } from '~/composables/states';
    import autocompletePath from '~/functions/autocompletePath';
    import type ExecutionResult from '~/types/executionresult';


    const props = defineProps({
      promptPlaceholder: {
        type: String,
        default: 'Type a command...'
      },
      defaultCommand: {
        type: String,
        required: false,
        default: ''
      }
    });
    const emit = defineEmits(['update:filesystem', 'command-executed']);
    const env = useUserEnvironment();
  
    const executionHistory = ref<ExecutionResult[]>([]);
    const command = ref('');

    const terminalRef = ref<HTMLDivElement | null>(null);
    const inputRef = ref<HTMLInputElement | null>(null);
    const cursorCommandIdx = ref(-1);


    // Nuxt requires the use of resolveComponent to dynamically render components 
    type ComponentMap = {
      [key: string]: ReturnType<typeof resolveComponent>;
    };
    const componentMap : ComponentMap = {
      "ShellText": resolveComponent("ShellText"),
      "ShellHTML": resolveComponent("ShellHTML"),
      "WhoAmI": resolveComponent("WhoAmI"),
    };

    type OutputComponent = { component: ReturnType<typeof resolveComponent>, props: Record<string, any>};
    const outputComponents = shallowRef<OutputComponent[]>([]); 
    

    watchEffect(() => {
      // maintain outputComponents array which Nuxt supports dynamic initialization from
      outputComponents.value = executionHistory.value.map((execution) => {
        return {
          component: componentMap[execution.output.component],
          props: execution.output.props
        }
      });
    });

    // watch for cursorCommandIdx changes and when nonnegative, use the command issued at that execution index
    watch(() => executionHistory.value, (newVal) => {
      cursorCommandIdx.value = -1;
    });
    watch(() => cursorCommandIdx.value, (newVal) => {
      if (newVal >= 0 && newVal < executionHistory.value.length) {
        command.value = executionHistory.value[newVal].run.input;
      }
    });

    const executeCommand = () => {
      if (command.value.trim() == "") command.value = props.defaultCommand;
      
      const newExecution = {
        run: { 
          environment: { user: env.getUser(), path: env.getPath() },
          input: command.value 
        },
        output: {
          component: 'ShellText',
          props: { text: '...' }
        }
      };

      executionHistory.value.push(newExecution);

      nextTick(() => {
        // emulate command output
        const output = emulateCommand(command.value, env.getUser(), env.getPath());

        executionHistory.value[executionHistory.value.length - 1].output = output;
        nextTick(() => {
          if (inputRef.value) {
            command.value = '';
            inputRef.value.focus();
          }
          if (terminalRef.value) {
            terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
          }
        });
      });

      emit('command-executed', command.value);
    };

    const autocomplete = () => {
      if (command.value == "") {
        // tab on empty command autocompletes placeholder input
        command.value = props.promptPlaceholder;
        return;
      }
      // get the current token that is being edited
      let tokens = command.value.split(' ');
      if (tokens.length == 0) return;
      const finalToken = autocompletePath(tokens[tokens.length - 1]);
      if (finalToken) {
        tokens[tokens.length - 1] = finalToken;
        command.value = tokens.join(' ');
      }
    }

    const cycleCommand = (direction: number) => {
      if (executionHistory.value.length == 0) return;
      if (cursorCommandIdx.value == -1) cursorCommandIdx.value = executionHistory.value.length;
      cursorCommandIdx.value += direction;
      if (cursorCommandIdx.value < 0) cursorCommandIdx.value = 0;
      if (cursorCommandIdx.value >= executionHistory.value.length) cursorCommandIdx.value = -1;

      // update the command inputed
      if (cursorCommandIdx.value >= 0) {
        command.value = executionHistory.value[cursorCommandIdx.value].run.input;
      }
      else {
        command.value = '';
      }
    }

    const handleKeydown = (event : any) => {
      if (event.key == "Enter") executeCommand();
      else if (event.key == "Tab") {
        event.preventDefault(); 
        autocomplete();
      }
      else if (event.key == "ArrowUp") {
        event.preventDefault();
        cycleCommand(-1);
      }
      else if (event.key == "ArrowDown") {
        event.preventDefault();
        cycleCommand(1);
      }
    }

    const lastRun = () => {
      if (executionHistory.value.length > 0) {
        return executionHistory.value[executionHistory.value.length - 1].run;
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
    overflow-y: auto; 
  }
  
  .terminal {
    max-width: 600px;
    min-height: 400px;
    max-height: 60vh;
    overflow-y: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .input-line {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

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
  
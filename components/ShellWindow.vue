  
  <template>
    <div class="terminal-container w-full flex-col">
      <div class="terminal w-full">
        <div class="output" ref="outputRef"></div>
        <div class="input-line">
          <span class="text-success">{{ user.name }}@webshell</span><span>:</span><span class="text-info">{{ currentPath.toString() }}</span><span>$</span>
          <input class="terminal-input" ref="inputRef"
            v-model="command"
            @keyup.enter="executeCommand"
            placeholder="Type a command..."
          />
        </div>
      </div>
      <slot></slot>
    </div>
  </template>

 <script setup lang="ts">
    import { ref } from 'vue';
    import emulateCommand from '../functions/emulateCommand';
  import Path from '../types/path';
    
    const user = ref({name: "guest"});
    const currentPath = ref(new Path(["~"]));
    const command = ref('');

    const inputRef = ref(null);
    const outputRef = ref(null);
    
    const appendOutput = (result : string) => { 
        if (outputRef.value === null) return;

        // Append result to the output
        (outputRef.value as HTMLElement).innerHTML += `<div class="command-output">${result}</div>`;
        
        // Clear the command input
        command.value = '';
    };

    const executeCommand = () => {
        // Emulate command execution (replace this with your logic)
        const commandResult = emulateCommand(command.value, user, currentPath);
        
        // Append the command to the output
        appendOutput(commandResult);
    };
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
  
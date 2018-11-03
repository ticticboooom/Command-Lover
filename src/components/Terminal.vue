<template>
  <div>
  <pre class="inner-text">{{text}}<span v-if="!isExecuting" class="prefix">{{getCommandLinePrefix()}}</span>{{currentCommand}}<span :hidden="cursorInvisible">|</span></pre>
    <form @submit="$event.preventDefault(); endLine()">
      <input v-model="currentCommand" @focus="isFicuessed = true" @blur="isFicuessed = false;" style="opacity: 0" ref="input">
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Event } from 'electron';
import { setInterval } from 'timers';
import PowershellExecution from '@/classes/languages/powershell/PowershellExecution';

@Component({})
export default class Terminal extends Vue {
  private isFicuessed: boolean = false;
  private readonly pointer: string = ':>';
  private currentCommand: string = '';
  public text: string = '';
  private cursorInvisible: boolean = true;
  private isTyping: boolean = false;
  private isExecuting: boolean = false;
  private workingDir: string = process.cwd();
  private endLine() {
    this.isExecuting = true;
    let self = this;
    var ps = new PowershellExecution();
    let command = this.currentCommand;
    if (!command) {
      this.isExecuting = false;
      this.currentCommand = '';
      this.text += this.getCommandLinePrefix() + command + '\r\n';
      return;
    }
    let resultEmitter = ps.executeCommand(command, this.workingDir);
    this.currentCommand = '';
    this.text += this.getCommandLinePrefix() + command + '\r\n';
    resultEmitter.then(resp => {
      resp.stdout.on('data', (data: string) => {
        self.text += data;
        self.workingDir = process.cwd();
      });
      resp.stderr.on('data', (data: string) => {
        self.text += data;
        self.workingDir = process.cwd();
      });
      resp.on('close', (code: string) => {
        self.isExecuting = false;
      });
    });
  }
  private getCommandLinePrefix(): string {
    this.workingDir = process.cwd();
    return this.workingDir + this.pointer;
  }
  mounted() {
    this.focusOnInput();
    let self = this;
    setInterval(() => {
      if (!self.isTyping) {
        self.cursorInvisible = !self.cursorInvisible;
      } else {
        self.cursorInvisible = false;
      }
      if (self.isExecuting) {
        self.cursorInvisible = true;
      }
    }, 450);
    document.addEventListener('keydown', e => {
      if (!self.isFicuessed){
        const event = new KeyboardEvent("keydown", e, );
      this.focusOnInput();
      self.$refs.input.dispatchEvent(event);
        }
    });
  }
  private focusOnInput() {
    this.$refs.input.focus();
  }
}
</script>

<style lang="scss">
.inner-text {
  color: #f2f2f2;
  font-family: 'Source Sans Pro';
  font-weight: 600;
  font-size: 19px;
  position: absolute;
  bottom: 0;
  overflow-y: scroll;
  width: 100%;
}
</style>

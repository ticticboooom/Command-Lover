<template>
  <div>
  <pre class="inner-text">{{text}}{{pointer}}{{currentCommand}}<span :hidden="cursorVisible">|</span></pre>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Event } from "electron";
import { setInterval } from "timers";

@Component({})
export default class Terminal extends Vue {
  private readonly pointer: string = ":>";
  private currentCommand: string = "";
  public text: string = "";
  private cursorVisible: boolean = true;
  private endLine() {
    this.text += this.pointer + this.currentCommand + "\r\n";
    this.currentCommand = "";
  }
  mounted() {
    let self = this;
    setInterval(() => {
      self.cursorVisible = !self.cursorVisible;
    }, 450);
    document.addEventListener("keydown", e => {
      if (e.key.length === 1) {
        self.currentCommand += e.key;
      }
      if (e.key == "Enter") {
        this.endLine();
      }
      if (e.key == "Backspace") {
        self.currentCommand.substring(0, self.currentCommand.length - 1);
      }
    });
  }
}
</script>

<style lang="scss">
.inner-text {
  color: #f2f2f2;
  font-family: "Source Sans Pro";
  font-weight: 600;
  font-size: 19px;
}
</style>

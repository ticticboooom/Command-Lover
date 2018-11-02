<template>
  <div id="app">
    <div class="menubar">
      <ul>
        <li>File</li>
        </ul>
      </div>
    <terminal-window />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Terminal from "./components/Terminal.vue";
@Component({
  components: {
    "terminal-window": Terminal
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@font-face {
  font-family: "Source Sans Pro";
  src: url("/SourceSansPro-Light.ttf");
  font-weight: 400;
}
@font-face {
  font-family: "Source Sans Pro";
  src: url("/SourceSansPro-SemiBold.ttf");
  font-weight: 600;
}
html,
body,
#app {
  background-color: #1f1f1f;
  padding: 0;
  margin: 0;
}

.menubar {
  ul {
    padding: 0;
    margin: 0;
    li {
      padding: 10px;
      color: white;
      font-family: 'Source Sans Pro';
    }
  }
  width: 100%;
  background-color: #2f2f2f;
}
</style>

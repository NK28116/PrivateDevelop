<!--fight stick motion img -->

<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<span class="tooltip">
  <div id="assignbuttontooltip" class="tooltiptext tooltiptextassignbutton"></div>
  <div id="container" class="container">
    <div id="gamepad0" class="gamepad-background">
      <div id="gamepad-background-image" class="gamepad-disconnected"></div>
      <div id="gamepad-area" class="gamepad-area">
        <div id="gamepad-area-background" class="gamepad-area-background"></div>
        <div id="stick-area" class="stick-area">
          <div id="stick" class="stick"></div>
          <div id="stick-up" class="stick-block stick-up"></div>
          <div id="stick-down" class="stick-block stick-down"></div>
          <div id="stick-left" class="stick-block stick-left"></div>
          <div id="stick-right" class="stick-block stick-right"></div>
        </div>
        <div id="button-area" class="button-area">
          <!-- buttons will be added to here -->
          </div>
      </div>
    </div>
  </div>
</span>
</template>

<style scoped>

</style>

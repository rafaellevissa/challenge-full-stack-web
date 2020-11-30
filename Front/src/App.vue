<template>
  <v-app>
    <div id="app">
      <v-toolbar dark>
        <v-toolbar-title class="toolbar-title">CHALLENGE</v-toolbar-title>

        <v-divider inset vertical></v-divider>

        <v-toolbar-items>
          <v-btn text to="/student"> Student </v-btn>

          <v-divider inset vertical></v-divider>

          <v-btn text to="/module"> Module </v-btn>

          <v-divider inset vertical></v-divider>

          <v-btn text to="/registration"> Registration </v-btn>

          <v-divider inset vertical></v-divider>
        </v-toolbar-items>
      </v-toolbar>
      <transition name="moveInUp">
        <router-view />
      </transition>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.moveInUp-enter-active {
  animation: fadeIn 2s ease-in;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
@keyframes moveInUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-400px);
  }
}
.toolbar-title {
  padding: 30px;
}
</style>
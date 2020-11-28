<template>
  <div id="app">
    <!-- navbar -->
    <!--
    <div class="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div class="container">
        <router-link to="/" class="navbar-brand">Estudante</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/modulo">Modulo</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/matricula"
                >Matricula</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contact">----</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    -->
    <v-toolbar dark>
      <v-toolbar-title>Challenge of Things</v-toolbar-title>

      <v-divider inset vertical></v-divider>

      <v-toolbar-items>
        <v-btn text to="/"> Estudante </v-btn>

        <v-divider inset vertical></v-divider>

        <v-btn text to="/modulo"> Modulo </v-btn>

        <v-divider inset vertical></v-divider>

        <v-btn text to="/matricula"> Matricula </v-btn>

        <v-divider inset vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>
    <transition name="moveInUp">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "Home", path: "/home", icon: "home" },
        { title: "Sign Up", path: "/signup", icon: "face" },
        { title: "Sign In", path: "/signin", icon: "lock_open" },
      ],
    };
  },
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
.v-toolbar-title {
  padding: 50px;
}
</style>
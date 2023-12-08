<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px; /* Increased top margin for spacing */
}

nav {
  background-color: #1a2537;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 15px;
  font-weight: bold;
  font-size: 16px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

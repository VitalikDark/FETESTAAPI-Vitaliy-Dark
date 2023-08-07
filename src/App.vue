<template>
  <v-app id="app">
    <nav class="px-4">
      <router-link to="/">Home</router-link> |
      <router-link to="/sessions">Films-sessions</router-link>
    </nav>
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App'
}
</script>

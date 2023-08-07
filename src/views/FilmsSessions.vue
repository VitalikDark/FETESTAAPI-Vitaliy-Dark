<template>
  <v-container fluid>
    <h2>Sessions</h2>

    <v-progress-circular
      :size="46"
      color="primary"
      indeterminate
      class="mx-auto mt-2 d-block"
      v-if="isLoadingMoviesSession"
    />

    <div v-else>
      <v-card
          class="my-1"
          v-for="item in filmSessions"
      >
        <div v-for="film in item">
          <div>
            Date: {{film.showdate}}
          </div>
          <div>
            Day time: {{film.daytime}}
          </div>
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FilmsSessions",

  data() {
    return {
      filmSessions: [],
      isLoadingMoviesSession: false
    }
  },

  computed: {
    ...mapGetters(['getMoviesSession'])
  },

  mounted() {
    this.fetchLoadMoviesSessions()
  },

  methods: {
    ...mapActions(['loadMoviesSessions']),

    fetchLoadMoviesSessions() {
      this.isLoadingMoviesSession = true

      this.loadMoviesSessions()
          .then(() => {
            this.filmSessions = this.getMoviesSession
          })
          .catch((e) => {
            alert(e.response.statusText)
          })
          .finally(() => {
            this.isLoadingMoviesSession = false
          })
    }
  }
}
</script>

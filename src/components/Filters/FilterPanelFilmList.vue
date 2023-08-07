<template>
  <v-form class="d-flex flex-wrap justify-space-between align-center">

    <v-text-field
        v-model="formData.id"
        label="Id"
        class="mx-1"
    />
    <v-text-field
        type="text"
        v-model="formData.name"
        label="Name"
        class="mx-1"
    />
    <v-text-field
        v-model="formData.genres"
        label="Genres"
        class="mx-1"
    />

    <v-btn
        small
        class="mx-1"
        @click="handleClickApplyFilter"
    >
      Apply
    </v-btn>
    <v-btn
        small
        class="mx-1"
        @click="handleClickResetFilter"
    >
      Reset
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FilterPanelFilmList",

  data() {
    return {
      formData: {
        id: '',
        name: '',
        genres: ''
      }
    }
  },

  methods: {
    ...mapActions(['loadFilmList']),

    resetFields() {
      this.formData.id = ''
      this.formData.name = ''
      this.formData.genres = ''
    },

    createFormData() {
      return {
        id: this.formData.id,
        name: this.formData.name,
        genres: this.formData.genres
      }
    },

    fetchLoadFilmList(data) {
      this.loadFilmList(data)
    },

    handleClickApplyFilter() {
      this.fetchLoadFilmList(this.createFormData())
    },

    handleClickResetFilter() {
      this.resetFields()
      this.fetchLoadFilmList()
    }

  }
}
</script>

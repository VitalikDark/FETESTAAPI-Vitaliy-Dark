<template>
  <div>
    <h2>Film list</h2>

    <filter-panel-film-list />

    <v-progress-circular
        :size="46"
        color="primary"
        indeterminate
        class="mx-auto mt-2 d-block"
        v-if="isLoadingFilmList"
    />

    <div v-else>
      <div
        v-if="fileList.length > 0"
        v-for="item in fileList"
        :key="item.id"
      >
        <v-card
          elevation="2"
          class="px-1 py-1 my-4"
        >
          <film-book-ticket
            :id="item.id"
            @form-data="getFormDataFilmBookTicket"
            @open-ticket-map="handleOpenModalFirmTicketMap"
          />

          <div v-html="item.additional"></div>
          <div v-html="item.description"></div>
          <div>{{ item.genre }}</div>
          <div>{{ item.name }}</div>
          <v-img
            max-width="250"
            :src="item.image"
          />
        </v-card>
      </div>

      <div v-else>No Data</div>
    </div>

    <modal-film-book-ticket-map
      :is-open="isOpenModalFilmBookTicket"
      :ticket-map="getBookTicket"
      :value="formData"
      @close-modal="handleCloseModalFirmTicketMap"
    />

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import FilmBookTicket from "@/components/FirmBookTicket"
import FilterPanelFilmList from "@/components/Filters/FilterPanelFilmList";
import ModalFilmBookTicketMap from "@/components/Modals/ModalFilmBookTicketMap";

export default {
  name: "FilmList",

  data() {
    return {
      fileList: [],
      formData: {},
      isLoadingFilmList: false,
      isOpenModalFilmBookTicket: false
    }
  },

  components: {
    FilmBookTicket,
    FilterPanelFilmList,
    ModalFilmBookTicketMap
  },

  computed: {
    ...mapGetters([
      'getFilmList',
      'getBookTicket'
    ])
  },

  watch: {
    getFilmList() {
      this.fileList = this.getFilmList
    }
  },

  methods: {
    ...mapActions([
      'loadFilmList',
      'loadMoviesSessions'
    ]),

    getFormDataFilmBookTicket(formData) {
      this.formData = formData
    },

    handleOpenModalFirmTicketMap(isOpen) {
      this.isOpenModalFilmBookTicket = isOpen
    },

    handleCloseModalFirmTicketMap() {
      this.isOpenModalFilmBookTicket = false
    },

    fetchLoadFilmList() {
      this.isLoadingFilmList = true

      this.loadFilmList()
        .then(() => {
          this.fileList = this.getFilmList
        })
        .catch((e) => {
          alert(e.response.statusText)
        })
        .finally(() => {
          this.isLoadingFilmList = false
        })
    }
  },

  mounted() {
    this.fetchLoadFilmList()
  }
}
</script>

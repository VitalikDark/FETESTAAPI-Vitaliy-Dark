<template>
  <v-dialog
    v-model="isShow" max-width="400px"
  >
    <v-card
        outlined
        class="mx-auto"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">
            Book ticket
          </div>

          <div v-for="data in ticketMap" v-if="ticketMap.length > 0">
            <div v-for="item in data">
              <div>Row: {{ item.row }}</div>

              <div v-for="i in item">
                <div class="d-flex align-center justify-space-between">
                  <div> Seat: {{ i.seat || '-' }}</div>
                  <div> Place: {{ i.is_free ? 'Free' : 'Booking' }}</div>

                  <v-btn
                    x-small
                    class="my-1 mx-1"
                    @click="handleClickBookPlace(i.seat, data[0].row)"
                  >
                    Book place
                  </v-btn>

                </div>
              </div>

            </div>

            <v-divider/>
          </div>

        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn
          small
          @click="handleCloseModal"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import modal from "@/mixins/modal"

export default {
  name: "ModalFilmBookTicketMap",

  mixins: [modal],

  props: {
    ticketMap: {
      type: [Array, Object],
      default: () => ([])
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    ...mapActions(['loadBookPlace']),

    fetchLoadBookPlace(seat, row) {
      const formData = {
        movie_id: this.value.id,
        row: row,
        seat: seat,
        showdate: this.value.date,
        daytime: this.value.time,
      }

      this.loadBookPlace({ formData })
        .then((response) => {
          alert('Book place was successful')
          console.log(response.data.data)
        })
        .catch((e) => {
          alert(e.response.statusText)
        })
    },

    handleClickBookPlace(seat, row) {
      this.fetchLoadBookPlace(seat, row)
    }
  }
}
</script>

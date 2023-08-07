<template>
  <div class="d-flex align-center">
    <v-menu
        ref="menu"
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="time"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="time"
            label="Time"
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            style="max-width: 120px;"
            v-bind="attrs"
            v-on="on"
        />
      </template>
      <v-time-picker
          v-if="menu2"
          v-model="time"
          full-width
          @click:minute="$refs.menu.save(time)"
      />
    </v-menu>

    <v-menu
        ref="menu2"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="date"
            label="Date"
            prepend-icon="mdi-calendar"
            style="max-width: 120px;"
            readonly
            v-bind="attrs"
            v-on="on"
        />
      </template>
      <v-date-picker
          v-model="date"
          :active-picker.sync="activePicker"
          @change="save"
      />
    </v-menu>


    <v-btn
      small
      class="mx-1"
      :loading="isLoadingBookTicket"
      @click="handleClickBookTicket"
    >
      Book ticket
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "FirmBookTicket",

  props: {
    id: {
      type: [String, Number],
      default: () => ({})
    }
  },

  data() {
    return {
      time: null,
      date: null,

      menu2: false,
      activePicker: null,
      menu: false,
      isLoadingBookTicket: false
    }
  },

  methods: {
    ...mapActions(['loadBookTicket']),

    createFormData() {
      return {
        id: this.id,
        daytime: this.time,
        showDate: this.date
      }
    },

    fetchLoadBookTicket() {
      this.isLoadingBookTicket = true
      const formData = this.createFormData()

      if (this.date.length > 0 && this.time.length > 0) {
        //Custom "validation"
        this.loadBookTicket({ formData })
          .then(() => {
            this.$emit('open-ticket-map', true)
            this.$emit('form-data', {
              id: this.id,
              date: this.date,
              time: this.time
            })
          })
          .catch((e) => {
            alert(e.response.statusText)
          })
          .finally(() => {
            this.isLoadingBookTicket = false
          })
      }
    },

    save(date) {
      this.$refs.menu2.save(date)
    },

    handleClickBookTicket() {
      this.fetchLoadBookTicket()
    }
  }
}
</script>

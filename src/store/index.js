import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

import { BASE_URL } from "@/api/api";
import { filteredMovieList } from "@/utils/filteredMovieList";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileList: [],
    moviesSession: [],
    bookTicket: {},
  },

  getters: {
    getFilmList: state => state.fileList,
    getMoviesSession: state => state.moviesSession,
    getBookTicket: state => state.bookTicket
  },

  mutations: {
    setFileList(state, response) {
      state.fileList = response
    },

    setMoviesSession(state, response) {
      state.moviesSession = response
    },

    setBookTicket(state, response) {
      state.bookTicket = response
    }
  },
  actions: {

    loadFilmList({ commit }, payload) {

      return axios.get(BASE_URL+`/movies?${filteredMovieList(payload)}`)
        .then((response) => {
          commit('setFileList', response.data.data)
        })
    },

    loadMoviesSessions({ commit }) {
      return axios.get(BASE_URL+`/movieShows`)
        .then((response) => {
          commit('setMoviesSession', response.data.data)
        })
    },

    loadBookTicket({ commit }, payload) {
      const { formData } = payload
      const { id, daytime, showDate } = formData

      return axios.get(BASE_URL + `/showPlaces?movie_id=${id}&daytime=${daytime}&showdate=${showDate}`)
        .then((response) => {
          commit('setBookTicket', response.data.data)
        })
    },

    loadBookPlace({}, payload) {
      const { formData } = payload

      return axios.post(BASE_URL + '/bookPlace', formData)
    }
  },

  modules: {
  }
})

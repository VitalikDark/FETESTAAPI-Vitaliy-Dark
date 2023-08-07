export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    }
  },

  computed: {
    isShow: {
      get () {
        return this.isOpen
      },
      set (value) {
        if (!value) {
          this.$emit('close-modal')
        }
      }
    }
  },

  methods: {
    handleCloseModal() {
      this.isShow = false;
    }
  }
}

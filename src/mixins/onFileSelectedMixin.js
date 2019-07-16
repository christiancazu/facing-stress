import { Notify } from 'quasar'

export default {
  data () {
    return {
      imgFile: {
        url: '',
        object: null
      }
    }
  },

  methods: {
    // emit object file to parent component
    setImage () {
      this.$emit('imgFile', this.imgFile)
    },

    // to process img file from template[input:file] with @change event
    onFileSelected (file) {
      if (!file) return // return if change nothing
      const maxSizeFile = 5000000 // max size for file 5mb
      // object to read the contents of File
      const reader = new FileReader()
      // when readAsDataURL is done set imageFile values
      reader.onload = () => {
        this.imgFile.url = reader.result
        this.imgFile.object = file
        this.setImage()
      }

      if (file.size > maxSizeFile) {
        this.imgErrorNotification('img.has_to_weight', maxSizeFile / 1000000)
        return
      }
      // validation.Ensure the file have image extention.
      if (/(jpe?g|png|bmp)$/i.test(file.type)) {
      // Fire the readAsDataURL method which will read the file in and
      // upon completion fire a 'onload' event which we will listen to and
      // display the image in the preview.
        reader.readAsDataURL(file)
      } else {
        this.imgErrorNotification('img.only_can_select')
      }
    },

    imgErrorNotification (...msg) {
      Notify.create({
        message: this.$t(msg[0], { size: msg[1] }),
        color: 'negative',
        icon: 'error'
      })
    }
  }
}

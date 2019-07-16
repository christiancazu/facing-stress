<template>
  <div class="container-image-preview">
    <div
      class="image-preview"
      :style="`background-image: url('${imgSrc}')`"
    >
      <div
        v-if="editButton"
        class="image-preview__edit"
      >
        <input
          id="input-edit"
          type="file"
          accept="image/*"
          @change="onFileSelected($event.target.files[0])"
        >
        <button
          class="btn btn-lg rounded-circle image-preview__btn-edit"
          @click.prevent="edit"
        >
          <!-- <Fa icon="edit" size="2x"/> -->
          <q-icon name="edit" size="4em" />
        </button>
        <h4>{{ $t('edit') }}</h4>
      </div>
    </div>
    <small :class="{'has-error': errorName }">
      {{ errorName || '&nbsp;' }}
    </small>
  </div>
</template>

<script>
import onFileSelectedMixin from 'src/mixins/onFileSelectedMixin'

export default {
  name: 'ImagePreview',

  props: {
    imgSrc: { type: String, default: '' },
    editButton: { type: Boolean, default: true },
    errorName: { type: String, default: '' }
  },

  mixins: [onFileSelectedMixin], // uploadfile method

  data () {
    return {
      imgFile: {
        url: '',
        object: null
      }
    }
  },

  methods: {
    edit () {
      document.getElementById('input-edit').click()
    },

    setImage () {
      this.$emit('editImgSrc', this.imgFile)
    }
  }
}
</script>

/* eslint-disable no-tabs */
<template>
  <div class="input-image">
    <div
      class="q-field__label q-mb-sm"
      :class="{'q-field--error-fix' : errorMessage}"
    >
      <!-- {{ label }} -->
    </div>
    <div
      v-show="!imgFile.url"
      class="input-image__file"
    >
      <label class="upload">
        <q-icon
          name="backup"
          size="4em"
        />
        <input
          type="file"
          ref="inputImage"
          accept=".jpg,.jpeg, .png, .bmp"
          @change="onFileSelected($event.target.files[0])"
        >
      </label>
    </div>
    <span
      class="text-h6 text-accent"
      v-if="!imgFile.url"
    >
      {{ $t('upload_img') }}
    </span>

    <q-img
      v-show="imgFile.url"
      :src="imgFile.url"
      class="img-max-height-cover"
      transition="fade"
      spinner-color="secondary"
    >
      <q-fab
        v-if="!noEditable || !noDeletable"
        class="bg-transparent absolute-top-right"
        color="info"
        icon="more_vert"
        direction="down"
      >
        <q-fab-action
          v-if="!noEditable"
          color="warning"
          icon="edit"
          @click="onFabMenu('edit')"
        />
        <q-fab-action
          v-if="!noDeletable"
          color="negative"
          icon="delete"
          @click="onFabMenu('delete')"
        />
      </q-fab>
    </q-img>
    <div class="q-field--error q-field__messages q-field--error-fix text-center q-mt-sm">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import onFileSelectedMixin from '@/mixins/onFileSelectedMixin'
import { BASE_IMG_URL } from '@/config'

export default {
  name: 'InputImage',

  props: {
    label: { type: String, required: true },
    errorMessage: { type: String, default: '' },
    currentImage: { type: String, default: '' },
    noDeletable: { type: Boolean, default: false },
    noEditable: { type: Boolean, default: false },
    noUploadable: { type: Boolean, default: false }
  },

  data () {
    return {
      biu: BASE_IMG_URL + '/categories/'
    }
  },

  watch: {
    currentImage (val) {
      this.imgFile.url = this.biu + val
    }
  },

  mounted () {
    if (this.noUploadable) this.imgFile.url = 'x'
  },

  methods: {
    onFabMenu (option) {
      if (option === 'edit') {
        this.editPreviewImage()
      } else this.cleanPreviewImage()
    },
    editPreviewImage () {
      this.$refs.inputImage.click()
    },

    cleanPreviewImage () {
      this.imgFile.url = ''
      this.imgFile.object = null
      this.$emit('imgFile', this.imgFile)
    }
  },

  mixins: [onFileSelectedMixin] // uploadfile method
}
</script>

<style lang="stylus" scoped>
[type=file] {
  display: none;
}

// fix padding in right top in q-img slot to q-fab
.q-img__content > div {
  padding: 16px 16px 0 16px;
}

.input-image {
  font-size: 16px;
  position: relative;

  &__file {
    background-color: $secondary;
    border-radius: 50%;
    height: 8em;
    margin: 0 auto;
    padding: 1px;
    text-align: center;
    transition: all 1s;
    width: 8em;

    &:hover {
      transform: translate(0, -1em);
    }

    // label target to input file
    & > .upload {
      align-items: center;
      background-color: $secondary;
      border-radius: 50%;
      border: 6px dashed white;
      color: #fff;
      cursor: pointer;
      display: flex;
      height: 100%;
      justify-content: space-around;
      transform: scale(1);
      transition: all 1s;
      width: 100%;

      &:after {
        content: '';
        background-color: black;
        bottom: -1.25em;
        border-radius: 50%;
        box-shadow: 0 0 0.1em 0.1em black;
        height: 1em;
        opacity: 0;
        position: absolute;
        transition: all 1s;
        width: 1em;
      }

      &:hover {
        transform: scale(1.1);
        background-color: white;
        border: 6px solid $secondary;
        color: $secondary;

        &:after {
          opacity: 0.4;
          bottom: -2em;
          width: 7em;
        }
      }
    }
  }

  & > span {
    display: block;
    margin: 1em 0;
    text-align: center;
  }
}
</style>

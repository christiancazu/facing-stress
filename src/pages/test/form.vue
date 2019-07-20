<template>
  <q-page>
    <div class="row justify-center q-my-sm q-ma-sm">

      <q-card class="col-12 col-md-8 q-my-md">
        <q-card-section class="bg-secondary text-white">
          <div class="text-h6 text-center">Prueba de emociones</div>
        </q-card-section>

        <q-card-section class="q-ma-md text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quam
          quas pariatur magnam ducimus nobis sint atque id praesentium quae
          consectetur natus architecto modi, quidem possimus molestiae ad recusandae eaque?
        </q-card-section>
      </q-card>

      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        class="col-12 col-md-8"
      >
        <q-step
          :name="1"
          title="Formulario de emociones"
          icon="settings"
          :done="step > 1"
        >
          <div class="q-px-md text-h6 text-accent">complete los datos:</div>

          <div class="row justify-center q-gutter-x-xl q-px-md">
            <q-input
              v-model="name"
              class="col"
              bottom-slots
              color="info"
              name="name"
              v-validate="form_rules.name"
              :label="`${ $t('name') }*`"
              :data-vv-as="$t('name')"
              :error-message="form_errors.name"
              :error="!!form_errors.name"
            />
            <q-input
              v-model.number="age"
              class="col"
              bottom-slots
              color="info"
              name="age"
              type="number"
              v-validate="form_rules.age"
              :label="`${ $t('age') }*`"
              :data-vv-as="$t('age')"
              :error-message="form_errors.age"
              :error="!!form_errors.age"
            />
          </div>

          <div class="q-px-md q-my-md text-h6 text-accent">Indique como se siente:</div>
          <!-- QSlider -->
          <base-slider
            v-for="(slider, index) in emotionSliders"
            :key="index"
            :index="index"
            :name="slider.name"
            :color="slider.color"
            @sliderValue="getSliderValue"
          />
        </q-step>
        <q-step
          :name="2"
          title="Reconocimiento facial"
          icon="create_new_folder"
        >
          <input-image
            ref="imgFile"
            :label="`imagen`"
            :data-vv-as="`imagen`"
            v-model="cover_img_file"
            @imgFile="getImgFile"
          />
        </q-step>
        <template v-slot:navigation>
          <q-stepper-navigation class="row justify-center q-gutter-x-md">
            <q-btn
              @click="step !== 2 ? validateNextStep() : sendImageToMicrosoftDetectEndPoint()"
              :label="step === 2 ? 'Enviar Información' : 'Continuar'"
              :disable="!cover_img_file && step === 2"
              :loading="submitting"
              push
              glossy
              class="col"
              color="primary"
            />
            <q-btn
              v-if="step > 1"
              push
              color="white"
              @click="$refs.stepper.previous()"
              label="Volver"
              text-color="primary"
              class="col"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import validateFormMixin from '@/mixins/validateFormMixin'

export default {
  name: 'TestIndex',
  data () {
    return {
      cover_img_file: null,
      step: 1,
      submitting: false,
      faceApiUrlBase: process.env.FACE_API_URL_BASE,
      subscriptionKey: process.env.SUBSCRIPTION_KEY,
      name: '',
      age: null,
      form_rules: {
        name: 'required|max:36',
        age: 'required|numeric|min_value:1'
      },
      form_errors: {
        name: '',
        age: ''
      },
      emotionSliders: [
        { name: 'anger', value: 5, color: 'blue-grey' },
        { name: 'contempt', value: 5, color: 'purple' },
        { name: 'disgust', value: 5, color: 'indigo' },
        { name: 'fear', value: 5, color: 'light-blue' },
        { name: 'happiness', value: 5, color: 'teal' },
        { name: 'neutral', value: 5, color: 'light-green' },
        { name: 'sadness', value: 5, color: 'amber' },
        { name: 'surprise', value: 5, color: 'deep-orange' }
      ]
    }
  },
  methods: {
    async validateNextStep () {
      this.form_errors.name = ''
      this.form_errors.age = ''
      this.$validator.validateAll().then(result => {
        if (!result) {
          this.errors.items.forEach(e => {
            this.form_errors[e.field] = e.msg
          })
          this.$toast.fire({
            type: 'error',
            title: `${this.$t('error.data_invalid')}`
          })
        } else {
          this.$refs.stepper.next()
        }
      })
      // if (await this.$_validateFormMixin_isValid()) {
      //   this.$refs.stepper.next()
      // }
    },
    getSliderValue (slider) {
      this.emotionSliders[slider.index].value = slider.value
    },
    getImgFile (val) {
      this.cover_img_file = val.url
    },
    sendImageToMicrosoftDetectEndPoint (callback) {
      // eslint-disable-next-line no-unreachable
      this.dataURItoBuffer(this.cover_img_file, (buff) => {
        this.submitting = true
        let requestAttrs = 'age,gender,smile,facialHair,glasses,emotion,makeup,accessories'
        axios({
          method: 'post',
          url: `${this.faceApiUrlBase}?returnFaceAttributes=${requestAttrs}`,
          headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey
          },
          data: buff
        })
          .then(response => {
            switch (response.data.length) {
              case 0:
                Swal.fire({
                  type: 'warning',
                  title: `Oops... ${this.$t('error.wrong_try_again')}`,
                  text: `${this.$t('error.face_no_detect')}`
                })
                break

              case 1:
                this.saveFormDataInStore()
                this.saveApiFaceDataInStore(response.data)
                Swal.fire({
                  type: 'success',
                  title: `${this.$t('correct')}... ${this.$t('success.data_complet')}`,
                  allowOutsideClick: false,
                  confirmButtonText: `${this.$t('show_my_result')}`
                }).then((result) => {
                  // console.warn(this.sliders)
                  // this.$store.commit('test/SET_FORM_ATTRS', this.sliders)
                  if (result.value) this.$router.push({ name: 'test.result' })
                })
                break

              default:
                Swal.fire({
                  type: 'error',
                  title: `Oops...${this.$t('error.wrong_try_again')}`,
                  text: `${this.$t('error.many_person')}`
                })
                break
            }
          })
          .catch(error => {
            console.log(error)
            // #TODO: errors by status code
          })
          .finally(() => {
            this.submitting = false
          })
      })
    },
    dataURItoBuffer (dataURL, callback) {
      var buff = Buffer.from(dataURL.replace(/^data:image\/(png|PNG|gif|GIF|jpeg|JPEG|jpg|JPG);base64,/, ''), 'base64')
      callback(buff)
    },
    saveFormDataInStore () {
      this.$store.commit('test/SET_FORM_ATTRS', {
        name: this.name,
        age: this.age,
        emotions: this.emotionSliders,
        faceImg: this.cover_img_file
      })
    },
    saveApiFaceDataInStore (data) {
      this.$store.commit('test/SET_API_FACE_ATTRS', data[0])
    }
  },

  mixins: [validateFormMixin]
}
</script>

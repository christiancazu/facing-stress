/* eslint-disable semi */
/* eslint-disable operator-linebreak */
<template>
  <q-page>
    <div class="row justify-center q-my-xl">

      <q-card class="col-12 col-md-8 q-my-md">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6 text-center">Prueba de emociones</div>
        </q-card-section>

        <q-card-section class="q-ma-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
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

          <!-- QSlider -->
          <base-slider
            v-for="(slider, index) in sliders"
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
              @click="step !== 2 ? $refs.stepper.next() : sendImageToMicrosoftDetectEndPoint()"
              :label="step === 2 ? 'Enviar Información' : 'Continuar'"
              :disable="!cover_img_file && step === 2"
              :loading="submitting"
              push glossy
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

export default {
  name: 'TestIndex',
  data () {
    return {
      cover_img_file: null,
      step: 1,
      submitting: false,
      faceApiUrlBase: process.env.FACE_API_URL_BASE,
      subscriptionKey: process.env.SUBSCRIPTION_KEY,
      sliders: [
        { name: 'anger', value: 5, color: 'red' },
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
    onSubmit () {
    },
    onReset () {

    },
    getSliderValue (slider) {
      this.sliders[slider.index].value = slider.value
    },
    getImgFile (val) {
      this.cover_img_file = val.url
    },
    sendImageToMicrosoftDetectEndPoint (callback) {
      this.dataURItoBuffer(this.cover_img_file, (buff) => {
        this.submitting = true
        axios({
          method: 'post',
          url: `${this.faceApiUrlBase}?returnFaceAttributes=emotion`,
          headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': this.subscriptionKey
          },
          data: buff
        })
          .then(response => {
            console.warn(response)
            // #TODO: response
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
    }
  }
}
</script>

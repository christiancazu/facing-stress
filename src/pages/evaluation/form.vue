<template>
  <q-page>
    <div class="row justify-center q-ma-sm q-gutter-md">

      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        class="col-12 col-md-8"
      >
        <q-step
          :name="1"
          :title="$t('form')"
          icon="settings"
          :done="step > 1"
        >

          <div class="q-px-md text-h6 text-accent q-my-md">
            {{ $t('important') }}
          </div>

          <block-quote type="secondary">
            {{ $t('evaluation_text.info_1') }}
          </block-quote>

          <div class="q-px-md text-h6 text-accent q-my-md">
            {{ $t('indicate_data') }}
          </div>

          <div class="row justify-center q-gutter-x-xl q-px-md">
            <q-input
              v-model="name"
              class="col text-capitalize "
              bottom-slots
              color="secondary"
              name="name"
              v-validate="form_rules.name"
              :label="`${ $t('name') }*`"
              :data-vv-as="$t('name')"
              :error-message="form_errors.name"
              :error="!!form_errors.name"
            />
            <q-input
              v-model.number="age"
              class="col text-capitalize"
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

          <div class="q-px-md text-h6 text-accent q-my-md">
            {{ $t('indicate_stress_event') }}
          </div>

          <div class="q-pa-sm">
            <q-option-group
              :options="questions"
              label="Notifications"
              type="checkbox"
              v-model="group"
            />
          </div>

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
          <q-stepper-navigation class="row justify-center">
            <q-btn
              @click="step !== 2 ? validateNextStep() : sendImageToMicrosoftDetectEndPoint()"
              :label="step === 2 ? 'Enviar Información' : 'Continuar'"
              :disable="!cover_img_file && step === 2"
              :loading="submitting"
              push
              glossy
              class="col q-mx-md"
              color="secondary"
            />
            <q-btn
              v-if="step > 1"
              push
              color="white"
              @click="$refs.stepper.previous()"
              label="Volver"
              text-color="secondary"
              class="col q-mx-md"
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
  name: 'EvaluationForm',
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
      group: [],
      questions: [
        { label: this.$t('questions.death'), value: 3 },
        { label: this.$t('questions.changes'), value: 2 },
        { label: this.$t('questions.pregnant'), value: 1 },
        { label: this.$t('questions.work'), value: 2.5 },
        { label: this.$t('questions.retired'), value: 1.5 },
        { label: this.$t('questions.loss'), value: 1.1 },
        { label: this.$t('questions.debt'), value: 0.5 }
      ],
      toastEvaluationInfoTemplate: `
        <h6 class="q-ma-none text-justify text-h6">
          ${this.$t('evaluation_text.indication_1')}
        </h6>`
    }
  },

  mounted () {
    this.showToastEvaluationInfo()
  },

  methods: {
    showToastEvaluationInfo () {
      Swal.fire({
        position: 'top-end',
        type: 'info',
        title: this.toastEvaluationInfoTemplate,
        showConfirmButton: true
      })
    },
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
    },

    getImgFile (val) {
      this.cover_img_file = val.url
    },
    sendImageToMicrosoftDetectEndPoint (callback) {
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
                  if (result.value) this.$router.push({ name: 'evaluation.result' })
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
      this.$store.commit('evaluation/SET_FORM_ATTRS', {
        name: this.name,
        age: this.age,
        sumOfQuestions: this.group.reduce((acc, item) => {
          acc += item
          return acc
        }, 0),
        faceImg: this.cover_img_file
      })
    },
    saveApiFaceDataInStore (data) {
      this.$store.commit('evaluation/SET_API_FACE_ATTRS', data[0])
    }
  },

  mixins: [validateFormMixin]
}
</script>

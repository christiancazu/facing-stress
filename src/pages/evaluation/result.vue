<template>
  <q-page>
    <div class="row justify-center q-my-sm q-ma-sm">
      <q-card class="col-12 col-md-8 q-my-md">
        <q-card-section class="text-h6 text-white text-center bg-secondary">
          Resultados de la evaluación
        </q-card-section>
        <q-card-section class="q-ma-md text-center">
          <q-img
            :src="faceImg"
            style="max-width: 600px"
          >
            <div class="absolute-bottom text-subtitle1 text-center q-pa-xs">
              {{ formAttrs.name }}
            </div>
          </q-img>
        </q-card-section>

        <div class="q-px-md text-h6 text-accent q-ma-xl">
          Resultados de reconocimiento facial
        </div>

        <q-card-section class="col-12 col-md-8 q-my-md">

          <div
            class="row justify-center"
            v-for="(emotion, index) in emotions"
            :key="index"
          >
            <q-chip
              class="col-4 col-sm-2 q-py-none"
              :color="emotion.color"
              text-color="white"
            >
              <q-avatar>
                <img :src="`statics/emojis/${emotion.name}.png`">
              </q-avatar>
              {{ $t(`${emotion.name}`) }}
            </q-chip>
            <div class="col-2 text-center text-h6 q-py-xs">{{emotion.value}}%</div>
          </div>

        </q-card-section>

        <q-card-section class="col-12 col-md-8 q-my-md">

          <div class="q-px-md text-h6 text-accent q-ma-xl">
            Porcentaje del nivel de estrés
          </div>

          <vue-thermometer
            class="justify-center"
            :value="thermometerValue"
            :min="0"
            :max="90"
            scale="%"
          />
          <div class="q-pa-md text-h5 text-secondary text-center">
            {{ thermometerValue }}% se considera un nivel de estrés {{ $t(levelResult) }}
          </div>
        </q-card-section>

        <q-card-section class="col-12 col-md-8 q-mx-md">

          <div class="q-px-md text-h6 text-accent q-my-md">
            También hemos detectado
          </div>

          <block-quote type="secondary">
            En el formulario indicaste que tienes una edad de
            <span class="text-secondary text-h6 text-accent">{{ formAttrs.age }}</span> años
            y la evaluación de reconocimiento facial ha detectado que tienes <span class="text-h6 text-accent">{{ faceApiAttrs.faceAttributes.age }}</span> años.
          </block-quote>

          <block-quote type="secondary">
            La prueba de reconocimiento facial ha detectado que tu género es <span class="text-h6 text-accent">{{ $t(`${faceApiAttrs.faceAttributes.gender}`) }}</span>.
          </block-quote>

        </q-card-section>

        <q-card-section class="col-12 col-md-8 q-ma-md">
          <q-img src="statics/banner.jpeg"></q-img>
        </q-card-section>

        <q-card-section class="col-12 col-md-8 q-ma-md">
          <block-quote type="primary text-dark">
            <span class="text-h6 text-primary"> La Positiva Seguros: </span>
            <span class="text-h6 text-black"> Entendemos tus preocupaciones por eso te ofrecemos seguros
              especialmente para ti.
            </span>
          </block-quote>
        </q-card-section>

        <div class="q-px-md text-h6 text-accent q-ma-lg">
          Seguros de Vida Familia
        </div>

        <q-card-section class="col-12 col-md-8 row">
          <q-card class="col-12 q-my-md">
            <img
              src="statics/servicios/1.png"
              class="text-center"
              style="max-width: 144px; margin: 0 auto"
            >
            <q-card-section>
              <div class="text-h6 text-primary text-center">Indemnización por fallecimiento natural</div>
            </q-card-section>
          </q-card>
          <q-card class="col-12 q-my-md">
            <img
              src="statics/servicios/2.png"
              class="text-center"
              style="max-width: 144px; margin: 0 auto"
            >
            <q-card-section>
              <div class="text-h6 text-primary text-center">Indemnización por fallecimiento accidental</div>
            </q-card-section>
          </q-card>
          <q-card class="col-12 q-my-md">
            <img
              src="statics/servicios/3.png"
              class="text-center"
              style="max-width: 144px; margin: 0 auto"
            >
            <q-card-section>
              <div class="text-h6 text-primary text-center">Por invalidez permanente parcial o total</div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <div class="q-px-md text-h6 text-accent q-ma-lg">
          Seguro de trabajo de riesgo
        </div>

        <q-card-section class="col-12 col-md-8 row">
          <q-card class="col-12 q-my-md">
            <img
              src="statics/servicios/4.png"
              class="text-center"
              style="max-width: 144px; margin: 0 auto"
            >
            <q-card-section>
              <div class="text-h6 text-primary text-center">Vida Ley</div>
            </q-card-section>
          </q-card>
          <q-card class="col-12 q-my-md">
            <img
              src="statics/servicios/5.png"
              class="text-center"
              style="max-width: 144px; margin: 0 auto"
            >
            <q-card-section>
              <div class="text-h6 text-primary text-center">Seguros de salud colaboradores</div>
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section class="col-12 col-md-8 q-ma-md">
          <block-quote type="primary text-dark">
            <span class="text-h6 text-black"> Comparte tus resultados en tus redes sociales para que tus amigos conozcan esta aplicación.
            </span>
          </block-quote>
        </q-card-section>

        <q-card-section class="col-12 col-md-8 row justify-center q-mb-xl">

          <q-avatar
            size="100px"
            class="q-ma-md"
            font-size="52px"
            color="blue"
            text-color="white"
            icon="fab fa-facebook"
          />

          <q-avatar
            class="q-ma-md"
            size="100px"
            font-size="52px"
            color="cyan"
            text-color="white"
            icon="fab fa-twitter"
          />

          <q-avatar
            class="q-ma-md"
            size="100px"
            font-size="52px"
            color="purple"
            text-color="white"
            icon="fab fa-instagram"
          />
        </q-card-section>

      </q-card>
    </div>
    <!-- <q-carousel
      v-show="fullscreen"
      swipeable
      animated
      arrows
      v-model="slide"
      :fullscreen.sync="fullscreen"
      infinite
    >
      <q-carousel-slide
        :name="1"
        img-src="https://cdn.quasar.dev/img/mountains.jpg"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://cdn.quasar.dev/img/parallax1.jpg"
      />
      <q-carousel-slide
        :name="3"
        img-src="https://cdn.quasar.dev/img/parallax2.jpg"
      />
      <q-carousel-slide
        :name="4"
        img-src="https://cdn.quasar.dev/img/quasar.jpg"
      />

      <template v-slot:control>
        <q-carousel-control
          position="bottom-right"
          :offset="[18, 18]"
        >
          <q-btn
            push
            round
            dense
            color="white"
            text-color="primary"
            :icon="fullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="fullscreen = !fullscreen"
          />
        </q-carousel-control>
      </template>
    </q-carousel> -->
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TestResult',

  data () {
    return {
      emotions: [
        { name: 'anger', value: 0, color: 'red' },
        { name: 'contempt', value: 0, color: 'purple' },
        { name: 'disgust', value: 0, color: 'indigo' },
        { name: 'fear', value: 0, color: 'light-blue' },
        { name: 'happiness', value: 0, color: 'teal' },
        { name: 'neutral', value: 0, color: 'light-green' },
        { name: 'sadness', value: 0, color: 'amber' },
        { name: 'surprise', value: 0, color: 'deep-orange' }
      ],
      slide: 1,
      fullscreen: false,
      levelResult: '',
      thermometerValue: null
    }
  },

  mounted () {
    this.levelResult = this.calculateStressLevel()

    Object.values(this.faceApiAttrs.faceAttributes.emotion).forEach((e, i) => {
      this.emotions[i].value = +(Math.round((e * 100) + 'e+2') + 'e-2')
    })
    this.emotions = this.emotions.sort(function (a, b) { return b.value - a.value })
    console.warn(this.emotions)
  },

  methods: {
    calculateStressLevel () {
      let sumOfQuestions = this.formAttrs.sumOfQuestions
      let apiEmotions = this.faceApiAttrs.faceAttributes.emotion
      let sumOfEmotions =
        apiEmotions.anger + apiEmotions.contempt + apiEmotions.disgust + apiEmotions.fear + apiEmotions.sadness
      let ageFromApi = this.faceApiAttrs.faceAttributes.age
      if (apiEmotions.happiness > 0.5) {
        this.thermometerValue = 16
        return 'leve'
      }
      let result =
        (2 * (sumOfQuestions)) +
        (10 * (sumOfEmotions)) +
        ((ageFromApi - this.formAttrs.age) / 1.618)
      let roundResult = (result * 100) / 25
      if (roundResult > 99) this.thermometerValue = 100
      else this.thermometerValue = parseInt(roundResult)
      switch (roundResult) {
        case roundResult < 30:
          return 'leve'
        case roundResult < 70:
          return 'moderado'
        default:
          return 'alto'
      }
    }
  },

  computed: {
    ...mapState('evaluation', ['faceImg', 'formAttrs', 'faceApiAttrs'])
  }
}
</script>

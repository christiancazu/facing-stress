<template>
  <q-page>
    <div class="row justify-center q-my-sm q-ma-sm">
      <q-card class="col-12 col-md-8 q-my-md">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6 text-center">Resultados</div>
        </q-card-section>

        <q-card-section class="q-ma-md text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita quam
          quas pariatur magnam ducimus nobis sint atque id praesentium quae
          consectetur natus architecto modi, quidem possimus molestiae ad recusandae eaque?
        </q-card-section>
      </q-card>

      <q-card class="col-12 col-md-8 q-my-md">
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
        <q-card-section>
          <h6 class="text-h6 q-mx-md text-accent">Resultado de emociones:</h6>
          <div class="row justify-center">
            <div class="col text-h6 bg-primary text-white text-center q-mx-sm q-py-sm">
              Formulario
            </div>
            <div class="col text-h6 bg-primary text-white text-center q-mx-sm q-py-sm">
              Reconocimiento facial
            </div>
          </div>
        </q-card-section>

        <q-card-section class="col-12 col-md-8 q-my-md">

          <div
            class="row justify-center"
            v-for="(emo, index) in emos"
            :key="index"
          >
            <div class="col-2 text-center text-h6 q-py-xs">{{emo.formValue}}%</div>
            <q-chip
              class="col-4 col-sm-2 q-py-none"
              :color="emo.color"
              text-color="white"
            >
              <q-avatar>
                <img :src="`statics/emojis/${emo.name}.png`">
              </q-avatar>
              {{ $t(`${emo.name}`) }}
            </q-chip>
            <div class="col-2 text-center text-h6 q-py-xs">{{emo.apiFaceValue}}%</div>
          </div>

        </q-card-section>

        <q-card-section class="col-12 col-md-8 q-my-md">
          <h6 class="text-h6 q-mx-md text-accent">Tambien hemos detectado:</h6>

          <div class="q-ma-md doc-note doc-note--tip bg-light-green-2 q-pa-xs">
            <p>
              En el formulario indicaste que tienes una edad de
              <span class="text-secondary">{{ formAttrs.age }}</span>
              y la prueba de reconocimiento facial ha detectado que tienes <span class="text-secondary">{{ faceApiAttrs.faceAttributes.age }}</span> años.
            </p>
          </div>
          <div class="q-ma-md doc-note doc-note--tip bg-light-green-2 q-pa-xs">
            <p>
              La prueba de reconocimiento facial ha detectado que tu género es <span class="text-secondary">{{ $t(`${faceApiAttrs.faceAttributes.gender}`) }}</span>.
            </p>
          </div>
        </q-card-section>

        <q-card-section class="col-12 q-ma-md">
          <q-btn
            @click="fullscreen = true"
            :label="'Ver mis Recomendaciones'"
            push glossy
            class="col full-width q-ma-sm"
            color="primary"
          />
        </q-card-section>

      </q-card>
    </div>
    <q-carousel
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
    </q-carousel>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TestResult',

  data () {
    return {
      emos: [],
      slide: 1,
      fullscreen: false
    }
  },

  mounted () {
    this.formAttrs.emotions.forEach(e => {
      this.emos.push({
        name: e.name,
        color: e.color,
        formValue: (e.value * 10),
        apiFaceValue: +(Math.round((this.faceApiAttrs.faceAttributes.emotion[e.name] * 100) + 'e+2') + 'e-2')
      })
    })
  },

  computed: {
    ...mapState('test', ['faceImg', 'formAttrs', 'faceApiAttrs'])
  }
}
</script>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-stepper
        v-model="step"
        header-nav
        vertical
        ref="stepper"
        color="primary"
        animated
      >
        <q-step
          :name="1"
          title="Fase 1: Evaluación"
          icon="settings"
          :done="done1"
        >
          <div class="q-col-gutter-md row items-start">
            <div class="col-8">
              <p class="card-text mb-auto text-justify">
                Puede parecer una ironía, pero algo que ocurre en muchas ocasiones es que ni siquiera nosotros sabermos como nos sentimos.
En esta fase la persona resolverá un pequeño test, donde se ingresará Nombre, Edad e indicará eventos ocurridos en su vida con un lapso de tiempo.
Se ha tomado 8 emociones que son indicadores que utilizara esta Aplicación para determinar el nivel de estrés en la persona.
Posteriormente la persona deberá tomarse una foto donde deberá enfocar todo el rostro.
Recuerde que estos datos tienen que ser reales y no fotos antiguas ya que modificará el diagnostico
              </p>

            </div>
            <div class="col-4">
              <q-img
                src="statics/qqq.jpeg"
                :ratio="4/3"
              />
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn
              @click="() => { done1 = true; step = 2 }"
              color="primary"
              label="Siguiente"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="Fase 2: Procesamiento y Reconocimiento Facial"
          icon="create_new_folder"
          :done="done2"
        >
          <div class="q-col-gutter-md row items-start">
            <div class="col-4">

              <q-img
                src="statics/qqq.jpeg"
                :ratio="4/3"
              />
            </div>

            <div class="col-8">
              En esta fase la imagen es subida y procesada determinando los diferentes indicadores del rostro, estas imágenes no deberán tener iluminación extrema o expresiones faciales extremas como muecas, etc. Una vez obtenidos los valores relevantes se procede a la cuantificación del nivel de estrés.
            </div>

          </div>

          <q-stepper-navigation>
            <q-btn
              @click="() => { done2 = true; step = 3 }"
              color="primary"
              label="Continue"
            />
            <q-btn
              flat
              @click="step = 1"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="3"
          title="Fase 3: Diagnosticos y resultados"
          icon="add_comment"
          :done="done3"
        >
          <div class="q-col-gutter-md row items-start">
            <div class="col-8">
              <p class="card-text mb-auto">En esta fase la Aplicación nos mostrara los resultados obtenidos y nos guiara en la solución del problema del Usuario seleccionando un método indicado dependiendo del nivel de Estrés obtenido</p>
              <ul>
                <li>Entrenamiento en técnicas de relajación individual.</li>
                <li>Actividad física</li>
                <li>Entrenamiento en la autorregulación de emociones. </li>
                <li>Uso de estrategias de superación.</li>
                <li>Recomendar a un especialista</li>
              </ul>
            </div>
            <div class="col-4">
              <q-img
                src="statics/qqq.jpeg"
                :ratio="4/3"
              />
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn
              color="primary"
              @click="done3 = true"
              label="Finish"
            />
            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<style>
pre {
  margin-bottom: 22px;
}

.doc-note {
  background-color: #eee;
  border-radius: 4px;
  margin: 16px 0;
  padding: 16px 24px;
  font-size: 1em;
  border-width: 0 5px 0 5px;
  border-style: solid;
  border-color: #9e9e9e;
  letter-spacing: 0.5px;
}
.doc-note--tip {
  background: #e5f5fa;
  border-color: #00a0d2;
}

.q-stepper__title {
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.1px;
}
</style>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      step: 1,
      done1: false,
      done2: false,
      done3: false
    }
  },

  methods: {
    reset () {
      this.done1 = false
      this.done2 = false
      this.done3 = false
      this.step = 1
    }
  }
}
</script>

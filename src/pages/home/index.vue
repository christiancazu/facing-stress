<template>
  <q-page class="flex">
    <link
      rel="stylesheet"
      type="text/css"
      href="../css/main.css"
    />
    <noscript>
      <link
        rel="stylesheet"
        href="../css/noscript.css"
      /></noscript>
    <vue-particles
      class=" full-width absolute"
      color="#3f51b5"
      :particleOpacity="0.7"
      :particlesNumber="30"
      shapeType="circle"
      :particleSize="4"
      linesColor="#3f51b5"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>

    <body class="is-preload">
      <div id="page-wrapper">
        <section id="banner">
          <div class="inner">
            <div class="logo"><span class="icon fa-gem"></span></div>
            <h2>Facing Stress</h2>
            <p style="text-align: justify;">Se trata de la herramienta más innovadora para conocer nuestro nivel de estrés, ya que analiza tus emociones a través de la cámara de tu smartphone y te indica el nivel de estrés acumulado que tienes.</p>
          </div>
        </section>

        <section id="wrapper">
          <section
            id="one"
            class="wrapper spotlight style1"
          >
            <div class="inner">
              <a
                href="#"
                class="image"
              ><img
                  src="images/pic01.jpg"
                  alt=""
                /></a>
              <div class="content">
                <h2 class="major">¿Tienes Estrés?</h2>
                <!--<p style="text-align: justify;">A nivel mundial el estrés en personas cada día va en aumento por la gran cantidad de actividades diarias que tienen que realizar y por el alto nivel de exigencia que establecen los estándares sociales. Estudios recientes han demostrado que el estrés también puede afectar los aspectos de su vida, incluida su capacidad de pensamiento y su salud física. Para reducir el riesgo de ser estresado y afectado con sus efectos adversos, es crucial detectar tales emociones y tomar ciertas medidas para relajarlas.</p>-->
                <p style="text-align: justify;">Estrés es lo que se siente cuando te supera una situación externa. Tu organismo se está sobreactivando demasiado y tu salud empieza a sentirse perjudicada.Si mantienes unos niveles demasiado elevados durante demasiado tiempo, puedes desarrollar transtorno emocional y/o físico... y lo peor: sin darte cuenta.Los síntomas del estrés pueden afectar el cuerpo, los pensamientos, las emociones y el comportamiento. Saber identificar los síntomas comunes del estrés ya es un gran paso para poder manejarlos. Si no se controla, el estrés puede desencadenar muchos problemas de salud, como presión arterial alta, enfermedades cardíacas, obesidad y diabetes.</p>
                <img
                  style="max-width: 100%"
                  src="statics/home/elestres.jpg"
                  alt=""
                >
                <a
                  href="#"
                  class="special"
                >Leer más</a>
              </div>
            </div>
          </section>
          <section
            id="two"
            class="wrapper alt spotlight style2"
          >
            <div class="inner">
              <a
                href="#"
                class="image"
              ><img
                  src="images/pic02.jpg"
                  alt=""
                /></a>
              <div class="content">
                <h2 class="major">¿Cómo puedes solucionar este problema?</h2>
                <p style="text-align: justify;">A través de nuestra aplicación te daremos recomendaciones y técnicas que podrás usar para poder resolver sintomas del estrés de una manera muy fácil y sencilla. Con una fotografía que te tomes podrás medir el nivel de estrés que tienes.</p>
                <img
                  style="max-width: 85%"
                  src="statics/home/step2-tomarselfie/selfie.jfif"
                  alt=""
                >
                <a
                  href="#"
                  class="special"
                >Leer más</a>
              </div>
            </div>
          </section>
          <section
            id="four"
            class="wrapper alt style1"
          >
            <div class="inner">
              <h2 class="major">Testimonios Recientes</h2>
              <p>La interfaz de nuestra aplicación es el punto de unión con el portador de la aplicación. El objetivo es lograr un mínimo esfuerzo y mayor eficacia para el portador de la aplicación; esto se traduce en mayor rapidez en las operaciones, facilidad de aprendizaje, utilización de elementos habituales, entre otros.</p>
              <section class="features">
                <article>
                  <a
                    href="#"
                    class="image"
                  ><img
                      src="images/pic04.jpg"
                      alt=""
                    /></a>
                  <h3 class="major">Sed feugiat lorem</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  <a
                    href="#"
                    class="special"
                  >Learn more</a>
                </article>
                <article>
                  <a
                    href="#"
                    class="image"
                  ><img
                      src="images/pic05.jpg"
                      alt=""
                    /></a>
                  <h3 class="major">Nisl placerat</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  <a
                    href="#"
                    class="special"
                  >Learn more</a>
                </article>
                <article>
                  <a
                    href="#"
                    class="image"
                  ><img
                      src="images/pic06.jpg"
                      alt=""
                    /></a>
                  <h3 class="major">Ante fermentum</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  <a
                    href="#"
                    class="special"
                  >Learn more</a>
                </article>
                <article>
                  <a
                    href="#"
                    class="image"
                  ><img
                      src="images/pic07.jpg"
                      alt=""
                    /></a>
                  <h3 class="major">Fusce consequat</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id nulla dignissim dapibus ultrices.</p>
                  <a
                    href="#"
                    class="special"
                  >Learn more</a>
                </article>
              </section>
              <ul class="actions">
                <li><a
                    href="#"
                    class="button"
                  >Browse All</a></li>
              </ul>
            </div>
          </section>
        </section>
      </div>
    </body>
  </q-page>
</template>
<script src="src/js/jquery.min.js"></script>
<script src="src/js/jquery.scrollex.min.js"></script>
<script src="src/js/browser.min.js"></script>
<script src="src/js/breakpoints.min.js"></script>
<script src="src/js/util.js"></script>
<script src="src/js/main.js"></script>
<script>
export default {
  name: 'HomeIndex'
}
</script>
<style scoped>
body, input, select, textarea {
  color: #ffffff;
  font-family: "Source Sans Pro", Helvetica, sans-serif;
}
</style>

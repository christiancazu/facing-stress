// loading every component and layout on Vue.component
import VueParticles from 'vue-particles'
import VueThermometer from 'vuejs-thermometer'

export default async ({ Vue }) => {
  Vue.use(VueParticles)
  Vue.use(VueThermometer)

  // load all components dinamycally
  const requireComponents = require.context('@/components', false, /\.(vue)$/i)
  requireComponents.keys().forEach(key => {
    const name = key.match(/\w+/)[0]
    Vue.component(name, requireComponents(key).default)
  })

  // load all layouts dinamycally
  const requireLayouts = require.context('@/layouts', false, /\.(vue)$/i)
  requireLayouts.keys().forEach(key => {
    const name = key.match(/\w+/)[0]
    Vue.component(name, requireLayouts(key).default)
  })
}

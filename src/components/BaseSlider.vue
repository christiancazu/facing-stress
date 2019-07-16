<template>
  <div class="q-pa-md">

    <q-badge :color="color">
      {{ name }}
    </q-badge>

    <q-slider
      v-model="value"
      @input="emitValue"
      :color="color"
      :min="0"
      :max="10"
      :step="1"
      snap label label-always
    />
  </div>
</template>

<script>
export default {
  name: 'BaseSlider',

  props: {
    index: { type: Number },
    color: { type: String },
    name: { type: String }
  },

  data () {
    return {
      value: 5
    }
  },

  methods: {
    emitValue () {
      this.$emit('sliderValue', {
        index: this.index,
        value: this.value
      })
    }
  }
}
</script>

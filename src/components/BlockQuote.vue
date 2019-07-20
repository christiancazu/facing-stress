<template>
  <blockquote :class="`q-mx-sm q-markdown--${type}`">
      <h6 class="text-subtitle1 q-pa-md q-ma-none">
        <q-icon
          name="info"
          :color="type"
          style="font-size: 2em"
        />
          <slot />
      </h6>
  </blockquote>
</template>

<script>
export default {
  name: 'BlockQuote',

  props: {
    type: { type: String }
  }
}
</script>

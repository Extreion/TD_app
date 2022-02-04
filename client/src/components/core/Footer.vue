<template>
  <v-footer
    id="core-footer"
    width="auto"
    class="ml-md-14"
    color="grey"
  >
    <span style="margin-left:56px;" class="font-weight-light copyright">
      N.OUARET, S.SUEUR, H.DEFRANCE
      &copy;
      {{ (new Date()).getFullYear() }}
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({})
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>

<template>
  <v-alert 
    type="error" 
    color="error" 
    icon="$error" 
    closable 
    @click:close="onClose"
    v-model="isVisible">
    {{text}}
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>
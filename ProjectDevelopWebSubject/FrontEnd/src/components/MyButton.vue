<template>
  <v-btn @click="handleClick" :color="color" small dense>
    <v-icon v-if="icon" class="mr-1">{{ icon }}</v-icon>
    <slot></slot>
  </v-btn>
</template>


<script>
export default {
  name: 'MyButton',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>

<template>
  <v-card class="elevation-0">
    <v-card-title class="pa-0" :class="[colorText]" style="font-size:20px; font-weight:300">
      <span v-if="messageHasTitle" class="title">{{ messageTitle }}</span>
      <span v-else>Confirmation</span>
    </v-card-title>
    <v-divider />

    <v-card-text class="body-2" v-html="messageBody"></v-card-text>

    <v-card-actions class="pa-0">
      <v-spacer></v-spacer>

      <v-btn text color="secondary"
        class="mr-2"
        :disabled="loading"
        @click="handleDismiss">
        {{ leftBtnText }} 
      </v-btn>
      <v-btn depressed 
        :color="colorBtn" 
        :loading="loading"
        @click="handlerYes">
        {{ rightBtnText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'

export default {
  name: 'vuejs-confirm-dialog',
  mixins: [VuejsDialogMixin],
  computed: {
    colorBtn() {
      if (this.options.mode === 'danger') {
        return 'error';
      }
      else if (this.options.mode === 'default') {
        return 'primary';
      }

      return '';
    },
    colorText() {
      if (this.options.mode === 'danger') {
        return 'error--text';
      }

      return '';
    }
  },
  methods: {
    handlerYes(platform) {
      this.proceed(platform)
    },
    handleDismiss() {
      this.cancel();
    }
  },
}
</script>

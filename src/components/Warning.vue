<template>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="showWarn"
    >
        <v-card>
          <v-toolbar
            dark
          >
            Warning
          </v-toolbar>
          <v-card-text>
            <div class="text-p pa-4 pt-8 pb-0">{{ warningText }}</div>
          </v-card-text>
          <v-card-actions class="justify-space-between">
            <v-btn
              text
              @click="doIt()"
            >Ok</v-btn>
            <v-btn
              text
              @click="closeIt()"
            >Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ["showWarn", "warningText"],
    methods: {
        closeIt() {
            this.$emit("closeWarning")
        },
        doIt() {
            this.$emit("doIt")
        }
    }
}
</script>

<style>

</style>
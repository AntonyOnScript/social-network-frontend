<template>
    <v-app>
        <v-app-bar
          app
          color="primary"
          dark
        >
            <div class="d-flex align-center">
                <v-img
                  alt="Vuetify Logo"
                  class="shrink mr-2"
                  contain
                  src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                  transition="scale-transition"
                  width="40"
                />

                <v-img
                  alt="Vuetify Name"
                  class="shrink mt-1 hidden-sm-and-down"
                  contain
                  min-width="100"
                  src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                  width="100"
                />
            </div>

            <v-spacer></v-spacer>

            <div
                v-ripple
                class="pa-3"
                v-show="logged"
            >
                <router-link to="/posts" class="menu-links">Posts</router-link>
            </div>
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: 'App',
    computed: {
        logged() {
            if(this.$store.state.token) {
                return true
            } else {
                return false
            }
        }
    }
};
</script>

<style scoped>
    .menu-links {
        color: white;
    }
</style>
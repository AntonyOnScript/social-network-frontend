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
                v-show="isLogged"
            >
                <router-link to="/posts" class="menu-links">Posts</router-link>
            </div>

            <div
                v-if="isLogged"
                v-ripple
                class="pa-3"
                @click="logout()"
            >
                <button>Log Out</button>
            </div>
        </v-app-bar>

        <v-main>
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex"

export default {
    name: 'App',
    computed: {
        ...mapGetters(["isLogged"])
    },
    watch: {
        $route(to, from) {
            if(to.query.error === "unauthorized") {
                console.log(to)
                this.$store.commit("REMOVE_USER")
            }
        }
    },
    methods: {
        logout() {
            this.$store.commit("REMOVE_USER")
            this.$router.push({ name: "Home", query: { error: "Logged out." } })
        }
    }
};
</script>

<style scoped>
    .menu-links {
        color: white;
    }
</style>
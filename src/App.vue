<template>
    <v-app>
        <v-app-bar
          app
          color="var(--theme-color)"
          dark
        >
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

<style>
    :root {
        --yellow-color: #aaad00;
        --green-color: #397019;
        --theme-color: #375917;
    }

    .menu-links {
        color: white !important;
        text-decoration: none;
    }
</style>
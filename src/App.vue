<template>
    <v-app>
        <v-app-bar
          app
          color="var(--theme-color)"
          dark
        >
            <h4>GREEN POSTS</h4>
            <v-spacer></v-spacer>

            <div
                v-if="isLogged"
                v-ripple
                class="d-flex align-center"
                style="height: 100%;"
            >
                <router-link 
                    to="/posts" 
                    class="menu-links pa-3"
                    style="heigth: 100%; width: 100%;"
                >
                    Posts
                </router-link>
            </div>

            <div
                v-if="isLogged"
                @click="logout()"
            >
                <button
                    v-ripple
                    class="pa-3"
                >
                    Log Out
                </button>
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
    * {
        box-sizing: border-box;
    }

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
<template>
    <v-container class="global d-flex flex-column justify-center">
        <h1 class="text-center">What's up!</h1>
        <form @submit.prevent>
            <v-text-field label="Username" v-model="form.username" autocomplete="off" color="var(--theme-color)"></v-text-field>
            <v-text-field label="Password" type="password" v-model="form.password" color="var(--theme-color)"></v-text-field>
            <div class="d-flex justify-end">
                <v-btn
                    type="submit"
                    @click="logUser()"
                    elevation="4"
                    class="mr-6"
                >Login</v-btn>
                <v-btn
                    type="submit"
                    @click="regUser()"
                    elevation="4"
                >Register</v-btn>
            </div>
        </form>
        <div>
            <v-alert
              v-model="alert"
              v-show="alert"
              border="left"
              :type="type"
              :color="color"
              dark
              dismissible
              class="mt-5"
            >
                {{ alertMessage }}
            </v-alert>
        </div>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    username: null,
                    password: null
                },
                alert: false,
                alertMessage: '',
                type: "success"
            }
        },
        methods: {
            logUser() {
                this.$store.dispatch("logUser", this.form)
                .then(() => {
                    this.alert = true
                    this.type = "success"
                    this.color = "var(--green-color)"
                    this.alertMessage = "Logged successfully"
                })
                .catch(e => { 
                    this.alert = true
                    this.type = "warning"
                    this.color = "var(--yellow-color)"
                    this.alertMessage = e.response.data
                })
            },
            regUser() {
                this.$store.dispatch("regUser", this.form)
                .then(() => {
                    this.alert = true
                    this.type = "success"
                    this.color = "var(--green-color)"
                    this.alertMessage = "Registred successfully"
                })
                .catch(e => { 
                    this.alert = true
                    this.color = "var(--yellow-color)"
                    this.type = "warning"
                    this.alertMessage = e.response.data
                })
            }
        },
        computed: {
            unLogged() {
                if(this.$route.query.error) {
                    this.alertMessage = this.$route.query.error
                    this.type = "warning"
                    this.color = "var(--yellow-color)"
                    this.alert = true
                }
            }
        },
        mounted() {
            if(this.$route.query.error) {
                this.alertMessage = this.$route.query.error
                this.type = "warning"
                this.color = "var(--yellow-color)"
                this.alert = true
            }
        }
    }
</script>

<style scoped>
    .global {
        height: 100vh;
    }
</style>
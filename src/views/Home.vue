<template>
    <v-container class="global d-flex flex-column justify-center">
        <h1 class="text-center">What's up!</h1>
        <form @submit.prevent="logUser()">
            <v-text-field label="Username" v-model="form.username"></v-text-field>
            <v-text-field label="Password" type="password" v-model="form.password"></v-text-field>
            <v-btn
                type="submit"
                elevation="2"
            >Login</v-btn>
        </form>
        <br>
        <form @submit.prevent="regUser()">
            <v-text-field label="Username" v-model="form.username"></v-text-field>
            <v-text-field label="Password" type="password" v-model="form.password"></v-text-field>
            <v-btn
                type="submit"
                elevation="2"
            >Register</v-btn>
        </form>
        <div>
            <v-alert
              v-model="alert"
              v-show="alert"
              border="left"
              :type="type"
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
    import HelloWorld from '../components/HelloWorld'

    export default {
        components: {
            HelloWorld,
        },
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
                .then(response => {
                    this.alert = true
                    this.type = "success"
                    this.alertMessage = "Logged successfully"
                })
                .catch(e => { 
                    this.alert = true
                    this.type = "warning"
                    this.alertMessage = "Wrong password or unknown account"
                })
            },
            regUser() {
                this.$store.dispatch("regUser", this.form)
                .then(response => {
                    this.alert = true
                    this.type = "success"
                    this.alertMessage = "Registred successfully"
                })
                .catch(e => { 
                    this.alert = true
                    this.type = "warning"
                    this.alertMessage = "Something is wrong... this account already exists."
                })
            }
        },
        computed: {
            unLogged() {
                if(this.$route.query.error) {
                    this.alertMessage = this.$route.query.error
                    this.type = "warning"
                    this.alert = true
                }
            }
        },
        watch: {
            $route(to, from) {
                if(from.query.error) {
                    this.alertMessage = this.$route.query.error
                    this.type = "warning"
                    this.alert = true
                }
            }
        }
    }
</script>

<style scoped>
    .global {
        height: 100vh;
    }
</style>
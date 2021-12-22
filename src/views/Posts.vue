<template>
    <v-container class="posts-container">
        <form @submit.prevent="sendPost()" class="container-post d-flex flex-column align-center">
            <div class="form-container">
                <v-textarea
                    name="input-7-1"
                    auto-grow
                    outlined
                    flat
                    color="#FFEA00"
                    solo
                    placeholder="Post something here"
                    class="post-text"
                    clearable
                    :loading="sending"
                    :rules="tweetRule"
                    autofocus
                    v-model="postData.postContent"
                ></v-textarea>
                <div class="w-100 d-flex flex-row justify-end">
                    <v-btn
                        class="tweet-button"
                        file
                        plain
                        outlined
                        color="#FFEA00"
                        type="submit"
                        @click="sending = !sending"
                    >Tweet it!</v-btn>
                </div>
            </div>
        </form>
        <div class="content-posts my-5">
            <post username="antony san" postMessage="olá" likes="200" />
        </div>
    </v-container>
</template>

<script>
import Post from "@/components/Post.vue"

export default {
    components: {
        "post": Post
    },
    data() {
        return {
            postData: {
                postContent: ''
            },
            sending: false,
            tweetRule: [
                (tweet) => {
                    if(tweet.length > 10) {
                        return true
                    } else {
                        return "It must has at least ten characters."
                    }
                },

            ]
        }
    },
    methods: {
        sendPost() {
            this.$http.post("post", this.postData)
            .then(response => {
                console.log(response)
                this.sending = false
            })
            .catch(e => {
                this.sending = false
                console.log(e)
            })
        }
    }
}
</script>

<style scoped>
    .form-container {
        width: 100%;
        max-width: 600px;
    }

    .tweet-button {
        margin-top: -20px;
    }
</style>
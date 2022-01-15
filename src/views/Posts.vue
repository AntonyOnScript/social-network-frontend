<template>
    <v-container class="posts-container">
        <form @submit.prevent="sendPost()" class="container-post d-flex flex-column align-center">
            <div class="form-container">
                <v-textarea
                    name="input-7-1"
                    auto-grow
                    outlined
                    flat
                    color="var(--yellow-color)"
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
                        color="var(--yellow-color)"
                        type="submit"
                        @click="sending = !sending"
                    >Tweet it!</v-btn>
                </div>
            </div>
        </form>
        <div class="content-posts my-5">    
            <transition-group name="fade-posts" >
                <div v-for="post of posts" v-bind:key="post.associatedUser.username">
                    <post class="my-4" @postWasDeleted="getPosts()" :user="currentUser" v-bind:key="post.associatedUser" :postMessage="post.postContent" :postId="post._id" :postAssociatedUser="post.associatedUser" :likes="post.likes" />
                </div>
            </transition-group> 
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
                }
            ],
            posts: []
        }
    },
    mounted() {
        this.getPosts()
    },
    computed: {
        currentUser() {
            return this.$store.getters.getUser
        }
    },
    methods: {
        sendPost() {
            if(this.postData.postContent.length <= 10) {
                this.sending = false
                return
            }

            this.$http.post("post", this.postData)
            .then(() => {
                this.sending = false
                this.getPosts()
            })
            .catch(e => {
                this.sending = false
                if(e.response.data === "TokenExpiredError: jwt expired") {
                    this.$store.commit("REMOVE_USER")
                    this.$router.push({ name: "Home", query: { error: "Session expired." } })
                }
            })
        },
        getPosts() {
            this.$http.get("posts")
            .then(response => {
                this.posts = response.data
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

    .fade-posts-enter-active, .fade-posts-leave-active {
        transition: opacity .5s;
    }
    
    .fade-posts-enter, .fade-posts-leave-to {
        opacity: 0;
    }
</style>
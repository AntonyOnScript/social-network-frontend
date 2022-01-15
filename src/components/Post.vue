<template>
    <div>
        <v-card
            class="mx-auto"
            color="var(--yellow-color)"
            dark
        >
            <v-card-title class="d-flex justify-space-between">
                <span class="text-h6 font-weight-light">{{ user.username }}</span>
                <v-btn
                    icon
                    @click="requestDelete()"
                >
                    <v-icon>
                        mdi-delete
                    </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text class="text-h5 font-weight-bold">
              "{{ postMessage }}"
            </v-card-text>
            <v-card-actions>
                <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                        <v-avatar class="avatar-cont w-100">
                            <p class="white--text text-h5 mb-0 avatar-initials">{{ initialUsernameLetters }}</p>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>{{ user.username }}</v-list-item-title>
                    </v-list-item-content>
                    <v-row
                      align="center"
                      justify="end"
                      @click="toLike()"
                      class="like-button"
                    >
                        <v-icon class="mr-1" ref="like">
                          mdi-heart
                        </v-icon>
                        <span class="subheading mr-2">{{ likesCount }}</span>
                    </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card>
        <warning warningText="Are you sure that wanna delete it?" :showWarn="showWarningDelete" @doIt="deletePost()" @closeWarning="showWarningDelete = !showWarningDelete" />
    </div>
</template>

<script>
import Warning from '@/components/Warning.vue'

export default {
    props: ["user", "postMessage", "likes", "postId"], 
    components: {
        'warning': Warning
    },
    data() {
        return {
            likesCount: this.likes,
            showWarningDelete: false
        }
    },
    computed: {
        initialUsernameLetters() {
            if(this.user.username.indexOf(" ") !== -1) {
                return String(this.user.username.split(" ")[0][0]+" "+this.user.username.split(" ")[1][0]).toUpperCase()
            } else {
                return this.user.username[0].toUpperCase()
            }
        }
    },
    methods: {
        toLike() {
            this.likeAnimation()
            this.$http.post("likePost", {
                postId: this.postId,
                userThatWannaLikeIt: this.$store.state.user._id
            })
            .then(() => {
                this.$http.post("getPostLikes", {
                    postId: this.postId
                })
                .then(response => {
                    this.likesCount = response.data
                })
            })
            .catch(e => {
                console.log(e.response.message)
                if(e.response.message.indexOf("jwt") !== -1) {
                    this.$store.commit("REMOVE_USER")
                }
            })
        },
        likeAnimation() {
            let likeButton = this.$refs.like.$el

            likeButton.style.animation = "liked 0.2s"
            setTimeout(() => {
                likeButton.style.animation = ""
            }, 200)
        },
        requestDelete() {
            this.showWarningDelete = true
        },
        deletePost() {
            this.showWarningDelete = false
            this.$http.delete("deletePost", { data: { postId: this.postId } })
            .then(() => {
                this.$emit("postWasDeleted")
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
    .w-100 {
        min-width: 100% !important; 
        max-width: 100% !important;
    }

    .avatar-initials {
        max-width: 100% !important; 
        font-size: 100% !important;    
        letter-spacing: -1px !important;
    }

    .like-button {
        cursor: pointer;
    }

    @keyframes liked {
        from { transform: scale(1, 1); }
        to { transform: scale(1.5, 1.5); }
    }
</style>
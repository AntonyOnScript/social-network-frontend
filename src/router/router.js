import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../http/http'
import store from '../store/store'

const Home = () => import('../views/Home.vue')
const Posts = () => import('../views/Posts.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            public: true
        }
    },
    {
        path: '/posts',
        name: 'Posts',
        meta: {
            public: false
        },
        component: Posts
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(!to.meta.public) {
        http.post("checkJWT", { token: store.state.token })
        .then(response => {
            next()
        }).catch(e => { 
            return next({ path: "/?error=unauthorized" })
        })
    } else if(to.meta.public) {
        next()
    }
})

export default router
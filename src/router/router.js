import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/store'
import http from '../http/http'

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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Posts.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    console.log("token", store.state.token)
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
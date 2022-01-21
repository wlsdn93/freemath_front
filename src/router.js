import Vue from "vue"
import VueRouter from "vue-router"
import Home from "./views/Home"
import About from "./views/About"
import ProblemDetail from "./views/ProblemDetail";
import Upload from "./views/Upload";
import Login from "@/views/Login";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
        path:"/",
        component: Home
        },
        {
        path:"/about",
        component: About
        },
        {
        path:"/problems/add",
        component: Upload
        },
        {
        path:"/problems/:id",
        component: ProblemDetail
        },
        {
        path:"/login",
        component: Login
        },
    ]
})

export default router
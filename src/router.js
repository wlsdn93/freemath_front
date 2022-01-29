import Vue from "vue"
import VueRouter from "vue-router"
import Home from "./views/Home"
import About from "./views/About"
import ProblemDetail from "./views/ProblemDetail";
import Upload from "./views/Upload";
import Login from "@/views/Login";
import Callback from "@/views/Callback";
import logout from "@/views/logout";

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
        {
        path:"/logout",
        component: logout
        },
        {
        path:"/callback/:social",
        component: Callback,
        props: (route) => ({
            query: route.query.q,
            param: route.params})
        },
    ]}
)

export default router
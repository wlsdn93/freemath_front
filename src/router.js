import Vue from "vue"
import VueRouter from "vue-router"
import Problems from "./views/Problems"
import ProblemDetail from "./views/ProblemDetail";
import Upload from "./views/Upload";
import Login from "@/views/Login";
import Callback from "@/views/Callback";
import Ghost from "@/views/Ghost";
import Welcome from "@/views/Welcome";
import Update from "@/views/Update";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
            path:"/problems",
            component: Problems
        },
        {
            path:"/problems/:problemId",
            component: ProblemDetail,
            props: (route) => ({
                param: route.params})
        },
        {
            path:"/admin/problem-add",
            component: Upload
        },
        {
            path:"/admin/update/:problemId",
            component: Update,
            props: (route) => ({
                param: route.params})
        },
        {
            path:"/login",
            component: Login
        },
        {
            path:"/callback/:social",
            component: Callback,
            props: (route) => ({
                query: route.query.q,
                param: route.params})
        },
        {
            path:"/ghost",
            component: Ghost
        },
        {
            path:"/",
            component: Welcome
        },
    ]}
)

export default router
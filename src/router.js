import Vue from "vue"
import VueRouter from "vue-router"
import Problems from "./views/Problems"
import ProblemDetail from "./views/ProblemDetail";
import Upload from "./views/Upload";
import Login from "@/views/Login";
import Callback from "@/views/Callback";
import Ghost from "@/views/Ghost";
import Welcome from "@/views/Welcome";
import Test from "@/views/Test";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [{
            path:"/problems",
            component: Problems
        },
        {
            path:"/problems/:id",
            component: ProblemDetail
        },
        {
            path:"/admin/problem-add",
            component: Upload
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
        {
            path:"/test",
            component: Test
        },
    ]}
)

export default router
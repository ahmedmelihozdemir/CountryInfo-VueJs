import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: () => import("../views/AboutView.vue"),
    },
    {
        path: "/country",
        redirect: "/",
    },
    {
        path: "/country/:country",
        name: "country",
        component: () => import("../views/CountryView.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "error",
        component: () => import("../views/ErrorView.vue"),
        //this path is for the 404 error page. if you type a wrong path, it will redirect you to the error page
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

router.beforeEach((to,from,next)=>{
    if(to.name === 'error'){
        next({name:'home'})
    }else{
        next(true)
    }
})

export default router;

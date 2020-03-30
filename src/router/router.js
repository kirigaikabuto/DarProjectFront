import Vue from 'vue'
import Router from 'vue-router'
import vStart from '../components/v-start'
import vStudentLogin from '../components/students/v-student-login'
import vTeacherLogin from '../components/teachers/v-teacher-login'
import vTeacherProfile from "../components/teachers/v-teacher-profile"
Vue.use(Router);


let router = new Router({
    routes:[
        {
            path:"/",
            name:"start",
            component:vStart
        },
        {
            path: "/studentLogin",
            name:"studentLogin",
            component:vStudentLogin
        },
        {
            path:"/teacherLogin",
            name:"teacherLogin",
            component:vTeacherLogin
        },
        {
            path:"/teacherProfile",
            name:"teacherProfile",
            component:vTeacherProfile
        }
    ]
});

export default router;
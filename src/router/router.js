import Vue from 'vue'
import Router from 'vue-router'
import vStart from '../components/v-start'
import vStudentLogin from '../components/students/v-student-login'
import vTeacherLogin from '../components/teachers/v-teacher-login'
import vTeacherProfile from "../components/teachers/v-teacher-profile"
import vTeacherProfileCourse from "../components/teachers/v-teacher-profile-course"
import vTeacherProfileCourseDetail from "../components/teachers/v-teacher-profile-course-detail"
import vTeacherProfileLessonAddForm from "../components/teachers/v-teacher-profile-course-lesson-addform"
import vTeacherProfileLessonDetail from "../components/teachers/v-teacher-profile-lesson-detail"
import vTeacherProfileMaterialAddFrom from "../components/teachers/v-teacher-profile-material-addform"
import vStudentProfile from "../components/students/v-student-profile"
import vStudentProfileCourse from "../components/students/v-student-profile-course"
import vStudentProfileLessonDetail from "../components/students/v-student-profile-lesson-detail"
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
          path:"/studentProfile",
          name:"studentProfile",
          component:vStudentProfile,
            children:[
                {
                    path:"/studentProfile/Course",
                    name:"studentProfileCourse",
                    component: vStudentProfileCourse,
                    props:true
                },
                {
                    path:"/studentsProfile/lesson",
                    name:"studentProfileLessonDetail",
                    component: vStudentProfileLessonDetail,
                    props: true
                }

            ]
        },
        {
            path:"/teacherProfile",
            name:"teacherProfile",
            component:vTeacherProfile,
            children:[
                {
                    path:"/teacherProfile/Course",
                    name:"teacherProfileCourse",
                    component:vTeacherProfileCourse,
                    props:true
                },
                {
                    path: "/teacherProfile/Course/Detail",
                    name:"vTeacherProfileCourseDetail",
                    component: vTeacherProfileCourseDetail,
                    props: true
                },
                {
                    path:"/vTeacherProfileLessonAddForm",
                    name:"vTeacherProfileLessonAddForm",
                    component:vTeacherProfileLessonAddForm,
                    props:true
                },
                {
                    path:"/vTeacherProfileLessonDetail",
                    name:"vTeacherProfileLessonDetail",
                    component:vTeacherProfileLessonDetail,
                    props:true
                },
                {
                    path:"/vTeacherProfileMaterialAddFrom",
                    name:"vTeacherProfileMaterialAddFrom",
                    component:vTeacherProfileMaterialAddFrom,
                    props:true
                }
            ]
        },

    ]
});

export default router;
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        students: [],
        student: {},
        teacher: {},
        course:{},
        courses: [],
        schedule: {},
        lessons: [],
        lesson: {},
        attendances:[],
        material:{},

    },
    mutations:{
        SET_STUDENTS_TO_STATE:(state,students)=> {
            state.students = students
        },
        SET_STUDENT_TO_STATE:(state,student)=>{
          state.student = student
        },
        SET_TEACHER_TO_STATE:(state,teacher)=>{
            state.teacher=teacher
        },
        SET_TEACHER_COURSES_TO_STATE:(state,courses)=>{
            state.courses = courses
        },
        SET_COURSE_SCHEDULE_TO_STATE:(state,schedule)=>{
            state.schedule = schedule
        },
        SET_SCHEDULE_LESSONS_TO_STATE:(state,lessons)=>{
            state.lessons = lessons
        },
        ADD_LESSON:(state,lesson)=>{
            state.lessons.push(lesson)
        },
        SET_LESSON:(state,lesson)=>{
            state.lesson = lesson
        },
        SET_ATTENDACE:(state,attendances)=>{
            state.attendances = attendances
        },
        ADD_ATTENDANCE:(state,attendance)=>{
            state.attendances.push(attendance)
        },
        SET_MATERIAL:(state,material)=>{
            state.material = material
        },
        SET_COURSE_TO_STATE:(state,course)=>{
            state.course = course
        }
    },
    actions: {
        GET_STUDENTS_FROM_API({commit}) {
            return axios("http://localhost:8000/students/", {
                method: "GET",
                withCredentials: true,
            })
                .then((students) => {
                    commit("SET_STUDENTS_TO_STATE", students.data);
                    return students
                })
                .catch((error) => {
                    console.log(error.data);
                    return error;
                })
        },
        STUDENT_LOGIN({commit}, obj) {
            console.log(obj);
            return axios(
                {
                    method: "POST",
                    withCredentials: true,
                    url: "http://localhost:8000/students/login/",
                    data: {
                        "username": obj.username,
                        "password": obj.password
                    },
                    headers: {
                        "content-type": "text/plain"
                    }
                }
            )
                .then((student) => {
                    console.log(student);
                    commit("SET_STUDENT_TO_STATE", student.data);
                    localStorage.setItem('userToken', student.data.token)
                    return student
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_STUDENT_PROFILE({commit}) {

            return axios(
                {
                    method: "POST",
                    url: "http://localhost:8000/students/profile/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((student) => {
                    console.log(student.data);
                    commit("SET_STUDENT_TO_STATE", student.data);
                    return student
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_STUDENT_COURSE({commit},obj){
            return axios(
                {
                    method: "GET",
                    url: "http://localhost:8000/courses/"+obj.course_id,
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((course) => {
                    console.log(course.data);
                    commit("SET_COURSE_TO_STATE", course.data);
                    return course
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_TEACHER({commit},obj){
            return axios(
                {
                    method: "GET",
                    url: "http://localhost:8000/teachers/"+obj.teacher_id,

                    headers: {
                        "content-type": "text/plain"
                    }
                }
            )
                .then((teacher) => {
                    console.log(teacher);
                    commit("SET_TEACHER_TO_STATE", teacher.data);
                    return teacher
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        TEACHER_LOGIN({commit}, obj) {
            console.log(obj);
            return axios(
                {
                    method: "POST",
                    url: "http://localhost:8000/teachers/login/",
                    data: {
                        "username": obj.username,
                        "password": obj.password
                    },
                    headers: {
                        "content-type": "text/plain"
                    }
                }
            )
                .then((teacher) => {
                    console.log(teacher);
                    commit("SET_TEACHER_TO_STATE", teacher.data);
                    localStorage.setItem('userToken', teacher.data.token)
                    return teacher
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_TEACHER_PROFILE({commit}) {

            return axios(
                {
                    method: "POST",
                    url: "http://localhost:8000/teachers/profile/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((teacher) => {
                    console.log(teacher.data);
                    commit("SET_TEACHER_TO_STATE", teacher.data);
                    return teacher
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_TEACHER_COURSES({commit}) {
            return axios(
                {
                    method: "POST",
                    url: "http://localhost:8000/teachers/courses/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((courses) => {
                    console.log(courses.data);
                    commit("SET_TEACHER_COURSES_TO_STATE", courses.data);
                    return courses
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },
        GET_COURSES_SCHEDULE({commit}, obj) {
            console.log(obj);
            return axios(
                {
                    method: "GET",
                    url: "http://127.0.0.1:8000/courses/" + obj.course_id + "/schedule/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((schedule) => {
                    console.log("accessed");
                    commit("SET_COURSE_SCHEDULE_TO_STATE", schedule.data);
                    return schedule.data
                })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });

        },
        GET_SCHEDULE_LESSONS({commit}, obj) {
            console.log("GET SCHEDULE LESSONS",obj);
            return axios(
                {
                    method: "GET",
                    url: "http://127.0.0.1:8000/schedule/" + obj.id + "/lessons/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((lessons) => {
                    console.log("accessed");
                    commit("SET_SCHEDULE_LESSONS_TO_STATE", lessons.data);
                    return lessons.data
                })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });
        },
        LESSON_ADD_FORM({commit},obj){
            console.log("asdsad",obj);
            return axios(
                {
                    method:"POST",
                    url:"http://127.0.0.1:8000/lessons/",
                    withCredentials: true,
                    data:{
                        "name":obj.name,
                        "date":obj.datestart,
                        "timestart":obj.timestart,
                        "timeend":obj.timeend,
                        "scheduleid":obj.schedule_id
                    },
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            ) .then((lesson) => {
                commit("ADD_LESSON",lesson.data);
                console.log(lesson.data)
                return lesson.data
            })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });
        },
        CREATE_SCHEDULE({commit},obj){
            console.log("ADD schedule",obj)
            return axios(
                {
                    method:"POST",
                    url:"http://127.0.0.1:8000/schedule/",
                    withCredentials: true,
                    data:{
                        "courseid":obj.course_id,
                    },
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            ) .then((schedule) => {
                commit("SET_COURSE_SCHEDULE_TO_STATE",schedule.data);
                console.log(schedule.data)
                return schedule.data
            })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });
        },
        GET_COURSE_STUDENTS({commit},obj){
            console.log(obj);
            return axios(
                {
                    method: "GET",
                    url: "http://127.0.0.1:8000/courses/" + obj.course_id + "/students/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((students) => {
                    console.log("accessed");
                    commit("SET_STUDENTS_TO_STATE", students.data);
                    return students.data
                })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });

        },
        GET_LESSON_ATTENDANCE({commit},obj){
            console.log("get lesson attendance")
            return axios(
                {
                    method: "GET",
                    url: "http://127.0.0.1:8000/lessons/" + obj.lesson_id + "/attendances/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            )
                .then((attendance) => {
                    console.log("accessed");
                    commit("SET_ATTENDACE", attendance.data);
                    return attendance.data
                })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });
        },
        SET_ATTENDANCE({commit},obj){
            console.log("SET ATTENDANCE",obj);
            return axios(
                {
                    method:"POST",
                    url:"http://127.0.0.1:8000/attendances/",
                    withCredentials: true,
                    data:{
                        "lessonid":obj.lessond_id,
                        "studentid":obj.student_id,
                        "exist":obj.exist
                    },
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            ) .then((attendance) => {
                commit("ADD_ATTENDANCE",attendance.data);
                console.log(attendance.data);
                return attendance.data
            })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });
        },
        GET_LESSON_MATERIAL({commit},obj){
            console.log("GET MATERIALS",obj);
            return axios(
                {
                    method:"GET",
                    url:"http://127.0.0.1:8000/lessons/"+obj.lesson_id+"/material/",
                    withCredentials: true,
                    headers: {
                        "content-type": "text/plain",
                        "Authorization": localStorage.userToken
                    }
                }
            ) .then((material) => {
                commit("SET_MATERIAL",material.data);
                console.log(material.data)
                return material.data
            })
                .catch((error) => {
                    console.log(error);
                    return "Ошибка";
                });
        }
    },
    getters:{
        STUDENTS(state){
            return state.students
        },
        STUDENT(state){
            return state.student
        },
        TEACHER(state){
            return state.teacher
        },
        COURSES(state){
            return state.courses
        },
        SCHEDULE(state){
            return state.schedule
        },
        LESSONS(state){
            return state.lessons
        },
        ATTENDANCE(state){
            return state.attendances
        },
        MATERIAL(state){
            return state.material
        },
        COURSE(state){
            return state.course
        }
    }
});
export default store;
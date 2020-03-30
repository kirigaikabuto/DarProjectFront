import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

let store = new Vuex.Store({
    state:{
        students:[],
        student:{},
        teacher:{},
    },
    mutations:{
        SET_STUDENTS_TO_STATE:(state,students)=> {
            state.students = students
        },
        SET_USER_TO_STATE:(state,student)=>{
          state.student = student
        },
        SET_TEACHER_TO_STATE:(state,teacher)=>{
            state.teacher=teacher
        }
    },
    actions:{
        GET_STUDENTS_FROM_API({commit}){
            return axios("http://localhost:8000/students/",{
                method:"GET"
            })
                .then((students)=>{
                    commit("SET_STUDENTS_TO_STATE",students.data);
                    return students
                    })
                .catch((error)=>{
                    console.log(error.data);
                    return error;
                })
        },
        STUDENT_LOGIN({commit},obj){
            console.log(obj);
            return axios(
                {
                    method:"POST",
                    url:"http://localhost:8000/students/login/",
                    data:{
                        "username":obj.username,
                        "password":obj.password
                    },
                    headers:{
                        "content-type":"text/plain"
                    }
                }
            )
                .then((student)=>{
                    console.log(student);
                    commit("SET_USER_TO_STATE",student.data);
                    return student
                })
                .catch((error)=>{
                    console.log(error);
                    return error;
                })
        },
        TEACHER_LOGIN({commit},obj){
            console.log(obj);
            return axios(
                {
                    method:"POST",
                    url:"http://localhost:8000/teachers/login/",
                    data:{
                        "username":obj.username,
                        "password":obj.password
                    },
                    headers:{
                        "content-type":"text/plain"
                    }
                }
            )
                .then((teacher)=>{
                    console.log(teacher);
                    commit("SET_TEACHER_TO_STATE",teacher.data);
                    localStorage.setItem('userToken', teacher.data.token)
                    return teacher
                })
                .catch((error)=>{
                    console.log(error);
                    return error;
                })
        },
        GET_TEACHER_PROFILE({commit}){

            return axios(
                {
                    method:"POST",
                    url:"http://localhost:8000/teachers/profile/",
                    headers:{
                        "Authorization":localStorage.userToken
                    }
                }
            )
                .then((teacher)=>{
                    console.log(teacher);
                    commit("SET_TEACHER_TO_STATE",teacher.data);
                    return teacher
                })
                .catch((error)=>{
                    console.log(error);
                    return error;
                })
        },
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
        }
    }
});
export default store;
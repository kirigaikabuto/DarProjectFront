<template>
    <div class="v-teacher-profile-course-schedule">

        <p style="color:darkslateblue">{{getSchedule}}</p>
        <div v-if="isgetted">
            <div class="v-teacher-profile-course-schedule__btn_add">
            <router-link :to="{name:'vTeacherProfileLessonAddForm',params:{schedule:SCHEDULE}}">
                    <button type="button" class="btn btn-success">Add Lesson</button>
            </router-link>
            </div>
            <table class="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">TimeStart</th>
                    <th scope="col">TimeEnd</th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="lesson in LESSONS" :key="lesson.id">
                    <th scope="row">{{lesson.id}}</th>
                    <th scope="row">{{lesson.name}}</th>
                    <td>{{lesson.date}}</td>
                    <td>{{lesson.timestart}}</td>
                    <td>{{lesson.timeend}}</td>
                    <router-link :to="{name:'vTeacherProfileLessonDetail',params:{lesson:lesson,course:course}}">
                        <td>Edit</td>
                    </router-link>
                </tr>

                </tbody>
            </table>
        </div>
        <div v-else>
            <button @click="createSchedule" class="btn btn-success">
                Create Schedule
            </button>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    export default {
        name: "v-teacher-profile-course-schedule",
        data(){
           return{
               isgetted:true
           }
        },
        props: {
            course: {
                type: Object,
                default() {
                    return {}
                },
            },
        },
        computed:{
            ...mapGetters([
                "SCHEDULE",
                "LESSONS"
            ]),
            getSchedule:function (){
                 console.log(this.GET_COURSES_SCHEDULE({course_id:this.course.id}));

                return this.loadData()
            }
        },
        methods:{
            ...mapActions([
                "GET_COURSES_SCHEDULE",
                "GET_SCHEDULE_LESSONS",
                "CREATE_SCHEDULE"
            ]),
            loadData(){
                return this.GET_COURSES_SCHEDULE({course_id:this.course.id}).then((response)=>{
                    if(response==="Ошибка"){
                        this.isgetted=false
                        console.log("blyaa")
                    }
                    else{
                        this.GET_SCHEDULE_LESSONS({id:this.SCHEDULE.id})
                        return response.data
                    }
                }

                )
            },
            createSchedule(){
                this.CREATE_SCHEDULE({"course_id":this.course.id})
                .then((response)=>{
                    console.log(response);
                    this.$router.push({name:"teacherProfileCourse"})
                })
            }
        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style scoped>

</style>
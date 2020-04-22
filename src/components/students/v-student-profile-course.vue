<template>
    <div class="v-student-profile-course">
        <h1>Course</h1>
        <table class="table table-striped table-dark">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">DateStart</th>
                <th scope="col">DateEnd</th>
                <th scope="col">Teacher</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">{{COURSE.id}}</th>
                <td>{{COURSE.name}}</td>
                <td>{{COURSE.datestart}}</td>
                <td>{{COURSE.dateend}}</td>
                <td>{{TEACHER.firstname}} {{TEACHER.lastname}}</td>
            </tr>

            </tbody>
        </table>
        <h1>Schedule</h1>
        <table class="table table-striped table-dark">
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
                <td>{{lesson.id}}</td>
                <router-link :to="{name:'studentProfileLessonDetail',params:{lesson:lesson}}">
                <td>{{lesson.name}}</td>
                </router-link>
                <td>{{lesson.date}}</td>
                <td>{{lesson.timestart}}</td>
                <td>{{lesson.timeend}}</td>
            </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from "vuex"
    export default {
        name: "v-student-profile-course",
        computed:{
            ...mapGetters([
                "STUDENT",
                "COURSE",
                "TEACHER",
                "SCHEDULE",
                "LESSONS"
            ])
        },
        methods:{
            ...mapActions([
                "GET_STUDENT_COURSE",
                "GET_TEACHER",
                "GET_COURSES_SCHEDULE",
                "GET_STUDENT_PROFILE",
                "GET_SCHEDULE_LESSONS"
            ])
        },
        mounted() {
            this.GET_STUDENT_PROFILE().then((response)=>{
                if(response.data){
                    this.GET_STUDENT_COURSE({"course_id":this.STUDENT.courseid})
                        .then((response)=>{
                            if (response.data) {
                                this.GET_TEACHER({"teacher_id":response.data.teacherid});
                                this.GET_COURSES_SCHEDULE({"course_id":response.data.id})
                                    .then((response)=>{
                                        console.log('GET SCHEDULE',response);
                                        if (response){
                                            this.GET_SCHEDULE_LESSONS({"id":response.id});
                                        }
                                    })
                            }
                        });
                }
            });


        }
    }
</script>

<style scoped>

</style>
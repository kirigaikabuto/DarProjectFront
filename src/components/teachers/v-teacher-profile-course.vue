<template>
    <div class="v-teacher-profile-course">

            <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm v-teacher-profile-course__header">

                <div class="lh-100">
                    <h6 class="mb-0 text-white lh-100">Courses</h6>
                    <small></small>
                </div>
            </div>

        <div class="v-teacher-profile-course__list">
            <div class="my-3 p-3 bg-white rounded shadow-sm">
                <v-teacher-profile-course-item
                        v-for="course in COURSES"
                        :course="course"
                        :key="course.id"

                />

            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from "vuex"
    import vTeacherProfileCourseItem from "./v-teacher-profile-course-item"
    export default {
        name: "v-teacher-profile-course",
        components:{
            vTeacherProfileCourseItem
        },
        computed:{
            ...mapGetters([
                "COURSES"
            ])
        },
        methods:{
            ...mapActions([
                "GET_TEACHER_COURSES"
            ])
        },
        mounted() {
            this.GET_TEACHER_COURSES().then((response)=>{
                if(response.data){
                    console.log("data is getted")
                }
            });
        }
    }
</script>

<style lang="scss">
.v-teacher-profile-course{

    &__list{
        top:10px;
        right: 10px;
        padding: $padding*2;
        border:1px solid #000;
    }
    &__header{
        background-color: darkred;
    }
}
</style>
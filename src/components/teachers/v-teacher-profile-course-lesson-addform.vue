<template>
    <div class="v-teacher-profile-course-lessons-addform">
         <div class="container">
             {{schedule_id}}
        <form v-on:submit.prevent="addLesson">
            <div class="form-group">
                <label for="exampleFormControlInput1">Name</label>
                <input type="text" class="form-control" id="name" v-model="name">
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">DateStart</label>
                <input type="date" class="form-control" id="datestart" v-model="datestart" >
            </div>
            <div class="form-group">
                <label for="exampleFormControlInput1">TimeStart</label>
                <input type="time" class="form-control" id="timestart" v-model="timestart">
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">TimeEnd</label>
                <input type="time" class="form-control" id="timeend" v-model="timeend">
            </div>
            <button class="btn btn-lg btn-primary btn-block" >Add</button>
        </form>
         </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex"
    export default {
        name: "v-teacher-profile-course-lesson-addform",
        data(){
            return{
                name:"",
                datestart:"",
                timestart:"",
                timeend:"",
                schedule_id:this.schedule.id
            }
        },
        props:{
            schedule:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            ...mapActions([
                "LESSON_ADD_FORM"
            ]),
            addLesson(){
                let obj={
                    name:this.name,
                    datestart:this.datestart,
                    timestart:this.timestart,
                    timeend:this.timeend,
                    schedule_id:this.schedule_id
                }
                this.LESSON_ADD_FORM(obj).then((response)=>{
                    this.$router.push({ name: 'teacherProfileCourse' });
                    console.log(response)
                });

            }
        }
    }
</script>

<style scoped>

</style>
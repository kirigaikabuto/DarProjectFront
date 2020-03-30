<template>
    <div class="v-start">
        <div class="v-start__student_btn">
            <router-link :to="{name:'studentLogin'}">
               <div class="v-start__student_login">
                   Student
               </div>
            </router-link>
        </div>
        <div class="v-start__teacher_btn">
            <router-link :to="{name:'teacherLogin'}">
                <div class="v-start__teacher_login">
                    Teacher
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "v-start"
    }
</script>

<style lang="scss">
    .v-start{
        display: flex;


        color: aliceblue;
        font-size: 40px;
        padding: 25%;
        &__student_btn{

            background-color: #2c3e50;
            flex-basis: 50%;
            align-items: center;
            text-align: center;
         }
        &__student_login{
            flex-basis: 50%;
            color: aliceblue;


        }
        &__teacher_btn{
            flex-basis: 50%;
            align-items: center;
            text-align: center;
            background-color: brown;

        }
        &__teacher_login{
            color: aliceblue;
            text-align: center;
        }

    }
</style>
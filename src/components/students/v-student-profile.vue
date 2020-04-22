<template>
    <div class="v-student-profile">
        <vStudentProfileMenu :student="STUDENT"/>
        <keep-alive>
            <router-view>

            </router-view>
        </keep-alive>

    </div>
</template>

<script>
    import {mapGetters,mapActions} from "vuex"
    import vStudentProfileMenu from "./v-student-profile-menu"

    export default {
        name: "v-student-profile",
        components:{
            vStudentProfileMenu,

        },
        computed:{
            ...mapGetters([
                "STUDENT",
            ])
        },
        methods:{
            ...mapActions([
                "GET_STUDENT_PROFILE"
            ])
        },
        mounted() {
            this.GET_STUDENT_PROFILE().then((response)=>{
                if(response.data){
                    console.log("data is getted")
                }
            });
        }
    }
</script>

<style lang="scss">
    .v-student-profile{
        color: aliceblue;

    }
</style>
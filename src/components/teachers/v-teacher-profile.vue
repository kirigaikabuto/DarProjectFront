<template>
    <div class="v-teacher-profile">
    <vTeacherProfileMenu :teacher="TEACHER" />
        <keep-alive>
            <router-view>

            </router-view>
        </keep-alive>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from "vuex"
    import vTeacherProfileMenu from './v-teacher-profile-menu'

    export default {
        name: "v-teacher-profile",
        components:{
            vTeacherProfileMenu,

        },
        computed:{
            ...mapGetters([
                "TEACHER",
            ])
        },
        methods:{
          ...mapActions([
              "GET_TEACHER_PROFILE"
          ])
        },
        mounted() {
            this.GET_TEACHER_PROFILE().then((response)=>{
                if(response.data){
                    console.log("data is getted")
                }
            });
        }
    }
</script>

<style lang="scss">
    .v-teacher-profile{
        color: aliceblue;

    }
</style>
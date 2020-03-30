<template>
    <div class="v-teacher-profile">
        <h1>Profile teacher</h1>
        {{TEACHER}}
    </div>
</template>

<script>
    import {mapGetters,mapActions} from "vuex"

    export default {
        name: "v-teacher-profile",
        computed:{
            ...mapGetters([
                "TEACHER"
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

<style scoped>

</style>
<template>
    <div class="v-student-login">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mt-5 mx-auto">
                    <form v-on:submit.prevent="login" method="post">
                        <h1 class="h3 mb-3 font-weight-normal">Добро пожаловать Стажер</h1>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="username" v-model="username" class="form-control" name="username" placeholder="Enter username">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="password" class="form-control" name="password" placeholder="Enter Password">
                        </div>
                        <button class="btn btn-lg btn-primary btn-block" >Sign in</button>

                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from "vuex"
    import router from "../../router/router";
    export default {
        name: "v-student-login",
        data(){
            return{
                username:'',
                password:''
            }
        },
        computed:{
            ...mapGetters([
                "STUDENTS",
                "STUDENT"
            ])
        },
        methods:{
            ...mapActions([
                "GET_STUDENTS_FROM_API",
                "STUDENT_LOGIN"
            ]),
            login(){

                this.STUDENT_LOGIN({username:this.username,password:this.password}).then((response)=>{
                    if(response.data){
                        console.log("data is getted")
                        router.push("studentProfile")
                    }
                });
            }
        },
        mounted() {
            this.GET_STUDENTS_FROM_API()
                .then((response)=>{
                    if(response){
                        console.log(response);
                    }
                }),
                this.token = localStorage.getItem("userToken")
                if (this.token){
                    router.push("studentProfile")
                }
        }
    }
</script>

<style lang="scss">
.v-student-login{
    color: aliceblue;
    height: 1000px;
    &__login_form{

    }
}
</style>
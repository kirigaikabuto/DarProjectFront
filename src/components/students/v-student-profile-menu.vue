<template>
    <div class="v-student-profile-menu">
        <nav class="navbar navbar-expand-lg navbar-dark v-teacher-profile-menu__element">
            <a class="navbar-brand" href="#">Student Menu</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">

                            <router-link :to="{name:'studentProfile'}">
                                <a class="nav-link" href="#">Home </a>
                            </router-link>
                        </li>
                        <li class="nav-item">

                            <router-link :to="{name:'studentProfileCourse'}">
                                <a class="nav-link" href="#">Course</a>
                            </router-link>

                        </li>

                    </ul>
                </div>
                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <img :src="require('../../assets/images/profile.png')" class="v-teacher-profile-menu__image">
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">{{student.username}}</a>
                        </li>
                        <li>
                            <a class="nav-link" @click="logout">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

    export default {
        name: "v-student-profile-menu",
        props:{
            student:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods:{
            logout () {
                localStorage.removeItem('userToken')
                this.$router.push({name:"studentLogin"})
            }
        }
    }
</script>

<style lang="scss">
    .v-student-profile-menu
    {
        &__element{
            background-color: darkred;
        }
        &__image{
            width: 50px;
            height: 50px;
        }
    }
</style>
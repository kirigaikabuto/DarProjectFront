<template>
    <div class="v-teacher-profile-course-item">
        <div class="media text-muted pt-3">

            <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">

                <router-link :to="{name:'vTeacherProfileCourseDetail',params:{course:course}}">
                <strong class="d-block text-gray-dark">{{course.name}}</strong>
                </router-link>

              {{course.description}}
            </p>
        </div>
    </div>
</template>

<script>

    export default {
        name: "v-teacher-profile-course-item",
        props:{
            course:{
                type:Object,
                default() {
                    return {};
                }
            }
        },


    }
</script>

<style lang="scss">
.v-teacher-profile-course-item{
    text-align: left;
}
</style>
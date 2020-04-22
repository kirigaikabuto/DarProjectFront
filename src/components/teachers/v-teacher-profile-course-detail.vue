<template>
  <div class="v-teacher-profile-course-detail">
    <h1>Course Detail</h1>
    <table class="table table-dark">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Date Start</th>
        <th scope="col">Date End</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">{{course.id}}</th>
        <th scope="row">{{course.name}}</th>
        <td>{{course.description}}</td>
        <td>{{course.datestart}}</td>
        <td>{{course.dateend}}</td>
      </tr>

      </tbody>
    </table>
    <h1>Schedule</h1>
      <v-teacher-profile-course-schedule :course="course" />
  </div>

</template>

<script>
  import vTeacherProfileCourseSchedule from "./v-teacher-profile-course-schedule"
    export default {
        name: "v-teacher-profile-course-detail",
        props: {
          course: {
            type: Object,
            default() {
              return {}
            },
          },
         },
        components:{
          vTeacherProfileCourseSchedule,
        },

    }


</script>

<style lang="scss">
  .v-teacher-profile-course-detail{

  }
</style>
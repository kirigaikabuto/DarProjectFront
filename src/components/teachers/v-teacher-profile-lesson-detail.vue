<template>

    <div class="v-teacher-profile-lesson-detail">
        <h1>Attendance</h1>
            <div v-if="isgetted">
                <table class="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Was</th>

                    </tr>
                    </thead>
                    <tbody >
                       <tr v-for="attendance in ATTENDANCE" :key="attendance.id">
                           <td>{{attendance.studentid}}</td>
                           <td>{{getStudent(attendance.studentid).firstname}} {{getStudent(attendance.studentid).lastname}}</td>
                           <td>{{attendance.exist}}</td>
                       </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <table class="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Attendance</th>

                    </tr>

                    </thead>
                    <tbody>

                    <tr v-for="student in STUDENTS" :key="student.id">
                        <td scope="row">{{student.id}}</td>
                        <td>{{student.firstname}} {{student.lastname}}</td>
                        <td scope="row">
                            <button class="btn btn-success" @click="setAttendance(student,true)">
                                Was
                            </button>
                            <button class="btn btn-warning" @click="setAttendance(student,false)">
                                Not was
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

        <div v-if="ismaterial">

            <table class="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">CodeLink</th>
                    <th scope="col">Description</th>

                </tr>

                </thead>
                <tbody>
                <tr>
                    <td>{{MATERIAL.id}}</td>
                    <td><a :href=MATERIAL.codelink>Ссылка на код</a></td>
                    <td>{{MATERIAL.description}}</td>
                </tr>
                </tbody>
            </table>
            <video-player

                    ref="videoPlayer"
                    class="video-player vjs-custom-skin"
                    :playsinline="false"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
            />
        </div>
        <div v-else>
            <p>No Material</p>
            <router-link :to="{name:'vTeacherProfileMaterialAddFrom',params:{lesson:lesson}}">
            <button class="btn btn-dark">Add Material</button>
            </router-link>
        </div>

    </div>
</template>

<script>
    import {mapActions,mapGetters} from "vuex"
    import axios from "axios";

    export default {
        name: "v-teacher-profile-lesson-detail",

        props:{
            lesson:{
                type:Object,
                default(){
                    return {}
                }
            },
            course:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        computed:{
            ...mapGetters([
                "STUDENTS",
                "ATTENDANCE",
                "MATERIAL"
            ]),
            player() {
                console.log(this.$refs.videoPlayer);
                return this.$refs.videoPlayer.player//Custom Play
            }
        },
        methods:{
            onPlayerPlay (player) {
                console.log('player play!', player)
            },
            onPlayerReady (player) {
                console.log('player ready!', player);
                this.player.play()
            },
            playVideo: function (source) {
                const video = {
                    withCredentials: false,
                    type: 'application/x-mpegurl',
                    src: source
                }
                this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
                this.player.src(video)
                // this.player.load()
                this.player.play()
            },
            ...mapActions([
                "GET_COURSE_STUDENTS",
                "GET_LESSON_ATTENDANCE",
                "SET_ATTENDANCE",
                "GET_LESSON_MATERIAL",
            ]),
            setAttendance(student,exist){
                let obj={
                    lessond_id:this.lesson.id,
                    student_id:student.id,
                    exist:exist
                };
                this.SET_ATTENDANCE(obj)
            },
            getStudent:function (student_id) {
                return this.STUDENTS.find(student=>student.id=student_id)
            },
            startVideo(){
                return axios(
                    {
                        method:"GET",
                        url:"http://127.0.0.1:8000/lessons/"+this.lesson.id+"/material/",
                        withCredentials: true,
                        headers: {
                            "content-type": "text/plain",
                            "Authorization": localStorage.userToken
                        }
                    }
                ) .then((material) => {
                    console.log(material.data);
                    const src = 'http://127.0.0.1:8000/materials/'+material.data.id+'/stream/';
                    console.log(src);
                    this.playVideo(src);
                    return material.data
                })
                    .catch((error) => {
                        console.log(error);
                        return "Ошибка";
                    });
            }
        },
        data(){
            return{
                isgetted:true,
                ismaterial:true,
                playerOptions: {

                    autoplay: false, // If true, the browser starts playback when it's ready.
                    muted: false, // Any audio will be removed by default.
                    loop: false, // Cause the video to start again as soon as it's over.
                    preload: 'auto', // It is suggested that browsers should start downloading video data after loading elements in <video>. auto browser chooses the best behavior and immediately starts loading videos (if browser supports it)
                    language: 'zh-CN',
                    aspectRatio: '16:9', // Place the player in fluent mode and use this value when calculating the dynamic size of the player. Values should represent a ratio - two numbers separated by colons (e.g. "16:9" or "4:3")
                    fluid: true, // When true, Video.js player will have the fluid size. In other words, it will scale to suit its container.
                    sources: [
                        {
                            type: 'application/x-mpegURL', // There are many kinds of support here: basic video format, live broadcast, streaming media, etc. See git Web site Project specifically.
                            src: 'http://127.0.0.1:8000/materials/5/stream/'//url address, from the point of view of other bloggers, can be personally tested.
                        }
                    ],
                    hls: true,
                    poster: 'data:image/jpeg;base64,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', //your cover address
                    width:500, // Player width
                    notSupportedMessage: 'This video cannot be played for the time being. Please try again later.', // Allows overwriting of default information displayed when Video.js cannot play the media source.
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true // Full screen button
                    }
                },
            }
        },
        mounted() {
            this.GET_COURSE_STUDENTS({"course_id":this.course.id});
            this.GET_LESSON_ATTENDANCE({"lesson_id":this.lesson.id})
                .then((response)=> {
                    console.log("ERRRORROR",response);
                    if (response === null){
                        this.isgetted = false
                    }
                });
            this.GET_LESSON_MATERIAL({lesson_id:this.lesson.id})
                .then((response)=> {
                    console.log("ERRRORROR MATERAIL",response);
                    if (response === "Ошибка"){
                        this.ismaterial = false
                    }
                });
            this.startVideo()
        }
    }
</script>

<style scoped>
    .player {
        position: absolute !important;
        width: 100%;
        height: 60%;
    }
    .vjs-custom-skin {
        height: 60% !important;
    }

    .vjs-custom-skin /deep/ .video-js {
        height: 60%;
    }
</style>
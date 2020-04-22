<template>

    <div class="v-teacher-profile-material-addform">
        <div class="container">

                <div class="form-group">
                    <label for="exampleFormControlInput1">CodeLink</label>
                    <input type="text" class="form-control" v-model="codelink">
                </div>
                <div class="form-group">

                    <input type="file" class="form-control" id="file" ref="file" v-on:change="handleFileUpload()"/>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1" >Description</label>
                   <textarea name="description" v-model="description">

                   </textarea>
                </div>
                <button v-on:click="submitFile()">Submit</button>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {

        name: "v-teacher-profile-material-addform",
        data(){
            return {
                file: '',
                description:'',
                codelink:'',

            }
        },
        props:{
            lesson:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        methods: {
            submitFile(){
                let formData = new FormData();
                formData.append('video', this.file);
                formData.append('codelink', this.codelink);
                formData.append('description', this.description);
                formData.append("lessonid",this.lesson.id);
                formData.append("lessonname",this.lesson.name);

                axios.post( 'http://127.0.0.1:8000/materials/',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function(){
                    console.log('SUCCESS!!');
                    this.$router.push({ name: 'teacherProfileCourse' });
                })
                    .catch(function(){
                        console.log('FAILURE!!');
                        this.$router.push({ name: 'teacherProfileCourse' });
                    });
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }
        }
    }
</script>

<style scoped>

</style>
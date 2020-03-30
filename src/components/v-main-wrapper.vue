<template>
    <div class="v-main-wrapper">
        <keep-alive>
            <router-view>

            </router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        name: "v-main-wrapper"
    }
</script>

<style scoped>
.v-main-wrapper{

    margin:0 auto;

}
</style>
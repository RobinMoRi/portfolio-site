<script setup lang="ts">
import Image from 'primevue/image';
</script>

<template>

        <div id="intro-section" class="flex justify-content-center flex-wrap m-4">
            <!-- <Image src="/robin.png" alt="Picture of Robin" width="300" class="m-2" /> -->
            <div id="title-group" class="flex flex-column align-items-center justify-content-center">
                <p class="name-title my-2">ROBIN MORENO RINDING</p>
                <p class="p-text-secondary">Fullstack Developer | Tech Enthusiast | Lifelong Learner</p>
                <div class="image mt-2">
                    <Image  src="/robin.png" width="250"/>
                </div>
                </div>
        </div>
    
</template>

<style>
.name-title{
    font-family: "Inter";
    letter-spacing: 2px;
    font-size: 64px;
}
.image{
    clip-path: circle();
}
</style>
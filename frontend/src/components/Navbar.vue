<template>
    <div class="bg-blue-600 p-4 text-white">
        <h1 class="text-lg">ByteLock DevOps</h1>
        <div class="mt-2">
            <router-link to="/" class="text-white px-4">Home</router-link>
            <router-link to="/messages" class="text-white px-4"
                >Messages</router-link
            >
        </div>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
};
</script>

<style scoped>
/* Customize navbar styles */
</style>

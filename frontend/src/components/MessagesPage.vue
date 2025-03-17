<template>
    <div class="container mx-auto p-4">
        <h2 class="text-xl">Saved Messages</h2>
        <div v-if="userLoggedIn">
            <div
                v-for="(message, index) in myMessages"
                :key="index"
                class="flex justify-between items-center"
            >
                <span>{{ message }}</span>
                <button
                    @click="deleteMessage(index)"
                    class="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Delete
                </button>
            </div>
        </div>

        <div v-else>
            <h3>Universal Messages</h3>
            <div v-for="(message, index) in universalMessages" :key="index">
                <span>{{ message }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userLoggedIn: false,
            myMessages: ['My Encoded Message 1', 'My Encoded Message 2'],
            universalMessages: [
                'Universal Encoded Message 1',
                'Universal Encoded Message 2',
            ],
        };
    },
    methods: {
        deleteMessage(index) {
            this.myMessages.splice(index, 1);
        },
    },
};
</script>

<style scoped>
/* Customize message styles */
</style>

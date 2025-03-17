<template>
    <div id="app">
        <h1 class="text-3xl font-bold text-blue-600">
            ByteLock DevOps - Dashboard
        </h1>
        <p class="mt-2 text-lg">Connecting frontend with backend...</p>

        <button
            @click="fetchData"
            :disabled="loading"
            class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
            {{ loading ? 'Fetching...' : 'Fetch Data from Backend' }}
        </button>

        <!-- Loading Spinner -->
        <div v-if="loading" class="loader mt-4 text-xl text-yellow-600">
            ⏳ Loading...
        </div>

        <!-- Error Message -->
        <div v-if="error" class="error mt-4 text-lg text-red-600">
            ❌ Error: {{ error }}
        </div>

        <!-- Backend Response -->
        <div
            v-if="data"
            class="response mt-6 p-4 bg-white rounded-lg shadow-md"
        >
            <h3 class="text-2xl font-semibold">Response from Backend:</h3>
            <pre class="mt-2 text-left text-sm">{{ data }}</pre>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            data: null,
            loading: false,
            error: null,
        };
    },
    methods: {
        async fetchData() {
            this.loading = true;
            this.error = null;
            this.data = null;

            try {
                const response = await axios.get(
                    'http://localhost:5000/api/data'
                ); // Backend API URL
                this.data = response.data;
            } catch (error) {
                if (error.response) {
                    // Error response from the server
                    this.error =
                        error.response.data.message ||
                        'Failed to connect to backend';
                } else if (error.request) {
                    // Request made but no response
                    this.error = 'No response received from the backend';
                } else {
                    // General errors
                    this.error =
                        'An error occurred while setting up the request';
                }
                console.error('Error fetching data:', error);
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
#app {
    font-family: 'Arial', sans-serif;
    text-align: center;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 50px auto;
}

button {
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

.loader {
    font-size: 18px;
    color: #ff9800;
}

.error {
    font-weight: bold;
}

.response {
    white-space: pre-wrap; /* Allows long text to wrap nicely */
    word-wrap: break-word;
}
</style>

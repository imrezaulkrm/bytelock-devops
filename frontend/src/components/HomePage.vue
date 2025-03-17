<template>
    <div id="app" class="flex justify-center items-center h-screen bg-gray-100">
        <div
            class="container p-4 bg-white rounded-lg shadow-lg w-4/5 max-w-4xl"
        >
            <h1 class="text-3xl font-semibold text-center mb-6">
                ByteLock DevOps - Dashboard
            </h1>

            <div class="mb-6">
                <h3 class="text-xl font-semibold">Encode Message</h3>
                <textarea
                    v-model="encodedMessage"
                    placeholder="Enter message to encode"
                    class="w-full p-2 border rounded-md mb-4"
                ></textarea>
                <button
                    @click="encodeMessage"
                    :disabled="loading"
                    class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {{ loading ? 'Encoding...' : 'Encode Message' }}
                </button>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold">Decode Message</h3>
                <textarea
                    v-model="decodedMessage"
                    placeholder="Enter encoded message"
                    class="w-full p-2 border rounded-md mb-4"
                ></textarea>
                <button
                    @click="decodeMessage"
                    :disabled="loading"
                    class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
                >
                    {{ loading ? 'Decoding...' : 'Decode Message' }}
                </button>
            </div>

            <div v-if="messages.length" class="mt-6">
                <h3 class="text-xl font-semibold">Messages</h3>
                <ul>
                    <li
                        v-for="message in messages"
                        :key="message._id"
                        class="border p-2 mb-2 bg-gray-100 rounded"
                    >
                        {{ message.content }}
                        <button
                            @click="deleteMessage(message._id)"
                            class="ml-4 text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                </ul>
            </div>

            <div v-if="error" class="text-center mt-4 text-red-500">
                ❌ Error: {{ error }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            encodedMessage: '',
            decodedMessage: '',
            messages: [],
            loading: false,
            error: null,
        };
    },
    methods: {
        async encodeMessage() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/encode',
                    {
                        message: this.encodedMessage,
                    }
                );
                this.encodedMessage = response.data.encodedMessage; // Update with encoded message
                console.log('Encoded message:', response.data.encodedMessage);
            } catch (error) {
                this.error = 'Failed to encode message.';
                console.error('Error encoding message:', error);
            } finally {
                this.loading = false;
            }
        },

        async decodeMessage() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/decode',
                    {
                        encodedMessage: this.decodedMessage,
                    }
                );
                this.decodedMessage = response.data.decodedMessage; // Update with decoded message
                console.log('Decoded message:', response.data.decodedMessage);
            } catch (error) {
                this.error = 'Failed to decode message.';
                console.error('Error decoding message:', error);
            } finally {
                this.loading = false;
            }
        },

        async getMessages() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get('http://localhost:5000/api/');
                this.messages = response.data; // Set the messages to the response data
            } catch (error) {
                this.error = 'Failed to fetch messages.';
                console.error('Error fetching messages:', error);
            } finally {
                this.loading = false;
            }
        },

        async deleteMessage(id) {
            this.loading = true;
            this.error = null;
            try {
                await axios.delete(`http://localhost:5000/api/${id}`);
                this.messages = this.messages.filter(
                    (message) => message._id !== id
                ); // Remove the deleted message from the list
                console.log('Message deleted');
            } catch (error) {
                this.error = 'Failed to delete message.';
                console.error('Error deleting message:', error);
            } finally {
                this.loading = false;
            }
        },
    },
    created() {
        this.getMessages(); // Fetch the messages when the page loads
    },
};
</script>

<style scoped>
#app {
    font-family: Arial, sans-serif;
}

button:disabled {
    cursor: not-allowed;
}

pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}

textarea {
    font-size: 14px;
}
</style>

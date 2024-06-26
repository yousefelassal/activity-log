const axios = require('axios');

class InstaLog {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.baseUrl = 'http://localhost:3000/api';
    }

    async createEvent(eventObject) {
        try {
            const response = await axios.post(`${this.baseUrl}/events`, eventObject, {
                headers: {
                    'Authorization': `Bearer ${this.secretKey}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async listEvents(params = {}) {
        try {
            const response = await axios.get(`${this.baseUrl}/events`, {
                headers: {
                    'Authorization': `Bearer ${this.secretKey}`,
                },
                params
            });
            return response.data;
        } catch (error) {
            console.error('Error listing events:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

module.exports = InstaLog;
import { GoogleGenerativeAI } from '@google/generative-ai';

const STORAGE_KEY = 'gemini_api_key';

export const getApiKey = () => {
    return localStorage.getItem(STORAGE_KEY) || import.meta.env.VITE_GEMINI_API_KEY;
};

export const setApiKey = (key) => {
    localStorage.setItem(STORAGE_KEY, key);
};

export const clearApiKey = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const hasApiKey = () => {
    return !!getApiKey();
};

export const initializeGemini = () => {
    const apiKey = getApiKey();
    if (!apiKey) {
        return null;
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        return genAI.getGenerativeModel({ model: 'gemini-pro' });
    } catch (error) {
        console.error('Failed to initialize Gemini:', error);
        return null;
    }
};

export const testApiKey = async (apiKey) => {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        // Simple test prompt
        const result = await model.generateContent('Hello');
        const response = await result.response;
        const text = response.text();

        return { success: true, message: 'API key is valid!' };
    } catch (error) {
        return { success: false, message: error.message || 'Invalid API key' };
    }
};

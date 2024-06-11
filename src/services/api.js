import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/v1';
const APPLICATIONS_ENDPOINT = `${BASE_URL}/application`;
const TRANSLATIONS_ENDPOINT = `${BASE_URL}/translation`;

export const getApps = async () => {
    const response = await axios.get(APPLICATIONS_ENDPOINT);
    return response.data;
};

export const addApp = async (appName) => {
    const response = await axios.post(APPLICATIONS_ENDPOINT, { name: appName });
    return response.data;
};

export const deployApp = async (id) => {
    await axios.post(`${APPLICATIONS_ENDPOINT}/${id}/deploy`);
};



export const downloadApp = async (id) => {
    try {
        const response = await axios.get(`${APPLICATIONS_ENDPOINT}/${id}/download`, {
            responseType: 'blob', // Important to handle binary data
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'application.xlsx'); // or any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading the application:', error);
    }
};

export const addTranslation = async ({ appId, translation }) => {
    const response = await axios.post(`${TRANSLATIONS_ENDPOINT}/${appId}`, translation);
    return response.data;
};
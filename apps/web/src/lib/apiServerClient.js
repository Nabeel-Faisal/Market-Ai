export const API_SERVER_URL = import.meta.env.VITE_MAIL_API_URL || '/hcgi/api';

const apiServerClient = {
    fetch: async (url, options = {}) => {
        return await window.fetch(API_SERVER_URL + url, options);
    }
};

export default apiServerClient;

export { apiServerClient };

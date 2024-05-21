import ky from "ky";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const baseApi = ky.create({ prefixUrl: baseUrl });

export default baseApi;

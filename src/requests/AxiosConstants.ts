const hostname = (import.meta.env.VITE_API_URL ?? '/').replace(/\/?$/, '/');

export const getTempEndpoint = (sensorId: number): string =>
    `${hostname}temp${sensorId}.txt`;

export const getTempsEndpoint = (sensorId: number): string =>
    `${hostname}temps${sensorId}.txt`;

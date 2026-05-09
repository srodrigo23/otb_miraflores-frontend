
const config = {
  frontURL_PROD: import.meta.env.VITE_BACKEND_URL_PROD,
  frontURL_DEV: import.meta.env.VITE_BACKEND_URL_DEV,
  production:import.meta.env.VITE_PROD,
}

export const apiLink = `${JSON.parse(config.production)?config.frontURL_PROD:config.frontURL_DEV}`;
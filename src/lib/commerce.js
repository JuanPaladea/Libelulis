import Commerce from '@chec/commerce.js';

const checAPIKey = import.meta.env.VITE_CHEC_PUBLIC_KEY;
const devEnvironment = import.meta.env.MODE === 'development';

const commerceConfig = {
  axiosConfig: {
    headers: {
      'X-Chec-Agent': 'commerce.js/v2',
      'Chec-Version': '2021-09-29',
    },
  },
};

if (devEnvironment && !checAPIKey) {
  console.error('Your public API key must be provided as an environment variable named REACT_APP_CHEC_PUBLIC_KEY.');
  throw new Error('Your public API key must be provided as an environment variable named REACT_APP_CHEC_PUBLIC_KEY.');
}

const commerce = new Commerce("pk_55544b5e189d988d4cba839c97ab1422e363254f8e50d", devEnvironment, commerceConfig);

export default commerce;
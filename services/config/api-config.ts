export const CONSTANTS = {
  API_BASE_URL: 'https://stag-shilpiantique.8848digitalerp.com',

  // Production Backend URL
  // API_BASE_URL: 'https://prod-shilpiantique.8848digitalerp.com',
};

export const headerGenerator = (token: any) => {
  const API_CONFIG = {
    headers: {
      Accept: 'application/json',
      Authorization: token,
    },
  };
  return API_CONFIG;
};

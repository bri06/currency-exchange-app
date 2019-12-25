/* eslint-disable import/prefer-default-export */
const URL = 'https://api.coincap.io/v2';

export const getAssets = () => fetch(`${URL}/assets?limit=20`)
  .then(res => res.json())
  .then(({ data }) => data);

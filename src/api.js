/* eslint-disable import/prefer-default-export */
const URL = 'https://api.coincap.io/v2';

export const getAssets = () => fetch(`${URL}/assets?limit=20`)
  .then(res => res.json())
  .then(({ data }) => data);

export const getAsset = id => fetch(`${URL}/assets/${id}`)
  .then(res => res.json())
  .then(({ data }) => data);

export const getAssetHistory = (coin) => {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1);
  const start = now.getTime();
  return fetch(`${URL}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
    .then(res => res.json())
    .then(({ data }) => data);
};

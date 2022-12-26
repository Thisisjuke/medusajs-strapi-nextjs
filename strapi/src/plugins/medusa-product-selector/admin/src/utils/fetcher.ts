import {request} from '@strapi/helper-plugin'

export const fetcher = ([url, params = {}]) => {
  const fetchParams = new URLSearchParams();

  Object.keys(params).forEach(key => {
    if(params[key] && params[key] !== "") fetchParams.set(key, params[key]);
  });

  return request(`${url}?${fetchParams.toString()}`).then(data => data);
}

export const get = (url, retries=4) => {
  return fetch(url, {
    method: "GET"
  })
    .then(response => {
      if (response.ok) return response.json()
      if (retries > 0) {
        return get(url, retries - 1)
      } else {
        throw new Error(url)
      }
    })
    .then(res => res);
};

export const post = (url, data, retries = 4) => {
  let headers = {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json"
  };

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) return response.json()
      if (retries > 0) {
        return post(url, data, retries - 1)
      } else {
        throw new Error(url)
      }
    })
    .then(res => res);
};

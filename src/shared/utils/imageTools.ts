

export const checkImageURL = async (url: string | null) => {
  if(!url) return false
  return await fetch(url)
    .then(res => {
      if (res.status === 404) {
        return false;
      } else {
        return true;
      }
    })
    .catch(err => {
      return false;
    });
};
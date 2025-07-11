/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable handle-callback-err */
import ReactNativeBlobUtil from 'react-native-blob-util';
import { warn } from './log';

export const checkImageURL = async (url: string | null) => {
  if (!url) return false
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

export const urlToBase64 = async (url: string | null) => {
  if (!url) return { success: false }
  var extension = url.split('.').pop();
  return await ReactNativeBlobUtil.fetch('GET', url)
    .then(async res => {
      let status = res.info().status;

      if (status === 200) {
        let base64Str = await res.base64();

        const mime =
          extension === 'jpg' || extension === 'jpeg'
            ? 'jpeg'
            : extension === 'svg'
              ? 'svg'
              : 'png';
        return {
          base64Str: base64Str,
          mimeType: 'image/' + mime,
          success: true,
        };
      } else {
        // handle other status codes
        return {
          status: status,
          success: false,
        };
      }
    }).catch((reason) => {
      warn("base 64 issue  => ", reason)
      return {
        status: reason,
        success: false,
      };
    })
}
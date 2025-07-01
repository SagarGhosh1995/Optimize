import { formatError } from './formatError';
import { formatSuccess } from './formatSuccess';
import api from './index';

const get = async <T>(url: string, config = {}) => {
    return await api.get<T>(url, config).then(res => {
        return formatSuccess(res)
    }).catch(err => {
        return formatError(err)
    })

};

const post = async <T>(url: string, data = {}, config = {}) => {
    return await api.post<T>(url, data, config).then(res => {
        return formatSuccess(res)
    }).catch(err => {
        return formatError(err)
    })
};

export default {
    get,
    post,
};

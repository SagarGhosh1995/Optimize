
export const API_ERROR = 'API_ERROR'
export const DATA_FORMAT_ERROR = 'DATA_FORMAT_ERROR'

export const log = (title = '', data?: any) => {
    if (__DEV__) {
        console.log(title, data ?? '')
    }
}

export const warn = (title = '', data?: any) => {
    if (__DEV__) {
        console.warn(title, data)
    }
}
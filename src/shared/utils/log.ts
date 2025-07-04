
export const log = (title='', data?: any) => {
    if (__DEV__) {
        console.log(title, data ?? '')
    }
}

export const warn = (title='', data?: any) => {
    console.warn(title, data)
}
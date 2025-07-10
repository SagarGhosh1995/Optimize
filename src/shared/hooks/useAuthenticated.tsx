import React from 'react'
import { useAppSelector } from '../../globalRedux/useTypedHooks';

const useAuthenticated = () => {

    const auth = useAppSelector((state) => state.auth.authdata);
    const isAuthenticated = !!auth?.access_token;

    return isAuthenticated

}

export default useAuthenticated
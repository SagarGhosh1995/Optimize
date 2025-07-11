
import React from 'react'
import { useStoreId } from '../../globalContext/hooks'
import { genxPersistor } from '../../stores/genx/redux/store'

export const useReduxPersistorStore = () => {

    const storeId: string = useStoreId()

    if (storeId === 'genx') {
        return genxPersistor
    } else {
        return genxPersistor
    }
}

// export useReduxPersistorStore
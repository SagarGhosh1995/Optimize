
import React, { FC, useEffect } from 'react'
import HomeCms from './home/HomeCms'
import ProductCms from './product/ProductCms'
import { log } from '../utils/log'

interface CMSInterface {
    data?: Array<any>,
    type?: 'home' | 'product'
}

const CMS: FC<CMSInterface> = ({
    data,
    type = 'home'
}) => {

    useEffect(() => {
        log('CMS component rendered')
    }, [])

    if (!data?.length) return null
    return type === 'home' ? (
        <HomeCms data={data} />
    ) : (
        <ProductCms data={data} />
    );
}

export default React.memo(CMS)

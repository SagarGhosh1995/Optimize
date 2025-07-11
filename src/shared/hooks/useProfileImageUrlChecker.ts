/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { images } from '../constants/images'
import { checkImageURL } from '../utils/imageTools'
import { useAppSelector } from '../../globalRedux/useTypedHooks'

const useProfileImageUrlChecker = () => {
    const userdata = useAppSelector((state) => state?.user?.user)
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        const checkProfileImageUrl = async () => {
            const res = await checkImageURL(userdata?.avatar ?? null)
            if (res) {
                setImage(userdata?.avatar ?? null)
            } else {
                setImage(images.emptydp)
            }
        }
        checkProfileImageUrl()
    }, [userdata?.avatar])

    if (!image) return images.emptydp

    return image
}

export default useProfileImageUrlChecker
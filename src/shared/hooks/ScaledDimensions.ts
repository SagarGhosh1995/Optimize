import { useWindowDimensions } from "react-native"


export const ScaledDimensions = () => {
    const dimensions = useWindowDimensions()

    return dimensions
}
import { useWindowDimensions } from "react-native"


export const useScaledDimensions = () => {
    const dimensions = useWindowDimensions()

    return dimensions
}
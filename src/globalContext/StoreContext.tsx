import { createContext, ReactNode, useState } from "react";

// Define types
export type StoreIds = 'genx' | 'prebook';

interface ContextType {
    storeId: StoreIds;
    setStoreId: (id: StoreIds) => void;
}

export const StoreContext = createContext<ContextType | null>(null);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
    const [storeId, setStoreId] = useState<StoreIds>('genx');
    return (
        <StoreContext.Provider value={{ storeId, setStoreId }}>
            {children}
        </StoreContext.Provider>
    )
}
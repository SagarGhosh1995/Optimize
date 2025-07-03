import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../shared/theme";
import { Appearance, ColorSchemeName } from "react-native";
import { STORAGE_KEY } from "../shared/constants/static";
import { storage } from "../shared/utils/storage";

// Define types
type ThemeMode = 'light' | 'dark';
type Theme = typeof lightTheme;

interface ThemeContextType {
    theme: Theme;
    mode: ThemeMode;
    toggleTheme: () => void;
    setThemeMode: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    // Load theme from storage or system on first mount
    useEffect(() => {
        const initTheme = async () => {
            const storedMode = await storage.getItem(STORAGE_KEY);
            if (storedMode === 'light' || storedMode === 'dark') {
                setMode(storedMode);
            } else {
                const systemMode: ColorSchemeName = Appearance.getColorScheme();
                if (systemMode === 'dark' || systemMode === 'light') {
                    setMode(systemMode);
                }
            }
        };
        initTheme();
    }, []);

    // Watch system theme changes only if no manual override
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            storage.getItem(STORAGE_KEY).then((storedMode) => {
                if (!storedMode && (colorScheme === 'dark' || colorScheme === 'light')) {
                    setMode(colorScheme);
                }
            });
        });

        return () => subscription.remove();
    }, []);

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const setThemeMode = async (newMode: ThemeMode) => {
        setMode(newMode);
        await storage.setItem(STORAGE_KEY, newMode);
    };

    const toggleTheme = async () => {
        const newMode: ThemeMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        await storage.setItem(STORAGE_KEY, newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, mode, toggleTheme, setThemeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}
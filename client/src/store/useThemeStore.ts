import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
    const storedTheme = (localStorage.getItem('theme-preference') as Theme) || 'light';

    if (storedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    return {
        theme: storedTheme,
        toggleTheme: () => set((state) => {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';

            localStorage.setItem('theme-preference', newTheme);
            
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }

            return { theme: newTheme };
        }),
    };
});
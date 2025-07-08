import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface ThemeState {
    isDarkMode: boolean
}

// Check for saved theme preference or default to light mode
const initialState: ThemeState = {
    isDarkMode: localStorage.getItem('theme') === 'dark' || false,
}

export const themeState = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode
            localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light')
            // Update the HTML class to trigger dark mode
            if (state.isDarkMode) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        },
        setTheme: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload
            localStorage.setItem('theme', action.payload ? 'dark' : 'light')
            // Update the HTML class to trigger dark mode
            if (action.payload) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        },
    },
})

export const { toggleTheme, setTheme } = themeState.actions

export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode

export default themeState.reducer
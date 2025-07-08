import React from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { toggleTheme, selectIsDarkMode } from '../redux/slices/ThemeState'

interface ThemeToggleProps {
    className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
    const dispatch = useAppDispatch()
    const isDarkMode = useAppSelector(selectIsDarkMode)

    const handleToggle = () => {
        dispatch(toggleTheme())
    }

    return (
        <button
            onClick={handleToggle}
            className={`p-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                       bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                       hover:bg-gray-100 dark:hover:bg-gray-700 
                       transition-colors duration-200 ${className}`}
            aria-label="Toggle theme"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? (
                <SunIcon className="w-5 h-5" />
            ) : (
                <MoonIcon className="w-5 h-5" />
            )}
        </button>
    )
}

export default ThemeToggle
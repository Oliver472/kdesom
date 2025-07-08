import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ThemeToggle from '../components/ThemeToggle';
import themeStateReducer from '../redux/slices/ThemeState';

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      theme: themeStateReducer,
    },
    preloadedState: {
      theme: { isDarkMode: false },
      ...initialState,
    },
  });
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders theme toggle button', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    const button = screen.getByLabelText('Toggle theme');
    expect(button).toBeInTheDocument();
  });

  test('toggles theme on button click', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    const button = screen.getByLabelText('Toggle theme');
    
    // Initially should show moon icon (light mode)
    expect(button).toHaveAttribute('title', 'Switch to dark mode');
    
    // Click to toggle to dark mode
    fireEvent.click(button);
    
    // Should now show sun icon (dark mode)
    expect(button).toHaveAttribute('title', 'Switch to light mode');
  });

  test('persists theme preference in localStorage', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <ThemeToggle />
      </Provider>
    );

    const button = screen.getByLabelText('Toggle theme');
    
    // Click to toggle to dark mode
    fireEvent.click(button);
    
    // Should persist in localStorage
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
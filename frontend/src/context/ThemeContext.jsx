import React, { createContext, useState, useEffect } from 'react';
import { themes } from '../config/colorthemes';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.default);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const response = await axios.get(`${backendUrl}/display/`);
                const theme = response.data.colortheme;
                setTheme(themes[theme]);

            } catch (error) {
                console.error('Error fetching styles:', error);
            }
        };

        fetchTheme();
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );

}

export { ThemeContext, ThemeProvider }    
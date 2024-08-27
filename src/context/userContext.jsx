import React, { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const loadUserFromStorage = () => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    };
    const [user, setUser] = useState(loadUserFromStorage);

    const updateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    // Use effect to sync state with localStorage whenever the user state changes
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);


    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to access the user from context
export const useUser = () => useContext(UserContext);
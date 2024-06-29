"use client";

import React, { useEffect } from 'react';

const LogoutPage = () => {
    useEffect(() => {
        // Clear all local storage data
        localStorage.clear();

        // Redirect to the root URL
        window.location.href = "/";
    }, []);

    return null; // or you can return a message or a loading spinner if needed
};

export default LogoutPage;
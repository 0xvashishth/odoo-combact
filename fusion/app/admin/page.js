"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
    const { push } = useRouter();
    useEffect(()=>{
        if (!localStorage.getItem("admin") || !localStorage.getItem("adminToken")) {
            push("/admin/login");
        } else {
            push("/admin/dashboard");
        }
    }, [])
    return (
        <div className="bg-gray-100 min-h-screen">
            <nav className="bg-white shadow-lg">
                Here is the nav
            </nav>
            <div className="container mx-auto py-8">
                {/* Dashboard content */}
            </div>
        </div>
    );
};

export default AdminDashboard;
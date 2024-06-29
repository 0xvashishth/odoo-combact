import React from 'react';

const DashboardPage = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <div className="p-4 bg-white rounded shadow">
                <h2 className="text-lg font-bold mb-4">Welcome, Admin!</h2>
                <p className="text-gray-600">This is your admin dashboard. You can customize it by adding your own content here.</p>
                <div className="mt-4">
                    <h3 className="text-md font-bold mb-2">Recent Activity</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center">
                            <span className="bg-green-500 rounded-full h-2 w-2 mr-2"></span>
                            <span className="text-gray-600">User registration</span>
                        </li>
                        <li className="flex items-center">
                            <span className="bg-blue-500 rounded-full h-2 w-2 mr-2"></span>
                            <span className="text-gray-600">Product added</span>
                        </li>
                        <li className="flex items-center">
                            <span className="bg-yellow-500 rounded-full h-2 w-2 mr-2"></span>
                            <span className="text-gray-600">Order placed</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
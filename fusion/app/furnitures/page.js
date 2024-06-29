
"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const FurnitureListing = () => {
    const isLoggedIn = localStorage.getItem('user') !== null;
    const [furnitureData, setFurnitureData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8082/api/v1/furniture')
            .then(response => response.json())
            .then(data => {
                setFurnitureData(data.furniture);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching furniture data:', error);
                setIsLoading(false);
            });
    }, []);

    const handleBooking = (furnitureName) => {
        console.log(`Booking for ${furnitureName}`);
        // Implement booking logic here
    };

    return (
        <div>
            <div className="text-3xl">
                Furniture Listing...
            </div>
            <Link className="btn" href="/">Back to Home</Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                furnitureData.map((item, index) => (
                        <div key={index} className="card bg-base-100 w-96 shadow-xl">
                        <figure className="px-10 pt-10">
                          <img
                            src={item.imageUrls[0]} alt={item.name}
                            className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                          <h2 className="card-title">{item.name}</h2>
                          <p>{item.description}</p>
                          <p>PRICE: {item.rentalPrice}</p>
                          <div className="card-actions">
                          {isLoggedIn && (
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary" onClick={() => handleBooking(item.name)}>
                                        Book
                                    </button>
                                </div>
                            )}
                          </div>
                        </div>
                      </div>
                ))
            )}
        </div>
        </div>
    );
};

export default FurnitureListing;

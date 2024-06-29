"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const FurnitureDetailsPage = () => {
    const { id } = useParams();
    const [furniture, setFurniture] = useState({
        name: "",
        description: "",
        imageUrls: [""],
        rentalPrice: ""
    });
    useEffect(()=>{
        if (!localStorage.getItem("admin") || !localStorage.getItem("adminToken")) {
            push("/admin/login");
        }
    }, [])

    const fetchFurniture = async () => {
        // setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8082/api/v1/furniture/${id}`);
          setFurniture(response.data.furniture);
        } catch (error) {
          console.error("Failed to fetch furniture:", error);
        } finally {
        //   setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchFurniture();
      }, []);

    // Fetch furniture details based on the id

    const handleEdit = () => {
        // Logic for editing furniture details
    };

    const handleDelete = () => {
        // Logic for deleting furniture
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between items-center mb-4">
                <Link href="/admin/dashboard">Back to Dashboard</Link>
                <h1 className="text-2xl font-bold">Furniture Details</h1>
                <div>
                    <button
                        className="tn  btn rounded mr-2"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-warning rounded"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <img
                    src={furniture.imageUrls[0]}
                    alt="Furniture Header"
                    className="w-full max-w-lg mb-4"
                />
                <h2 className="text-xl font-bold mt-1">{furniture.name}</h2>
                <p className="text-gray-600 mt-2">{furniture.description}</p>
                <p className="text-gray-600 mt-2">PRICE: {furniture.rentalPrice}</p>
            </div>
        </div>
    );
};

export default FurnitureDetailsPage;
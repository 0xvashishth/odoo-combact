"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";


export default function CreateFurnitureForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Uploading image to cloudinary..");
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("file", image);
    });
    formData.append("upload_preset", "dlenztzu"); // Replace 'unsigned_preset' with your actual unsigned preset name
    formData.append("folder", "uploadtofurniture"); // Replace 'furniture_images' with the desired folder name on Cloudinary

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dokpavvdv/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Use the imageUrls as needed
        console.log(data.url);
        toast.loading("Image uploaded, now sending data over network..!", {
            id: toastId,
        });

        const furniture = {
            name,
            description,
            rentalPrice: price,
            imageUrls: [data.url], // Assuming data.url contains the image URL from the cloudinary response
        };

        try {
            const response = await fetch("http://localhost:8082/api/v1/furniture", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
                },
                body: JSON.stringify({furniture}),
            });
            if (response.ok) {
                const responseData = await response.json();
                toast.success("Furniture created successfully!", {
                    id: toastId,
                });
                // Reset input states
                setName("");
                setDescription("");
                setPrice("");
                setImages([]);
            } else {
                toast.error("Something went wrong", {
                    id: toastId,
                });
                console.error("Failed to create furniture");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Failed to create furniture", error);
        }

      } else {
        toast.error("Something went wrong", {
            id: toastId,
        });
        console.error("Image upload failed");
      }
    } catch (error) {
        toast.error("Something went wrong", {
            id: toastId,
        });
      console.error("Image upload failed", error);
    }
  };

  return (
    <div className="">
      <div className="pt-5 mx-auto d-flex">
        <Link className="m-2" href="/admin/dashboard">Back To Dashoard</Link>
        <h1 className="text-2xl mx-auto text-center">Create Furniture</h1>
      </div>
      <form onSubmit={handleSubmit} className="m-5 container mt-3">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description *
          </label>
          <textarea
            id="description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price *
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 font-bold mb-2"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Furniture
        </button>
      </form>
    </div>
  );
}

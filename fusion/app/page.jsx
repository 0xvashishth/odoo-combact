"use client"

import Header from "@/components/page-header";
import Image from "next/image";

export default function Home() {
  return (
      <div>
        <div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Rent Furniture for Every Occasion</h1>
      <p className="mb-5">
        Whether you're hosting a party, staging a home, or just need temporary furniture, we've got you covered. Choose from a wide selection of high-quality furniture pieces for rent.
      </p>
      <a className="btn btn-primary" href="/furnitures">Browse Furniture</a>
    </div>
  </div>
</div>
</div>
  );
}


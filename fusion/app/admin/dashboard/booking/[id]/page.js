"use client"

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import BookingDetail from './BookingDetail';

const BookingDetailsPage = () => {
    const booking = {
      _id: '123',
      user: 'User ID',
      furniture: 'Furniture ID',
      rentalDate: '2023-01-01',
      returnDate: '2023-01-10',
      bookingDate: '2022-12-25',
      status: 'pending',
    };
  
    const handleDelete = (bookingId) => {
      console.log('Deleting booking with ID:', bookingId);
      // Implement deletion logic here
    };
  
    const handleEditStatus = (bookingId) => {
      console.log('Editing status for booking with ID:', bookingId);
      // Implement status editing logic here
    };
  
    return (
      <div className="p-4">
        <div className="m-10 container mx-auto">
            <Link href="/admin/dashboard">Back to Dashboard</Link>
        <BookingDetail booking={booking} onDelete={handleDelete} onEditStatus={handleEditStatus} />

        </div>
      </div>
    );
  };

  export default BookingDetailsPage;
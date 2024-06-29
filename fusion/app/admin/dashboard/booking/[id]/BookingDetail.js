import React from 'react';

const BookingDetail = ({ booking, onDelete, onEditStatus }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Booking Detail</h2>
        <p><strong>User ID:</strong> {booking.user}</p>
        <p><strong>Furniture ID:</strong> {booking.furniture}</p>
        <p><strong>Rental Date:</strong> {booking.rentalDate}</p>
        <p><strong>Return Date:</strong> {booking.returnDate}</p>
        <p><strong>Booking Date:</strong> {booking.bookingDate}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => onEditStatus(booking._id)}>Edit Status</button>
          <button className="btn btn-error" onClick={() => onDelete(booking._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const DashboardPage = () => {
  const { push } = useRouter();
  const [furniture, setFurniture] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const [bookings, setBookings] = useState([]);
  const [pagination1, setPagination1] = useState({});
  const [loading1, setLoading1] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("admin") || !localStorage.getItem("adminToken")) {
      push("/admin/login");
    }
  }, []);

  const fetchFurniture = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8082/api/v1/furniture?page=${page}&limit=${limit}`
      );
      setFurniture(response.data.furniture);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch furniture:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFurniture();
  }, []);

  const fetchBookings = async (page = 1, limit = 10) => {
    setLoading1(true);
    try {
    const response = await axios.get(`http://localhost:8082/api/v1/booking?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`
      }
    });
      setBookings(response.data.bookings);
      setPagination1(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading1(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="m-8 container">
      <div className="flex"><h1 className="btn btn-sm">Admin Dashboard</h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="/admin/logout/" className="btn btn-sm">Logout</a></div>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-lg font-bold mb-4">
          Welcome, {localStorage.getItem("admin")}!
        </h2>
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => push("/admin/dashboard/create")}
          >
            Create Furniture
          </button>
        </div>
        <div>
        <p className="mt-10 text-2xl">Furniure details..!</p>
        <div>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {furniture.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.rentalPrice}</td>
                        <td>
                          <a
                            className="btn"
                            href={`/admin/dashboard/furniture/${item._id}`}
                          >
                            View Furniture
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="btn-group">
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <button
                      key={i}
                      className="btn"
                      onClick={() => fetchFurniture(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
        <div>
        <p className="mt-10 text-2xl">Booking details..!</p>
        <div>
        <div>
      {loading1 ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Furniture ID</th>
                <th>Rental Date</th>
                <th>Return Date</th>
                <th>Booking Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.user}</td>
                  <td>{booking.furniture}</td>
                  <td>{booking.rentalDate}</td>
                  <td>{booking.returnDate}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.status}</td>
                  <td>
                          <a
                            className="btn"
                            href={`/admin/dashboard/booking/${booking._id}`}
                          >
                            View Booking
                          </a>
                        </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="btn-group">
            {Array.from({ length: pagination1.totalPages }, (_, i) => (
              <button
                key={i}
                className="btn"
                onClick={() => fetchBookings(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Pagination from "../shared/Pagination";
import SearchBar from "../shared/SearchBar";
// import SearchBar from "../shared/SearchBar";
// import Pagination from "../shared/Pagination";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 🔍 Filtered Payments
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) =>
      (payment?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (payment?.transactionId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [payments, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedData = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return <p className="text-center text-gray-500 mt-10">Loading payment history...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">My Payment History</h2>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by camp name or transaction ID..."
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-green-100 text-green-800 text-sm">
            <tr>
              <th>#</th>
              <th>Paid by</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No matching payments found.
                </td>
              </tr>
            ) : (
              paginatedData.map((payment, index) => (
                <tr key={payment._id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{payment.name || "N/A"}</td>
                  <td className="text-green-600 font-semibold">${payment.amount}</td>
                  <td className="text-xs text-gray-600">{payment.transactionId}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;

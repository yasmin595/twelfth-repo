import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // তোমার কাস্টম axios হুক
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import useAuth from "../../hooks/useAuth";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 

  const userEmail = user?.email;

  const { data: registeredCamps = [], isLoading, error } = useQuery({
    queryKey: ["registeredCamps", userEmail],
    enabled: !!userEmail, 
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camps?email=${userEmail}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading analytics...</p>;
  if (error) return <p>Error loading analytics: {error.message}</p>;
  if (registeredCamps.length === 0)
    return <p>No registered camps found for analytics.</p>;


  const chartData = registeredCamps.map((camp) => ({
    name: camp.campName,
    fees: camp.campFees,
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        Participant Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="fees" fill="#22c55e" name="Camp Fees" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;

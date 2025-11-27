import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Menu,
  ZoomIn,
  ZoomOut,
  Users,
  Zap,
  Clock,
} from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transform hover:scale-[1.02] transition duration-300">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${color}`}
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
    <p className="text-gray-600 mt-1 text-sm">{title}</p>
  </div>
);

export default function LandAlertDashboard() {
  const [dateRange, setDateRange] = useState("Last Month");
  const [coordinatesWithUsers, setCoordinatesWithUsers] = useState([]);

  const baseUrl = "https://phoenix-kuqn.onrender.com";

  useEffect(() => {
    const fetchCoordinatesWithUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/coordinates-with-users/`);
        setCoordinatesWithUsers(response.data.data);

        console.log("Fetched coordinates with users:", response.data.data);
      } catch (error) {
        console.error("Error fetching coordinates with users:", error);
      }
    };

    fetchCoordinatesWithUsers();
  }, []);

  const getUsersCount = () => {
    const userIds = new Set(coordinatesWithUsers.map((item) => item.userId));
    return userIds.size;
  };

  const numberOfLocationsAnalysed = coordinatesWithUsers.length;

  const averageNewUsersPerDay = (getUsersCount() / 30).toFixed(1);

  const noOfUsersCreatedThisWeek = coordinatesWithUsers.filter((item) => {
    const createdAt = new Date(item.created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return createdAt >= oneWeekAgo;
  }).length;

  const stats = [
    {
      icon: Users,
      title: "Registered Users",
      value: getUsersCount().toString(),
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "Locations Analysed",
      value: numberOfLocationsAnalysed.toString(),
      color: "bg-red-500",
    },
    {
      icon: Zap,
      title: "Avg. New Users/Day",
      value: averageNewUsersPerDay.toString(),
      color: "bg-red-500",
    },
    {
      icon: Clock,
      title: "New Users This Week",
      value: noOfUsersCreatedThisWeek.toString(),
      color: "bg-green-500",
    },
  ];

  return (
    // Root container now ensures full height and prevents external scroll
    <div className="h-screen flex flex-col bg-gray-50 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 flex flex-row">
            <div
              className="w-12 h-12 rounded-full bg-cover bg-center"
              style={{ backgroundImage: "url('/landalertlogo.jpeg')" }}
            ></div>
            <p className="text-xl sm:text-xl my-0 py-0 font-bold text-gray-900">
              Dashboard
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition shadow-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                {dateRange}
              </span>
            </button>
            <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area: fills remaining height, ensures no external scroll */}
      <div className="p-4 sm:p-6 lg:p-8 w-full flex-grow overflow-hidden">
        {/* Top-level Flex: Stats vs Map/Table. Full height of parent. */}
        <div className="flex flex-col gap-6 lg:flex-row h-full">
          {/* Stats Cards (Left Panel): Slimmed to 22% on large screens */}
          <div className="gap-4 w-full lg:w-[22%] flex-shrink-0 flex flex-col mx-auto">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          {/* Map + Table (Right Panel): Takes the remaining 78%, is a vertical flex container */}
          <div className="flex flex-col gap-6 w-full lg:w-[78%] h-full">
            {/* Map Container: Uses flex-grow to take up all available space above the table */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden relative flex-grow min-h-[300px]">
              {/* Map Controls */}
              <div className="absolute top-4 left-4 z-10 flex space-x-2">
                <button className="bg-white px-3 py-2 rounded-xl shadow-lg text-sm font-semibold border border-blue-500 text-blue-700">
                  Map
                </button>
                <button className="bg-gray-100 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition">
                  Satellite
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
                <button className="bg-white p-2 rounded-xl shadow-md hover:bg-gray-50">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded-xl shadow-md hover:bg-gray-50">
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Map Placeholder */}
              <div className="h-full bg-gradient-to-br from-cyan-100 to-green-100 relative flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                  <p className="text-gray-800 font-bold text-xl">
                    Nigeria Flood Risk Map
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Click any red dot for details
                  </p>
                </div>
              </div>

              {/* Environmental Status */}
              <div className="absolute bottom-6 right-6 z-10 w-full max-w-xs">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 border border-gray-200">
                  <h3 className="font-bold text-base mb-3 text-gray-800">
                    Environmental Status
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="font-semibold text-orange-600">
                        38.9°C (Very High)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drought Risk:</span>
                      <span className="font-semibold text-green-600">
                        No Drought (VHI: 0.514)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Flood Susceptibility:
                      </span>
                      <span className="font-semibold text-yellow-600">
                        Class 3 – Moderate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Table: Fixed height and ONLY this area scrolls (vertically) */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 h-64 sm:h-72 lg:h-80 flex-shrink-0 overflow-y-auto">
              {/* Horizontal scroll */}
              <div className="overflow-x-auto w-full h-full">
                <table className="min-w-max text-sm">
                  <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10 shadow-sm">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        S/N
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Longitude
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Latitude
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Land Use
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Drought
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        VHI
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Flood Risk Level
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        LST Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        LST Temp
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Requested By
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-100">
                    {coordinatesWithUsers.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-blue-50/50 transition duration-150"
                      >
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                          {i + 1}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                          {item.longitude}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {item.latitude}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.land_use.toLowerCase() === "residential"
                                ? "bg-blue-100 text-blue-800"
                                : item.land_use.toLowerCase() === "commercial"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.land_use.toLowerCase()}
                          </span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.drought.toLowerCase() === "no drought"
                                ? "bg-blue-100 text-blue-800"
                                : item.drought.toLowerCase() === "mild drought"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.drought.toLowerCase()}
                          </span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.vhi >= 0.5
                                ? "bg-green-100 text-green-800"
                                : item.vhi >= 0.3
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.vhi.toFixed(2)}
                          </span>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {item.flood_risk_level}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {item.lst_category}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {item.lst_temp}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-gray-600 font-mono">
                          {item.username}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap text-gray-600 font-mono">
                          {item.first_name || item.last_name
                            ? `${item.first_name || ""} ${item.last_name || ""}`
                            : "Not Provided"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

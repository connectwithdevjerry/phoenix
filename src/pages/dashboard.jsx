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

const StatCard = ({ icon: Icon, title, value, color }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 transform hover:scale-[1.02] transition duration-300">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${color}`}
    >
      <Icon className="w-5 h-5 text-white" />
    </div>
    <h3 className="text-3xl font-extrabold text-gray-900">{value}</h3>
    <p className="text-gray-600 mt-1 text-sm">{title}</p>
  </div>
);

export default function LandAlertDashboard() {
  const [dateRange, setDateRange] = useState("Last Month");

  const assessments = [
    {
      name: "Chinedu Okeke",
      phone: "+234 801 234 5678",
      landUse: "Residential",
      lon: 3.3874,
      lat: 6.5244,
    },
    {
      name: "Aisha Mohammed",
      phone: "+234 703 456 7890",
      landUse: "Commercial",
      lon: 8.6753,
      lat: 9.082,
    },
    {
      name: "Emeka Nwosu",
      phone: "+234 906 123 4567",
      landUse: "Agriculture",
      lon: 7.3775,
      lat: 9.0765,
    },
    {
      name: "Fatima Bello",
      phone: "+234 802 345 6789",
      landUse: "Residential",
      lon: 5.1436,
      lat: 4.8149,
    },
    {
      name: "Kunle Adeyemi",
      phone: "+234 701 567 8901",
      landUse: "Commercial",
      lon: 7.5684,
      lat: 4.5458,
    },
    {
      name: "Gloria Uche",
      phone: "+234 903 210 9876",
      landUse: "Agriculture",
      lon: 8.4239,
      lat: 7.9404,
    },
    {
      name: "Tunde Oladipo",
      phone: "+234 810 001 1000",
      landUse: "Residential",
      lon: 3.9312,
      lat: 7.3775,
    },
    {
      name: "Ngozi Ibeh",
      phone: "+234 706 600 7000",
      landUse: "Commercial",
      lon: 4.8149,
      lat: 7.0379,
    },
  ];

  const stats = [
    {
      icon: Users,
      title: "Registered Users",
      value: "4,000",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "New Alerts (7D)",
      value: "1,200",
      color: "bg-red-500",
    },
    {
      icon: Clock,
      title: "Avg. Response Time",
      value: "3h 45m",
      color: "bg-green-500",
    },
  ];

  return (
    // Root container now ensures full height and prevents external scroll
    <div className="h-screen flex flex-col bg-gray-50 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              LA
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Land Alert Dashboard
            </h1>
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
          <div className="flex flex-col gap-4 w-full lg:w-[22%] flex-shrink-0">
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
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10 shadow-sm">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Land Use
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Lon
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Lat
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {assessments.map((item, i) => (
                      <tr
                        key={i}
                        className="hover:bg-blue-50/50 transition duration-150"
                      >
                        <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {item.phone}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              item.landUse === "Residential"
                                ? "bg-blue-100 text-blue-800"
                                : item.landUse === "Commercial"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.landUse}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-600 font-mono">
                          {item.lon}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-600 font-mono">
                          {item.lat}
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

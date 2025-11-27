import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Users, Zap, Clock, Calendar, Menu } from "lucide-react";

// Fix Leaflet default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Stat card component
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
  const [coordinatesWithUsers, setCoordinatesWithUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("map");
  const [zoom, setZoom] = useState(6);
  const [dateRange] = useState("Last Month");

  const baseUrl = "https://phoenix-kuqn.onrender.com";

  useEffect(() => {
    const fetchCoordinatesWithUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/coordinates-with-users/`);
        setCoordinatesWithUsers(response.data.data);
        console.log("Fetched coordinates with users:", response.data.data);
      } catch (error) {
        console.error("Error fetching coordinates with users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinatesWithUsers();
  }, []);

  const getUsersCount = () =>
    new Set(coordinatesWithUsers.map((item) => item.userId)).size;
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

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="text-gray-600 text-sm mt-3">Loading coordinates...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-12 h-12 rounded-full bg-cover bg-center"
              style={{ backgroundImage: "url('/landalertlogo.jpeg')" }}
            />
            <p className="text-xl sm:text-xl font-bold text-gray-900">
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

      {/* Main Content */}
      <div className="p-4 sm:p-6 lg:p-8 w-full flex-grow overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          {/* Stats Cards */}
          <div className="flex flex-col gap-4 w-full lg:w-[22%]">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          {/* Map + Table */}
          <div className="flex flex-col gap-6 w-full lg:w-[78%] h-full">
            {/* Map */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden relative flex-grow min-h-[300px]">
              {/* Map Controls */}
              <div className="absolute top-4 right-4 z-10 flex space-x-2">
                <button
                  className={
                    view === "map"
                      ? "bg-white px-3 py-2 rounded-xl shadow-lg text-sm font-semibold border border-blue-500 text-blue-700"
                      : "bg-gray-100 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
                  }
                  onClick={() => setView("map")}
                >
                  Map
                </button>
                <button
                  className={
                    view === "satellite"
                      ? "bg-white px-3 py-2 rounded-xl shadow-lg text-sm font-semibold border border-blue-500 text-blue-700"
                      : "bg-gray-100 px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition"
                  }
                  onClick={() => setView("satellite")}
                >
                  Satellite
                </button>
              </div>

              <MapContainer
                center={[9.082, 8.6753]}
                zoom={zoom}
                className="h-full w-full z-0"
              >
                <TileLayer
                  url={
                    view === "map"
                      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      : "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                  }
                  attribution="&copy; OpenStreetMap contributors"
                />
                {coordinatesWithUsers.map((user, i) => (
                  <Marker key={i} position={[user.latitude, user.longitude]}>
                    <Popup>
                      <div>
                        <p className="font-bold">
                          {user.username || "Anonymous"}
                        </p>
                        <p>
                          {user.first_name || ""} {user.last_name || ""}
                        </p>
                        <p>Land Use: {user.land_use}</p>
                        <p>Drought: {user.drought}</p>
                        <p>VHI: {user.vhi.toFixed(2)}</p>
                        <p>Flood Risk Level: {user.flood_risk_level}</p>
                        <p>LST Category: {user.lst_category}</p>
                        <p>LST Temp: {user.lst_temp}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>

              <div className="absolute bottom-6 right-6 z-10 max-w-xs">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl px-3 py-2 border border-gray-200">
                  <p className="text-sm italic text-gray-800">
                    Brought to you by team Phoenix
                  </p>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 h-64 sm:h-72 lg:h-80 overflow-y-auto">
              <div className="overflow-x-auto w-full h-full">
                <table className="min-w-max text-sm">
                  <thead className="sticky top-0 bg-gray-50 border-b border-gray-200 z-10 shadow-sm">
                    <tr>
                      {[
                        "S/N",
                        "Longitude",
                        "Latitude",
                        "Land Use",
                        "Drought",
                        "VHI",
                        "Flood Risk Level",
                        "LST Category",
                        "LST Temp",
                        "Username",
                        "Requested By",
                      ].map((head, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                          {head}
                        </th>
                      ))}
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
                          {item.username || "Anonymous"}
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

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, TrendingUp, Activity } from "lucide-react";

// Mock data - replace with actual project data
const generateMockData = (state: string) => {
  const baseData = [
    { name: "Jan 2020", cases: 100, deaths: 5 },
    { name: "Feb 2020", cases: 250, deaths: 15 },
    { name: "Mar 2020", cases: 500, deaths: 30 },
    { name: "Apr 2020", cases: 1200, deaths: 75 },
    { name: "May 2020", cases: 2000, deaths: 120 },
    { name: "Jun 2020", cases: 2500, deaths: 150 },
  ];

  // Slight variation based on state
  return baseData.map((item) => ({
    ...item,
    cases: item.cases * (state.length / 10),
    deaths: item.deaths * (state.length / 10),
  }));
};

interface DataVisualizationCardProps {
  state: string;
}

export const DataVisualizationCard: React.FC<DataVisualizationCardProps> = ({
  state,
}) => {
  const data = generateMockData(state);

  // Calculate key statistics
  const totalCases = data.reduce((sum, item) => sum + item.cases, 0);
  const totalDeaths = data.reduce((sum, item) => sum + item.deaths, 0);
  const averageCases = totalCases / data.length;

  return (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
      <div className="p-6 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Activity className="mr-3 text-blue-600" />
            COVID-19 Trends in {state}
          </h2>
          <div className="flex space-x-2">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              Active Cases
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 p-6 bg-white">
        <div className="border rounded-lg p-4 text-center">
          <h3 className="text-gray-500 uppercase text-xs mb-2">Total Cases</h3>
          <p className="text-2xl font-bold text-blue-600">
            {totalCases.toLocaleString()}
          </p>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <h3 className="text-gray-500 uppercase text-xs mb-2">Total Deaths</h3>
          <p className="text-2xl font-bold text-red-600">
            {totalDeaths.toLocaleString()}
          </p>
        </div>
        <div className="border rounded-lg p-4 text-center">
          <h3 className="text-gray-500 uppercase text-xs mb-2">
            Avg Daily Cases
          </h3>
          <p className="text-2xl font-bold text-purple-600">
            {averageCases.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#888888" />
            <YAxis stroke="#888888" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: "10px" }}
              itemStyle={{ color: "#333" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ strokeWidth: 3, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="deaths"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ strokeWidth: 3, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-6 bg-gray-50 border-t flex items-center text-sm text-gray-600">
        <AlertCircle className="mr-3 text-yellow-500" />
        <p>
          Data is based on historical records and may not reflect current
          conditions. Always consult official health sources for the most
          up-to-date information.
        </p>
      </div>
    </div>
  );
};

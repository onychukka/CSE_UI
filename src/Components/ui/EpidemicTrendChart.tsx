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
import { Card, CardContent, CardHeader, CardTitle } from "./Card";

// Define the data structure for epidemic trend
interface EpidemicData {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

// Props interface for the component
interface EpidemicTrendChartProps {
  data: EpidemicData[];
  title?: string;
}

const EpidemicTrendChart: React.FC<EpidemicTrendChartProps> = ({
  data,
  title = "Epidemic Trend Analysis",
}) => {
  console.log("Data received by chart:", data);

  // Sort data based on date
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Card className="w-full h-[500px] shadow-lg rounded-lg overflow-hidden bg-gradient-to-r from-blue-200 to-blue-300">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[450px] p-4">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={sortedData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()} // Format date
              tick={{ fill: "#666" }}
            />
            <YAxis tick={{ fill: "#666" }} />
            <Tooltip
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
              formatter={(value, name) => [
                typeof value === "number" ? value.toLocaleString() : value,
                name,
              ]}
              wrapperStyle={{
                backgroundColor: "#fff",
                border: "1px solid #ccc",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="confirmed"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              animationDuration={500}
            />
            <Line
              type="monotone"
              dataKey="deaths"
              stroke="#ff4d4f"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              animationDuration={500}
            />
            <Line
              type="monotone"
              dataKey="recovered"
              stroke="#52c41a"
              strokeWidth={2}
              activeDot={{ r: 8 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Example usage data
const exampleData: EpidemicData[] = [
  { date: "2023-01-01", confirmed: 1000, deaths: 50, recovered: 200 },
  { date: "2023-02-01", confirmed: 1500, deaths: 75, recovered: 400 },
  { date: "2023-03-01", confirmed: 2000, deaths: 100, recovered: 800 },
  { date: "2023-04-01", confirmed: 2500, deaths: 125, recovered: 1200 },
  { date: "2023-05-01", confirmed: 3000, deaths: 150, recovered: 160 },
];

export { EpidemicTrendChart, exampleData };

// src/App.tsx

import React, { useState } from "react";
import { StateSelector } from "./Components/StateSelector";
import { DataVisualizationCard } from "./Components/ui/DataVisualizationCard";
import USMapVisualization from "./Components/USMapVisualization";
import {
  EpidemicTrendChart,
  exampleData,
} from "./Components/ui/EpidemicTrendChart"; // Import EpidemicTrendChart

function App() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            COVID-19 Epidemic Forecasting
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl md:text-lg">
            Insights into Pandemic Trends Across US States
          </p>
        </div>

        <StateSelector onStateSelect={setSelectedState} />

        <USMapVisualization state={selectedState ?? ""} />

        {selectedState && (
          <div className="mt-8 animate-fade-in">
            <DataVisualizationCard state={selectedState} />

            {/* Add the EpidemicTrendChart here */}
            <div className="mt-8 h-96">
              <EpidemicTrendChart
                data={exampleData} // Replace this with actual state-specific data if available
                title={`Epidemic Trends in ${selectedState}`}
              />
            </div>
          </div>
        )}

        <div className="text-center text-gray-500 text-sm mt-8">
          Powered by Epidemic Forecasting Research
        </div>
      </div>
    </div>
  );
}

export default App;

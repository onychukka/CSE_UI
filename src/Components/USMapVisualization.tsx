import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const USMapVisualization: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [promptText, setPromptText] = useState<string>(
    "Enter COVID-19-related query"
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const stateData = {
    AL: 300,
    AK: 250,
    AZ: 700,
    AR: 400,
    CA: 1000,
    CO: 650,
    CT: 500,
    DE: 200,
    FL: 750,
    GA: 450,
    HI: 300,
    ID: 350,
    IL: 600,
    IN: 450,
    IA: 400,
    KS: 350,
    KY: 500,
    LA: 450,
    ME: 250,
    MD: 550,
    MA: 700,
    MI: 350,
    MN: 600,
    MS: 300,
    MO: 500,
    MT: 200,
    NE: 300,
    NV: 400,
    NH: 250,
    NJ: 700,
    NM: 350,
    NY: 900,
    NC: 400,
    ND: 200,
    OH: 500,
    OK: 350,
    OR: 450,
    PA: 550,
    RI: 250,
    SC: 400,
    SD: 200,
    TN: 500,
    TX: 800,
    UT: 400,
    VT: 200,
    VA: 600,
    WA: 700,
    WV: 300,
    WI: 500,
    WY: 150,
  };

  const stateNameToAbbreviation = {
    Alabama: "AL",
    Alaska: "AK",
    Arizona: "AZ",
    Arkansas: "AR",
    California: "CA",
    Colorado: "CO",
    Connecticut: "CT",
    Delaware: "DE",
    Florida: "FL",
    Georgia: "GA",
    Hawaii: "HI",
    Idaho: "ID",
    Illinois: "IL",
    Indiana: "IN",
    Iowa: "IA",
    Kansas: "KS",
    Kentucky: "KY",
    Louisiana: "LA",
    Maine: "ME",
    Maryland: "MD",
    Massachusetts: "MA",
    Michigan: "MI",
    Minnesota: "MN",
    Mississippi: "MS",
    Missouri: "MO",
    Montana: "MT",
    Nebraska: "NE",
    Nevada: "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    Ohio: "OH",
    Oklahoma: "OK",
    Oregon: "OR",
    Pennsylvania: "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    Tennessee: "TN",
    Texas: "TX",
    Utah: "UT",
    Vermont: "VT",
    Virginia: "VA",
    Washington: "WA",
    "West Virginia": "WV",
    Wisconsin: "WI",
    Wyoming: "WY",
  };

  const colorScale = scaleQuantile()
    .domain(Object.values(stateData))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618",
    ]);

  const handleStateClick = (stateId: string) => {
    setSelectedState(stateId);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>US COVID-19 Data Visualization</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Prompt Text Entry */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="promptText">
            Enter a COVID-19 Query (e.g., cases, deaths):{" "}
          </label>
          <input
            id="promptText"
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Type your prompt here"
            style={{
              width: "300px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Map Visualization */}
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                const stateId = stateNameToAbbreviation[stateName];
                const cur = stateId ? stateData[stateId] : null;
                const isSelectedState = stateId === selectedState;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={cur ? colorScale(cur) : "#EEE"}
                    stroke="#D6D6DA"
                    strokeWidth={isSelectedState ? 2 : 0.5}
                    strokeOpacity={isSelectedState ? 1 : 0.5}
                    className={isSelectedState ? "selected-state" : ""}
                    onClick={() => stateId && handleStateClick(stateId)}
                    style={{
                      default: {
                        outline: "none",
                        transition: "fill 0.2s ease-in-out",
                      },
                      hover: {
                        fill: cur ? colorScale(cur * 1.2) : "#EEE",
                        outline: "none",
                        cursor: cur ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>

        {/* Modal for State Details */}
        {showModal && selectedState && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
            }}
          >
            <h2>Details for {selectedState}</h2>
            <p>
              Data Value: {stateData[selectedState]} <br />
              Prompt Query: {promptText}
            </p>

            {/* Comparison Chart */}
            <div style={{ marginTop: "20px" }}>
              <h3>Comparison with Other States</h3>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "flex-end" }}
              >
                {Object.entries(stateData).map(([state, value]) => (
                  <div
                    key={state}
                    style={{
                      width: "20px",
                      height: `${
                        (value / Math.max(...Object.values(stateData))) * 100
                      }px`,
                      background: state === selectedState ? "#007BFF" : "#ccc",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "-20px",
                        fontSize: "12px",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#DC3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        )}

        {/* Modal Background */}
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            onClick={handleCloseModal}
          ></div>
        )}
      </CardContent>
    </Card>
  );
};

export default USMapVisualization;

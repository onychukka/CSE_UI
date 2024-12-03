// src/components/StateSelector.tsx
// import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import React from "react";
import { MapPin, ChevronDown } from "lucide-react";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

interface StateSelectorProps {
  onStateSelect: (state: string) => void;
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  onStateSelect,
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
        <div className="pl-4 text-gray-500">
          <MapPin className="h-5 w-5" />
        </div>
        <select
          onChange={(e) => onStateSelect(e.target.value)}
          className="w-full p-3 pl-2 pr-8 text-gray-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a State</option>
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <ChevronDown className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

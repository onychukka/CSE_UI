declare module "react-simple-maps" {
  import { Component } from "react";

  export interface GeographyProps {
    geography: any; // Adjust the type as needed
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeOpacity?: number;
    className?: string;
    style?: any; // Adjust the type as needed
    onClick?: (event: React.MouseEvent<SVGPathElement>, data: any) => void;
    onMouseEnter?: (event: React.MouseEvent<SVGPathElement>, data: any) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement>, data: any) => void;
  }

  export class Geography extends Component<GeographyProps> {}
  export class ComposableMap extends Component<any> {}
  export class Geographies extends Component<any> {}
}

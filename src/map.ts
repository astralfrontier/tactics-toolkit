import { range } from "ramda";

// A reference to a texture or other identifier to know what goes on a given face
type TacticsFace = string;

interface TacticsMapSquare {
  // Coordinates within the map where this square is found
  // X and Z are horizontal, Y is vertical
  x: number;
  y: number;
  z: number;
  // TODO: add corner height modifiers
  topFace: TacticsFace;
  // TODO: add north, south, east, west face references
}

interface TacticsMap {
  squares: TacticsMapSquare[];
}

const colors = ["CYAN", "MAGENTA", "YELLOW", "BLACK"];

function generateMap(): TacticsMap {
  const squares: TacticsMapSquare[] = [];
  range(-1, 2).map((z: number) => {
    range(-1, 2).map((x: number) => {
      const color = colors.shift() || "";
      colors.push(color);

      const height = (x + z) / 4;

      const square: TacticsMapSquare = {
        x,
        y: height,
        z,
        topFace: color,
      };
      squares.push(square);
    });
  });

  squares.push({
    x: 0,
    y: 2,
    z: 0,
    topFace: "BLACK",
  });
  return { squares };
}

export default generateMap;

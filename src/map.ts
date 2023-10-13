import { range } from "ramda";

// A reference to a texture or other identifier to know what goes on a given face
type TacticsFace = string;

interface TacticsMapSquare {
  // Coordinates within the map where this square is found
  x: number;
  y: number;
  height: number;
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
  range(-1, 2).map((y: number) => {
    range(-1, 2).map((x: number) => {
      const color = colors.shift() || "";
      colors.push(color);

      const square: TacticsMapSquare = {
        x,
        y,
        height: (x + y + 2) / 4,
        topFace: color,
      };
      squares.push(square);
    });
  });
  return { squares };
}

export default generateMap;

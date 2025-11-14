"use client";
import { useState } from "react";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

const fruits = ["Apple", "Banana", "Cherry", "Lemon"];
const fruitImages = {
  Apple: "/apple.png",
  Banana: "/banana.png",
  Cherry: "/cherry.png",
  Lemon: "/lemon.png",
};

function getRandomFruit() {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => getRandomFruit())
    )
  );
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWin(false);
    let elapsed = 0;
    const interval = setInterval(() => {
      setGrid((prev) => {
        const newRow = [
          getRandomFruit(),
          getRandomFruit(),
          getRandomFruit(),
        ];
        return [newRow, ...prev.slice(0, 2)];
      });
      elapsed += 200;
      if (elapsed >= 2000) {
        clearInterval(interval);
        setSpinning(false);
        checkWin();
      }
    }, 200);
  };

  const checkWin = () => {
    const centerRow = grid[1];
    if (
      centerRow[0] === centerRow[1] &&
      centerRow[1] === centerRow[2]
    ) {
      setWin(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col items-center">
            {col.map((fruit, rowIdx) => (
              <img
                key={rowIdx}
                src={fruitImages[fruit]}
                alt={fruit}
                className="w-16 h-16 object-contain"
              />
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={spin}
        disabled={spinning}
        className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {win && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-xl font-bold text-green-600">
            You win!
          </span>
          <Share text={`I just won a slot machine! ${url}`} />
        </div>
      )}
    </div>
  );
}

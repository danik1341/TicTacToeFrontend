import React from "react";

interface GameBoardProps {
  game: {
    gameBoard: (string | null)[];
    winStatus: string;
  };
  handleSpotClick: (index: number) => void;
}

const GameBoardComponent: React.FC<GameBoardProps> = ({
  game,
  handleSpotClick,
}) => {
  return (
    <div className="grid grid-cols-3 gap-1 bg-slate-300 p-1 rounded-lg shadow w-[300px] h-[300px]">
      {game.gameBoard.map((spot, index) => (
        <div
          key={index}
          className={`w-full h-full flex justify-center items-center border-2 border-gray-400
              ${index < 3 ? "border-t-0" : ""}
              ${index > 5 ? "border-b-0" : ""}
              ${index % 3 === 2 ? "border-r-0" : ""}
              ${index % 3 === 0 ? "border-l-0" : ""}
          `}
        >
          <button
            className={`text-6xl cursor-pointer font-bold ${
              spot === null && spot !== "O"
                ? "text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 opacity-0 hover:opacity-50 transition-opacity duration-500 delay-100"
                : spot === "X"
                ? "text-red-500"
                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 animate-fade-in"
            }`}
            onClick={() => handleSpotClick(index)}
          >
            {spot || "X"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GameBoardComponent;

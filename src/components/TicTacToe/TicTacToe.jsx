import React, { useState } from "react";
import circle from "../circle.png";
import cross from "../cross.png";

const TicTacToe = () => {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = (index) => {
    if (grid[index] || calculateWinner(grid)) return;
    const newGrid = grid.slice();
    newGrid[index] = isXNext ? "X" : "O";
    setGrid(newGrid);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setGrid(Array(9).fill(null));
    setIsXNext(true);
  };

  const calculateWinner = (grid) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return grid[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(grid);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h1 className="h-14 text-4xl sm:text-5xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-orange-500">
        ❌ Tic-Tac-Toe ⭕
      </h1>

      <div className="grid grid-cols-3 gap-4 w-64 lg:gap-6 lg:w-96">
        {grid.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center border rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {cell === "X" ? (
              <img
                src={cross}
                alt="X"
                className="flex justify-center w-16 h-16 lg:w-20 lg:h-20"
              />
            ) : cell === "O" ? (
              <img
                src={circle}
                alt="O"
                className="flex justify-center items-end w-16 h-16 lg:w-20 lg:h-20"
              />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-4 text-lg font-semibold">
        {winner
          ? `Congratulations Winner: ${winner}`
          : grid.includes(null)
          ? `Next Player: ${isXNext ? "X" : "O"}`
          : "It's a Draw!"}
      </div>

      <label className="flex items-center space-x-3 cursor-pointer m-4">
        <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
        <div className="relative">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
            className="hidden"
          />
          <div
            className={`w-10 h-5 rounded-full shadow-inner transition-colors ${
              isDarkMode ? "bg-blue-500" : "bg-gray-400"
            }`}
          ></div>
          <div
            className={`absolute top-0 left-0 w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
              isDarkMode ? "translate-x-5" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>

      <button
        onClick={resetGame}
        className="mt-4 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;

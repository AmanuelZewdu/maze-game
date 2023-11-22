import React, { useState } from "react";
import "./MazeGame.css";
import useSound from "use-sound";
import mouse from "./shared/mouse-click.mp3";
import fireworks from "./shared/fireworks.mp3";
import success from "./shared/success.wav";

const MazeGame = () => {
  const [ballPosition, setBallPosition] = useState(1); // Initial ball position
  const [showFireworks, setShowFireworks] = useState(false); // Fireworks state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Success message state
  const [rollBallSound] = useSound(mouse);
  const [fireWorkSound] = useSound(fireworks);
  const [successSound] = useSound(success);

  const handleRollBallClick = () => {
    rollBallSound(); // Play roll ball sound

    // Update ball position randomly between 1 and 2 steps
    const newBallPosition = Math.min(ballPosition + Math.random() * 2 + 1, 15);
    // console.log("Ball Position", newBallPosition);
    const result = Math.floor(newBallPosition);
    setBallPosition(result);

    // Check if ball reached cell 15
    if (newBallPosition === 15) {
      fireWorkSound(); // Play fireworks sound
      setShowFireworks(true); // Show fireworks animation
      setShowSuccessMessage(true); // Show success message
      successSound(); // Play success sound
    }
  };

  const resetGame = () => {
    setBallPosition(1);
    setShowSuccessMessage(false);
    setShowFireworks(false);
  };

  return (
    <div className="maze-game">
      <header class="maze-game-header">
        <h1>Maze Game</h1>
        <p>Challenge your skills and guide the ball to the goal!</p>
      </header>
      <div className="maze-game">
        {/* Maze board with numbered cells */}
        <div className="maze-board">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index + 1}
              className={`maze-cell ${
                ballPosition === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Roll ball button */}
        <button className="roll-ball-button" onClick={handleRollBallClick}>
          Roll Ball
        </button>
        {/* Restart button */}
        <button className="roll-ball-button" onClick={resetGame}>
          Restart
        </button>

        {/* Fireworks animation (conditionally displayed) */}
        {showFireworks && (
          <div className="fireworks-animation">
            <div className="firework-1"></div>
            <div className="firework-2"></div>
            <div className="firework-3"></div>
            <div className="firework-1"></div>
            <div className="firework-2"></div>
            <div className="firework-3"></div>
            <div className="firework-1"></div>
            <div className="firework-2"></div>
            <div className="firework-3"></div>
            <div className="firework-1"></div>
            <div className="firework-2"></div>
            <div className="firework-3"></div>
            <div className="firework-1"></div>
            <div className="firework-2"></div>
            <div className="firework-3"></div>
            <div className="firework-1"></div>
            <div className="firework-2"></div>
            <div className="firework-3"></div>
          </div>
        )}

        {/* Success message (conditionally displayed) */}
        {showSuccessMessage && (
          <div className="success-message">
            Congratulations! You reached the end!
          </div>
        )}
      </div>
    </div>
  );
};

export default MazeGame;

import React, { useState, useEffect } from "react";
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  const handleRollBallClick = () => {
    rollBallSound();

    const newBallPosition = Math.min(ballPosition + Math.random() * 2 + 1, 15);

    setBallPosition(Math.floor(newBallPosition));
    console.log("Ball Position", ballPosition);

    if (newBallPosition === 15) {
      fireWorkSound(); // Play fireworks sound
      setShowFireworks(true); // Show fireworks animation
      setShowSuccessMessage(true); // Show success message
      successSound(); // Play success sound
      setTimeout(() => {
        setIsAnimating(false);
        window.location.reload();
      }, 5000);
    }
  };

  const resetGame = () => {
    setBallPosition(1);
    setShowSuccessMessage(false);
    setShowFireworks(false);
  };

  useEffect(() => {}, []);

  return (
    <div className="maze-game">
      <header class="maze-game-header">
        <h1>Maze Game</h1>
        <p>Challenge your skills and guide the ball to the goal!</p>
      </header>
      <div className="maze-game">
        <div className="maze-board">
          {Array.from({ length: 15 }).map((_, index) => (
            <div
              key={index + 1}
              className={`maze-cell ${
                ballPosition === index + 1 ? "active" : ""
              }`}
              onClick={handleRollBallClick}
            >
              {index + 1}
            </div>
          ))}
        </div>

        {/* Roll ball button */}
        <div className="">
          <button className="roll-ball-button" onClick={handleRollBallClick}>
            Roll Ball
          </button>
          {/* Restart button */}
          <button className="roll-ball-button" onClick={resetGame}>
            Reset
          </button>
        </div>

        {showSuccessMessage && (
          <div className="success-message">
            Congratulations! You reached the end!
          </div>
        )}

        {showFireworks && (
          <>
            <div className="fireworks-animation">
              <div
                className="firework"
                style={{ display: isAnimating ? "block" : "none" }}
              >
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
              </div>
              <div
                className="firework"
                style={{ display: isAnimating ? "block" : "none" }}
              >
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
              </div>
              <div
                className="firework"
                style={{ display: isAnimating ? "block" : "none" }}
              >
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
                <div className="firework-particle"></div>
              </div>
            </div>
            {/* <div class="firework"></div>
            <div class="firework"></div>
            <div class="firework"></div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default MazeGame;

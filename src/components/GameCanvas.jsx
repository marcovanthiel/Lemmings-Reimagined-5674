import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function GameCanvas({ level, onComplete, onGameOver }) {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const [selectedAbility, setSelectedAbility] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;
    
    let lemmings = [];
    let savedCount = 0;
    let totalLemmings = level.lemmingCount;
    let spawnedLemmings = 0;
    let isPaused = false;
    let lastTime = 0;
    
    function init() {
      // Start spawning lemmings
      spawnLemming();
    }
    
    function spawnLemming() {
      if (spawnedLemmings < totalLemmings) {
        lemmings.push({
          x: level.spawnPoint.x,
          y: level.spawnPoint.y,
          dx: 2,
          dy: 0,
          state: 'walking',
          direction: 1,
          canFloat: false,
          buildSteps: 0,
          digProgress: 0
        });
        spawnedLemmings++;
        setTimeout(spawnLemming, 2000);
      }
    }

    function checkCollision(lemming, x, y, width, height) {
      return (
        lemming.x < x + width &&
        lemming.x + 20 > x &&
        lemming.y < y + height &&
        lemming.y + 20 > y
      );
    }

    function updateLemming(lemming) {
      if (isPaused) return;

      switch (lemming.state) {
        case 'walking':
          lemming.x += lemming.dx * lemming.direction;
          
          // Check for terrain collision below
          let onGround = false;
          level.terrain.forEach(block => {
            if (checkCollision(lemming, block.x, block.y - 1, block.width, 1)) {
              onGround = true;
              lemming.y = block.y - 20;
            }
          });

          if (!onGround) {
            lemming.state = 'falling';
            lemming.dy = 0;
          }

          // Check for wall collision
          level.terrain.forEach(block => {
            if (checkCollision(lemming, block.x, block.y, block.width, block.height)) {
              lemming.direction *= -1;
              lemming.x += lemming.dx * lemming.direction;
            }
          });
          break;

        case 'falling':
          lemming.dy += 0.5; // Gravity
          lemming.y += lemming.dy;

          // Check for landing
          level.terrain.forEach(block => {
            if (checkCollision(lemming, block.x, block.y, block.width, block.height)) {
              if (lemming.dy > 0) {
                lemming.y = block.y - 20;
                lemming.dy = 0;
                lemming.state = 'walking';
                
                // Check fall damage
                if (!lemming.canFloat && lemming.fallHeight > 150) {
                  return true; // Lemming dies
                }
              }
            }
          });
          break;

        case 'building':
          if (lemming.buildSteps < 5) {
            level.terrain.push({
              x: lemming.x + (lemming.direction > 0 ? 20 : -20),
              y: lemming.y + 20,
              width: 20,
              height: 4
            });
            lemming.buildSteps++;
            lemming.x += 20 * lemming.direction;
            lemming.y -= 4;
          } else {
            lemming.state = 'walking';
          }
          break;

        case 'digging':
          lemming.digProgress += 2;
          lemming.y += 1;
          
          if (lemming.digProgress >= 20) {
            lemming.state = 'walking';
          }
          break;

        case 'blocking':
          // Check for other lemmings
          lemmings.forEach(other => {
            if (other !== lemming && checkCollision(other, lemming.x - 10, lemming.y, 40, 20)) {
              other.direction *= -1;
            }
          });
          break;
      }

      // Check for obstacles
      level.obstacles.forEach(obstacle => {
        if (checkCollision(lemming, obstacle.x, obstacle.y, obstacle.width, obstacle.height)) {
          return true; // Lemming dies
        }
      });

      // Check if lemming reached exit (right edge)
      if (lemming.x > canvas.width - 30) {
        savedCount++;
        return true; // Remove lemming
      }

      return false; // Lemming lives
    }

    function update(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      
      if (deltaTime >= 16) { // Cap at ~60 FPS
        lastTime = timestamp;
        
        // Update lemmings
        lemmings = lemmings.filter(lemming => !updateLemming(lemming));

        // Check win/lose conditions
        if (savedCount >= level.requiredSaved) {
          onComplete(savedCount * 100);
        } else if (spawnedLemmings === totalLemmings && lemmings.length === 0) {
          onGameOver();
        }
      }

      draw();
      gameLoopRef.current = requestAnimationFrame(update);
    }

    function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#2C3E50');
      gradient.addColorStop(1, '#3498db');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw terrain
      level.terrain.forEach(block => {
        const gradient = ctx.createLinearGradient(block.x, block.y, block.x, block.y + block.height);
        gradient.addColorStop(0, '#795548');
        gradient.addColorStop(1, '#5D4037');
        ctx.fillStyle = gradient;
        ctx.fillRect(block.x, block.y, block.width, block.height);
        
        // Add texture
        ctx.strokeStyle = '#3E2723';
        ctx.lineWidth = 1;
        ctx.strokeRect(block.x, block.y, block.width, block.height);
      });

      // Draw obstacles
      level.obstacles.forEach(obstacle => {
        let gradient;
        switch(obstacle.type) {
          case 'lava':
            gradient = ctx.createLinearGradient(obstacle.x, obstacle.y, obstacle.x, obstacle.y + obstacle.height);
            gradient.addColorStop(0, '#FF5722');
            gradient.addColorStop(1, '#BF360C');
            ctx.fillStyle = gradient;
            break;
          case 'spikes':
            ctx.fillStyle = '#9E9E9E';
            break;
          default:
            ctx.fillStyle = '#F44336';
        }
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw lemmings
      lemmings.forEach(lemming => {
        // Body
        ctx.fillStyle = '#27AE60';
        ctx.fillRect(lemming.x, lemming.y, 20, 20);
        
        // Eyes
        ctx.fillStyle = 'white';
        ctx.fillRect(lemming.x + (lemming.direction > 0 ? 14 : 4), lemming.y + 6, 2, 2);
        
        // Special effects based on state
        switch(lemming.state) {
          case 'building':
            ctx.fillStyle = '#F4D03F';
            ctx.fillRect(lemming.x + 16, lemming.y + 16, 4, 4);
            break;
          case 'digging':
            ctx.fillStyle = '#E67E22';
            ctx.fillRect(lemming.x + 8, lemming.y + 16, 4, 4);
            break;
          case 'blocking':
            ctx.fillStyle = '#E74C3C';
            ctx.strokeStyle = 'white';
            ctx.strokeRect(lemming.x, lemming.y, 20, 20);
            break;
        }
      });

      // Draw UI
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(10, 10, 200, 80);
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`Saved: ${savedCount}/${level.requiredSaved}`, 20, 40);
      ctx.fillText(`Remaining: ${totalLemmings - spawnedLemmings}`, 20, 70);

      // Draw selected ability
      if (selectedAbility) {
        ctx.fillStyle = 'rgba(52, 152, 219, 0.8)';
        ctx.fillRect(canvas.width - 60, 10, 50, 50);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.fillText(selectedAbility, canvas.width - 40, 40);
      }
    }

    function handleKeyPress(e) {
      if (e.code === 'Space') {
        isPaused = !isPaused;
      } else if (e.key >= '1' && e.key <= '4') {
        setSelectedAbility(parseInt(e.key));
      }
    }

    function handleCanvasClick(e) {
      if (!selectedAbility) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Find clicked lemming
      const clickedLemming = lemmings.find(lemming =>
        x >= lemming.x && x <= lemming.x + 20 &&
        y >= lemming.y && y <= lemming.y + 20
      );

      if (clickedLemming) {
        switch (selectedAbility) {
          case 1:
            clickedLemming.state = 'building';
            clickedLemming.buildSteps = 0;
            break;
          case 2:
            clickedLemming.state = 'digging';
            clickedLemming.digProgress = 0;
            break;
          case 3:
            clickedLemming.canFloat = true;
            break;
          case 4:
            clickedLemming.state = 'blocking';
            break;
        }
      }
    }

    // Initialize game
    init();
    
    // Start game loop
    gameLoopRef.current = requestAnimationFrame(update);
    
    // Add event listeners
    document.addEventListener('keydown', handleKeyPress);
    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(gameLoopRef.current);
    };
  }, [level, onComplete, onGameOver, selectedAbility]);

  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className="rounded-lg overflow-hidden shadow-2xl"
    >
      <canvas
        ref={canvasRef}
        className="bg-game-secondary"
        style={{ cursor: selectedAbility ? 'crosshair' : 'default' }}
      />
    </motion.div>
  );
}
import { useMemo, useState, useEffect, useRef } from 'react';
import Column from './Column';
import Menu from './Menu';
import styles from './Scene.module.css';

export default function Scene({
  height,
  mapHeight,
  player,
  rays,
  resolution,
  width,
}) {
  const containerSize = useMemo(() => ({ height, width }), [height, width]);
  // NOTE: menuSelection should be included with the menuState
  const [menuState, setMenu] = useState({isOpen: false, selection: 0});
  const [menuSelection, setMenuSelect] = useState({selection: 0});

  // Send game state to mongoDB
  function saveGame() {
    let x = player.position.x;
    let y = player.position.y;
    console.log('Saving game...');
    let result = fetch(
      'http://localhost:5000/save', {
          method: 'post',
          body: JSON.stringify({ playerX: x, playerY: y }),
          headers: {
              'Content-Type': 'application/json',
          },
      });
      console.log(result);
  }

  // Restore gameState from mongoDB
  function loadGame() {
    console.log('Loading game...');
    fetch('http://localhost:5000/load')
      .then((result) => result.json()
          .then((dat) => {
            player.position.x = dat.playerX;
            player.position.y = dat.playerY;
          }));
  }

  function handleMenuSelection(selected) {
      switch (selected) {
        case 0: saveGame(); break;
        case 1: loadGame(); break;
      }
  }

  // Add an event listener to open and navigate the menu
  const handleKeyDown = (e) => {
    if (e.code === 'KeyM') {
      setMenu({isOpen: !menuState.isOpen});
      return;
    }
    if (menuState.isOpen) {
        switch (e.code) {
          // Technically there is only two possible options right now, but if I wanted to add more menu items
          // incrementing and decrementing the selection would be better.
            case 'KeyF': 
            setMenuSelect({selection: menuSelection.selection == 1 ? 1 : menuSelection.selection + 1});
            break;
            case 'KeyR':             
            setMenuSelect({selection: menuSelection.selection == 0 ? 0 : menuSelection.selection - 1});
            break;
            case 'Enter': handleMenuSelection(menuSelection.selection);
            break;
        }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className={styles.container} style={containerSize}>
      {menuState.isOpen && <Menu selected={menuSelection.selection}/>}
      <div className={styles.ceiling} />
      <div className={styles.floor} />
      {rays.map((ray, index) => (
        <Column
          color="#0000FF"
          distance={adjustDistance(ray, player)}
          key={index} // eslint-disable-line react/no-array-index-key
          mapHeight={mapHeight}
          number={index}
          resolution={resolution}
          screenHeight={height}
          screenWidth={width}
        />
      ))}
    </div>
  );
}

// Correct for a fishbowl-effect resulting from mixing polar and cartesian coordinates.
function adjustDistance(ray, player) {
  return ray.distance * Math.cos(ray.angle - player.direction);
}

import React from 'react';
import classes from './ActionMenu.module.css';

const ActionMenu = ({ options, onClose, x, y }) => {
  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.menu} style={{ top: y, left: x }} onClick={(e) => e.stopPropagation()}>
        {options.map((option, index) => (
          <div
            key={index}
            className={classes.menuItem}
            onClick={() => {
              option.action();
              onClose();
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionMenu; 
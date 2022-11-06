import React from 'react';
import cn from './Button.module.css';

interface ButtonProps {
  title: string;
  size: 'xl' | 'l' | 'm' | 's';
  variant: 'default' | 'primary' | 'hidden';
  onClick: () => void | undefined;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  size,
  variant = 'default',
  onClick,
}) => {
  const handleBtn = () => {
    console.log('Click');
    if (typeof onClick !== 'undefined') onClick();
  };
  return (
    <button
      type="button"
      className={[cn.btn, cn[`btn_${size}`], cn[`btn_${variant}`]].join(' ')}
      onClick={handleBtn}
    >
      {title}
    </button>
  );
};

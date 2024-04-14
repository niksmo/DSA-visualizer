import React from 'react';
import loaderIcon from './loader.svg';
import { AscendingIcon, DescendingIcon } from '../icons';
import { Direction } from '../../types';
import styles from './styles.module.css';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
  sorting?: Direction;
  linkedList?: 'small' | 'big';
  isLoader?: boolean;
  extClassName?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  extClassName = '',
  type = 'button',
  isLoader = false,
  sorting,
  linkedList,
  disabled,
  ...rest
}) => {
  const currentIcon =
    sorting === Direction.Ascending ? <AscendingIcon /> : <DescendingIcon />;
  const className = `text text_type_button text_color_primary ${
    styles.button
  } ${linkedList && styles[linkedList]} ${
    isLoader && styles.loader
  } ${extClassName}`;

  return (
    <button
      className={className}
      type={type}
      disabled={isLoader || disabled}
      {...rest}>
      {isLoader ? (
        <img className={styles.loader_icon} src={loaderIcon} alt="Загрузка." />
      ) : (
        <>
          {sorting && currentIcon}
          <p className={`text ${sorting && 'ml-5'}`}>{text}</p>
        </>
      )}
    </button>
  );
};

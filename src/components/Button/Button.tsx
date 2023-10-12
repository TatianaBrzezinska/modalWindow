import React, { ButtonHTMLAttributes, FC } from 'react';
import cx from 'classnames';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  children,
  loading = false,
  onClick,
  className,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      className={cx('button', className)}
      onClick={loading ? undefined : onClick}
    >
      {children}
      {loading && (
        <span className="button__loading">
          <img
            className="button__spinner"
            src={require('../../images/spinner.svg')}
            alt="Spinner"
          />
        </span>
      )}
    </button>
  );
};

import { HTMLAttributes, useEffect } from 'react';
import { createPortal } from 'react-dom';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import './ModalWrapper.css';

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: 'start' | 'center' | 'end';
  alignY?: 'start' | 'center' | 'end';
  onClose: VoidFunction;
  shown: boolean;
}

export const ModalWrapper = ({
  children,
  alignX = 'center',
  alignY = 'center',
  className,
  onClose,
  shown,
  ...restProps
}: ModalWrapperProps) => {
  useEffect(() => {
    if (shown) {
      document.documentElement.classList.add('prevent-scroll');
    }

    return () => {
      document.documentElement.classList.remove('prevent-scroll');
    };
  }, [shown]);

  useEffect(() => {
    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', documentKeydownListener);
    return () => {
      document.removeEventListener('keydown', documentKeydownListener);
    };
  }, [onClose]);

  return createPortal(
    <CSSTransition
      in={shown}
      mountOnEnter={true}
      unmountOnExit={true}
      timeout={400}
      classNames="modal-animation"
    >
      <div
        className={cx(
          'modal-wrapper',
          `modal-wrapper--alignY-${alignY}`,
          `modal-wrapper--alignX-${alignX}`,
          className,
        )}
        onClick={onClose}
        {...restProps}
      >
        <div
          className="modal-wrapper__children"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement,
  );
};

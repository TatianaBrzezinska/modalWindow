import { HTMLAttributes, useEffect } from "react";
import { createPortal } from "react-dom";
import cx from "classnames";
import "./ModalWrapper.css";

interface ModalWrapperProps extends HTMLAttributes<HTMLElement> {
  alignX?: "start" | "center" | "end";
  alignY?: "start" | "center" | "end";
  onClose: VoidFunction;
}

export const ModalWrapper = ({
  children,
  alignX = "center",
  alignY = "center",
  className,
  onClose,
  ...restProps
}: ModalWrapperProps) => {
  useEffect(() => {
    document.documentElement.classList.add("prevent-scroll");

    return () => {
      document.documentElement.classList.remove("prevent-scroll");
    };
  }, []);

  useEffect(() => {
    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", documentKeydownListener);
    return () => {
      document.removeEventListener("keydown", documentKeydownListener);
    };
  }, [onClose]);

  return createPortal(
    <div
      className={cx(
        "modal-wrapper",
        `modal-wrapper--alignY-${alignY}`,
        `modal-wrapper--alignX-${alignX}`,
        className
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
    </div>,
    document.getElementById("overlay") as HTMLElement
  );
};

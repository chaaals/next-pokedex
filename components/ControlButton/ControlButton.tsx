import Link from "next/link";
import React, { FC } from "react";

import clsx from "clsx";
import styles from "./ControlButton.module.css";

interface ButtonProps {
  buttonType: string;
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
  href?: string;
  controlType: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const ControlButton: FC<ButtonProps> = ({
  buttonType,
  onClick,
  href,
  children,
  controlType,
  disabled = false,
}) => {
  const buttonClassNames = clsx(
    styles["control-btn"],
    styles[controlType],
    disabled && styles.disabled
  );

  if (disabled && buttonType === "link") {
    return (
      <button
        className={buttonClassNames}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <>
      {buttonType === "link" ? (
        <Link
          href={href as string}
          className={buttonClassNames}
          onClick={onClick}
        >
          {children}
        </Link>
      ) : (
        <button className={buttonClassNames} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default ControlButton;

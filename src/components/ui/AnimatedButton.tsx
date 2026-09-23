import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./AnimatedButton.css";

type AnimatedButtonProps = {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
  icon?: ReactNode;
  /** When false, hides the default trailing arrow */
  showIcon?: boolean;
  external?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  className?: string;
  variant?: "primary" | "dark" | "outline" | "ghost" | "compact" | "icon";
  type?: "button" | "submit";
};

function isInternalPath(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

function DefaultIcon() {
  return (
    <svg className="btn-animated__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AnimatedButton({
  children,
  href,
  target,
  rel,
  "aria-label": ariaLabel,
  "aria-expanded": ariaExpanded,
  "aria-controls": ariaControls,
  icon,
  showIcon = true,
  external,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
}: AnimatedButtonProps) {
  const classes = ["btn-animated", `btn-animated--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  const trailing =
    variant === "icon" ? null : icon ? (
      <span className="btn-animated__icon-slot">{icon}</span>
    ) : showIcon ? (
      <DefaultIcon />
    ) : null;

  const content = (
    <>
      <span className="btn-animated__label">{children}</span>
      {trailing}
    </>
  );

  if (href && isInternalPath(href) && !external) {
    return (
      <Link
        to={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : target}
        rel={external ? rel ?? "noopener noreferrer" : rel}
        aria-label={ariaLabel}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-controls={ariaControls}
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}

import React from "react";
import classes from "classnames";

export interface ContainerProps
  extends React.ClassAttributes<HTMLHeadingElement> {
  hasBackground: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function Container({
  children,
  hasBackground,
  className,
  style,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={classes(
        "container",
        { "bg-blue-100": hasBackground },
        className
      )}
      style={style}
    >
      <div>{children}</div>
    </div>
  );
}
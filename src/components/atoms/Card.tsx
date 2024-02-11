import React from "react";

function Card({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      {...rest}
      className={`border flex items-center rounded-xl ${rest.className}`}
    >
      {children}
    </div>
  );
}

export default Card;

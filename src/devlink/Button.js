"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function Button({ buttonText = "Button", onClick, className = "", ...props }) {
  return (
    <_Builtin.Link className={className} button options={{ href: "#" }} onClick={onClick} {...props}>
      {buttonText}
    </_Builtin.Link>
  );
}


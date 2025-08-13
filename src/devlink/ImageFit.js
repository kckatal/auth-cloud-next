"use client";
import React from "react";
import * as _Builtin from "./_Builtin";

export function ImageFit({ imageFit = "Inherit", altText = "", image, className = "", ...props }) {
  return (
    <_Builtin.Image src={image} alt={altText} className={className} {...props} />
  );
}


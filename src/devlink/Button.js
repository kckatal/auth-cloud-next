"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Button.module.css";

export function Button({
  as: _Component = _Builtin.Link,
  buttonText = "Button",

  buttonLink = {
    href: "#",
  },

  iconIconLeft = false,
  iconIconLeftClass = "ph ph-play",
  iconIconRight = false,
  iconIconRightClass = "ph ph-arrow-up-right",
  variant = "Primary",
  advancedClass,
  advancedId,
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-052759b4-b398-e98d-c28c-099b380d4426",
  };

  const _activeStyleVariant = _styleVariantMap[variant];

  return (
    <_Component
      className={_utils.cx(_styles, "btn", _activeStyleVariant)}
      button={false}
      id={advancedId}
      block="inline"
      options={buttonLink}
    >
      <_Builtin.Block tag="div">{buttonText}</_Builtin.Block>
    </_Component>
  );
}

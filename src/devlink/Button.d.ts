import * as React from "react";
import * as Types from "./types";

declare function Button(props: {
  as?: React.ElementType;
  buttonText?: React.ReactNode;
  buttonLink?: Types.Basic.Link;
  iconIconLeft?: Types.Visibility.VisibilityConditions;
  iconIconLeftClass?: Types.Builtin.Text;
  iconIconRight?: Types.Visibility.VisibilityConditions;
  iconIconRightClass?: Types.Builtin.Text;
  variant?: "Primary" | "Secondary";
  advancedClass?: Types.Builtin.Text;
  advancedId?: Types.Basic.IdTextInput;
}): React.JSX.Element;

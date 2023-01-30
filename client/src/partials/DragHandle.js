import { DragIconWrapper } from "../styles";
import { ReactComponent as DragHandleIcon } from "../dropdown.svg";
import React from "react";

export function DragHandle(props) {
  return (
    <DragIconWrapper {...props}>
      <DragHandleIcon />
    </DragIconWrapper>
  );
}
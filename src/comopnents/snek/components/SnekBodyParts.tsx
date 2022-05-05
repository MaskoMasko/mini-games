import React, { forwardRef } from "react";
export const SnekBodyParts = forwardRef(() => {
  return (
    <div></div>
    // <div
    //   ref={ref}
    //   key={props.id}
    //   className={`${props.id}`}
    //   style={{
    //     width: 50,
    //     height: 50,
    //     backgroundColor: "red",
    //     transform: `translate(${
    //       props.currentPosition.x! - (props.id + 1) * props.moveSpeed
    //     } px, ${props.currentPosition.y!}px)`,
    //   }}
    // ></div>
  );
});

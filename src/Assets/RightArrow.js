import React from "react";

export default class RightArrow extends React.Component {
  render() {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="24"
          height="24"
          transform="matrix(-1 0 0 1 24 0)"
          fill="black"
          fillOpacity="0.73"
        />
        <path
          d="M9.75 6.06808L15.375 11.6871L9.75 17.3062"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}

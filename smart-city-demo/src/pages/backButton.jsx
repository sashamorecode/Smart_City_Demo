import React from "react";
import { Link } from "react-router-dom";
export default function BackIcon() {
  return (
    <a href={"/Smart_City_Demo"} className="backButton">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 211 205">
        <rect
          width="166.486"
          height="160.799"
          x="2.535"
          y="2.298"
          fill="#6E5919"
          fillOpacity="0.91"
          stroke="#ffee00ce"
          strokeOpacity="0"
          strokeWidth="0"
          opacity="0.4"
          paintOrder="fill"
          rx="28.632"
          ry="28.632"
        ></rect>
        <path
          fill="#ffee00ce"
          stroke="#ffee00ce"
          strokeWidth="0"
          d="M139.789 82.006l10.252-18.742-4.485-4.246-47.738 23.869 47.337 24.029 4.966-4.085-10.332-20.825z"
          paintOrder="fill markers"
        ></path>
      </svg>
    </a>
  );
}

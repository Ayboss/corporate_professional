import React from "react";

function SearchIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.6667 27.6665C7.49341 27.6665 1.66675 21.8398 1.66675 14.6665C1.66675 7.49317 7.49341 1.6665 14.6667 1.6665C21.8401 1.6665 27.6667 7.49317 27.6667 14.6665C27.6667 21.8398 21.8401 27.6665 14.6667 27.6665ZM14.6667 3.6665C8.60008 3.6665 3.66675 8.59984 3.66675 14.6665C3.66675 20.7332 8.60008 25.6665 14.6667 25.6665C20.7334 25.6665 25.6667 20.7332 25.6667 14.6665C25.6667 8.59984 20.7334 3.6665 14.6667 3.6665Z"
        fill="#020617"
      />
      <path
        d="M26.8801 30.3867C26.7735 30.3867 26.6668 30.3733 26.5735 30.36C25.9468 30.28 24.8135 29.8533 24.1735 27.9467C23.8401 26.9467 23.9601 25.9467 24.5068 25.1867C25.0535 24.4267 25.9735 24 27.0268 24C28.3868 24 29.4535 24.52 29.9335 25.44C30.4135 26.36 30.2801 27.5333 29.5201 28.6667C28.5735 30.0933 27.5468 30.3867 26.8801 30.3867ZM26.0801 27.32C26.3068 28.0133 26.6268 28.36 26.8401 28.3867C27.0535 28.4133 27.4535 28.16 27.8668 27.56C28.2535 26.9867 28.2801 26.5733 28.1868 26.3867C28.0935 26.2 27.7201 26 27.0268 26C26.6135 26 26.3068 26.1333 26.1335 26.36C25.9735 26.5867 25.9468 26.9333 26.0801 27.32Z"
        fill="#020617"
      />
    </svg>
  );
}

export default SearchIcon;

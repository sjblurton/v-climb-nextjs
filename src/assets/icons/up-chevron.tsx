interface Props {
  height: string;
  Width: string;
  className: string;
}

export function UpChevron({ Width, height, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0"
      y="0"
      width={Width}
      height={height}
      enableBackground="new 0 0 407.436 407.436"
      version="1.1"
      viewBox="0 0 407.436 407.436"
      xmlSpace="preserve"
      className={className}
    >
      <path
        fill="#6a7a61"
        d="M203.718 91.567L0 294.621 21.179 315.869 203.718 133.924 386.258 315.869 407.436 294.621z"
      ></path>
    </svg>
  );
}

import { useRouter } from "next/router";

export const GoBack = () => {
  const router = useRouter();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 1025 1025"
      onClick={() => router.back()}
    >
      <path
        fill="#F2FCF0"
        d="M512.271 1024.54c282.923 0 512.269-229.346 512.269-512.269S795.194 0 512.271 0 0 229.348 0 512.271c0 282.923 229.348 512.269 512.271 512.269zm82.3-855.005l124.631 124.702-218.069 218.069 218.069 218.069-124.631 124.667-342.7-342.736 342.7-342.771z"
      ></path>
    </svg>
  );
};

interface ButtonProps {
  title: string;
  clickOn?: () => void;
  type?: "button" | "submit" | "reset"
  className?: string;
}

export default function Button({ title, clickOn, className, type }: ButtonProps) {
  return (
    <button
    type={type}
      className={`bg-black p-2 rounded-[5px]  text-white ${className} hover:bg-gray-800`}
      onClick={clickOn}
    >
      {title}
    </button>
  );
}

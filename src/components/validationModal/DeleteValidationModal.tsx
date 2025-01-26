import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface DeleteValidationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onComfirm: () => void;
  onCancel: () => void;
}

export default function DeleteValidationModal({
  isOpen,
  title,
  message,
  onComfirm,
  onCancel,
}: DeleteValidationModalProps) {
  if (!isOpen) return;
  return (
    <div className="inset-0 fixed z-50  p-[24px] text-black flex justify-center  backdrop-blur-sm items-center mx-auto">
      <div className="flex flex-col justify-between h-[210px] w-full md:w-[400px] overflow-y-auto p-[24px] border-black bg-[#f4f4f4] border rounded-[5px] relative">
        <button onClick={onCancel} className="absolute right-2 top-2">
          <IoMdClose size={24} />
        </button>

        <div className="flex flex-col gap-2">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>

        <div className="flex gap-2">
          <Button
            title="Cancel"
            className="bg-red-600 hover:bg-red-400"
            clickOn={onCancel}
          />
          <Button title="Confirm" className="flex-1" clickOn={onComfirm} />
        </div>
      </div>
    </div>
  );
}

import { IoMdClose } from "react-icons/io";
import Button from "../../components/Button";
import { useTodo } from "../../customHooks/useTodo";
import { useState } from "react";

interface AddTodoModalProps {
  closeModal: () => void;
}

export default function AddTodoModal({ closeModal }: AddTodoModalProps) {
  const [listName, setListName] = useState<string>("");

  const { addList } = useTodo();

  const handleAddList = () => {
    if (!listName.trim()) return;
    addList(listName);
    setListName("");
    closeModal();
  };

  return (
    <div className="inset-0 fixed z-50  p-[24px] flex justify-center  backdrop-blur-sm items-center mx-auto">
      <div className="flex flex-col gap-2 h-[160px] w-full md:w-[500px] p-5 border-black bg-[#f4f4f4] border rounded-[5px] relative">
        <button onClick={closeModal} className="absolute right-2 top-2">
          <IoMdClose size={25} />
        </button>

        <div className="flex flex-col gap-2">
          <label htmlFor="addTodo">Add your list</label>
          <input
            onChange={(e) => setListName(e.target.value)}
            value={listName}
            type="text"
            className="p-2 border rounded-[5px] border-black w-full"
          />
        </div>

        <Button title="Add List" className="w-full" clickOn={handleAddList} />
      </div>
    </div>
  );
}

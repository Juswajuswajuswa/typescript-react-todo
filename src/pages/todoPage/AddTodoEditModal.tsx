import { IoMdClose } from "react-icons/io";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import { ListContainer } from "../../types/types";
import { useTodo } from "../../customHooks/useTodo";

interface AddTodoEditModalProps {
  closeModal: () => void;
  todo: ListContainer | null;
}

export default function AddTodoEditModal({
  closeModal,
  todo,
}: AddTodoEditModalProps) {
  const [newName, setNewName] = useState<string>("");
  const [id, setId] = useState<number | null>(null);

  const { editList } = useTodo();

  useEffect(() => {
    setNewName(todo?.listName as string);
    setId(todo?.id as number);
  }, [todo]);

  const handleAddList = () => {
    if (!newName?.trim()) return;
    editList(id as number, newName);
    setNewName("")
    closeModal();
  };

  return (
    <div className="inset-0 fixed z-50  p-[24px] flex justify-center  backdrop-blur-sm items-center mx-auto">
      <div className="flex flex-col gap-2 h-[160px] w-full md:w-[500px] p-5 border-black bg-[#f4f4f4] border rounded-[5px] relative">
        <button onClick={closeModal} className="absolute right-2 top-2">
          <IoMdClose size={25} />
        </button>

        <div className="flex flex-col gap-2">
          <label htmlFor="addTodo">Edit your list name</label>
          <input
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            type="text"
            className="p-2 border rounded-[5px] border-black w-full"
          />
        </div>

       <div className="flex gap-2">
       <Button title="Cancel" className="bg-red-600" clickOn={handleAddList} />
       <Button title="Update" className="flex-1" clickOn={handleAddList} />
       </div>
      </div>
    </div>
  );
}

import { IoSearch } from "react-icons/io5";
import Button from "../../components/Button";
import { useTodo } from "../../customHooks/useTodo";

interface TopTodoProps {
  openModal: () => void;
  searchInput: (value: string) => void;
  searchValue: string;
}

export default function TopTodo({
  openModal,
  searchInput,
  searchValue,
}: TopTodoProps) {
  const { todo } = useTodo();

  return (
    <div className="flex justify-between flex-col gap-5 items-center md:flex-row">
      <div className="flex gap-2">
        <Button title="Add New Task" type="button" clickOn={openModal} />

        <div className="flex gap-2">
          <div className="bg-transparent border-black border text-black w-[70px] rounded-[5px]  flex justify-center items-center">
            0
          </div>

          <div className="bg-transparent border-black border text-black w-[70px] rounded-[5px]  flex justify-center items-center">
            0 / {todo && todo.length}
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-col-reverse md:flex-row justify-between items-center ">
        <div className="flex  gap-2">
          <Button title="Latest" className="bg-gray-600" />
          <Button title="Completed" className="bg-green-600" />
          <Button title="Pending" className="bg-blue-600" />
        </div>
        <div className="relative">
          <label
            htmlFor="search"
            className="absolute top-2 left-2 cursor-pointer"
          >
            <IoSearch size={24} />
          </label>
          <input
            type="text"
            id="search"
            value={searchValue}
            onChange={(e) => searchInput(e.target.value)}
            name="search"
            className="border-black px-10 py-2 border h-full rounded-[5px]"
          />
        </div>
      </div>
    </div>
  );
}

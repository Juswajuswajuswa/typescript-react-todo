import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { ListContainer } from "../../types/types";
import Button from "../../components/Button";

interface TodoCardProps {
  singleTodo: ListContainer;
  deleteList: (id: number) => void;
  toggleSetting: () => void;
  openSetting: boolean;

  openModal: () => void;
  handleEditListName: () => void;
}

export default function TodoCard({
  singleTodo,
  deleteList,
  toggleSetting,
  openSetting,

  openModal,
  handleEditListName,
}: TodoCardProps) {
  const completedTodos = singleTodo.todos.filter(
    (tod) => tod.completed === true
  );

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        openModal();
      }}
      className="border flex flex-col relative z-40 justify-between cursor-pointer pointer-events-auto bg-gray-500 hover:bg-black rounded-[5px] h-[150px] text-white p-2 shadow-xl w-[300px]"
    >
      <div className="flex justify-between">
        {/* Task Title */}
        <h1 className="">{singleTodo?.listName}</h1>
        {/* Settings Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSetting();
          }}
          className={`relative hover:text-blue-500 ${
            openSetting ? "text-blue-500" : ""
          } pointer-events-auto right-2 z-30`}
        >
          <HiOutlineBars3BottomRight size={24} />

          {openSetting && (
            <div className="absolute z-40 h-[100px] w-[90px] right-0 rounded-[5px] bg-white">
              <div className="flex flex-col w-full gap-1 p-2">
                <Button title="Modify" clickOn={handleEditListName} />
                <Button
                  title="Remove"
                  clickOn={() => deleteList(singleTodo.id)}
                />
              </div>
            </div>
          )}
        </button>
      </div>

      {/* No Task Message */}
      <h1 className="absolute inset-0 flex justify-center items-center text-2xl z-0 pointer-events-none">
        {singleTodo.todos ? (
          <div className="flex gap-4">
            <span>{completedTodos?.length}</span> /{" "}
            <span>{singleTodo?.todos?.length}</span>
          </div>
        ) : (
          "no list"
        )}
      </h1>

      <p className="text-xs">
        {singleTodo?.addedDate
          ? new Date(singleTodo.addedDate).toDateString()
          : ""}
      </p>
    </div>
  );
}

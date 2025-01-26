import { IoMdClose } from "react-icons/io";
import { RiDeleteBinFill } from "react-icons/ri";
import { RiEditFill } from "react-icons/ri";
import Button from "../../components/Button";
import { ListContainer } from "../../types/types";
import { useTodo } from "../../customHooks/useTodo";
import { useEffect, useState } from "react";
import DeleteValidationModal from "../../components/validationModal/DeleteValidationModal";

interface ListModalProps {
  todo: ListContainer;
  closeModal: () => void;
}

export default function ListModal({ todo, closeModal }: ListModalProps) {
  const [title, setTitle] = useState<string>("");
  const [currentTodo, setCurrentTodo] = useState<ListContainer>(todo); // Local state for the current list
  const [todoId, setTodoId] = useState<number | null>(null);

  const {
    addTodoInList,
    todo: allTodos,
    deleteTodoInList,
    setAsComplete,
    editTodoInList,
  } = useTodo();

  const [openValidationModal, setOpenValidationModal] =
    useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Sync the local `currentTodo` state with the latest data from the context
  useEffect(() => {
    const updatedTodo = allTodos.find((list) => list.id === todo.id);
    if (updatedTodo) setCurrentTodo(updatedTodo);
  }, [allTodos, todo.id]); // Dependency array to re-run on context state change

  const handleOpenValidation = (todoId: number) => {
    setSelectedId(todoId);
    setOpenValidationModal(true);
  };

  const handleCloseValidation = () => {
    setOpenValidationModal(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    deleteTodoInList(currentTodo.id, selectedId as number);
    handleCloseValidation();
  };

  const handleAddTodoInList = () => {
    if (!title.trim()) return;
    addTodoInList(todo?.id, title);
    setTitle("");
  };

  const handleEditTodoInList = () => {
    const updatedTitle = title;
    if (!updatedTitle.trim()) return;

    editTodoInList(currentTodo.id, todoId as number, updatedTitle);
    setTitle("");
    setIsEditing(false);
    setTodoId(null);
  };

  const handleTodoTitle = (todoId: number, todoTitle: string) => {
    setTodoId(todoId);
    setTitle(todoTitle);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTitle("");
    setTodoId(null);
  };

  return (
    <div className="inset-0 fixed z-50  p-[24px] text-black flex justify-center  backdrop-blur-sm items-center mx-auto">
      <DeleteValidationModal
        title="Delete"
        message="Are you sure you want to delete this list?"
        isOpen={openValidationModal}
        onCancel={handleCloseValidation}
        onComfirm={handleConfirmDelete}
      />

      <div className="h-[700px] w-full md:w-[800px] overflow-y-auto p-[24px] border-black bg-[#f4f4f4] border rounded-[5px] relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
          className="absolute z-50 right-2 top-2"
        >
          <IoMdClose size={25} />
        </button>

        <h1 className="text-xl w-full text-center">{todo?.listName}</h1>

        <div className="flex gap-2 py-[30px]">
          <input
            type="text"
            className="border border-black flex-1 p-2 rounded-[5px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {isEditing ? (
            <>
              <Button title="Update" clickOn={handleEditTodoInList} />
              <Button
                title="Cancel"
                className="bg-red-600"
                clickOn={handleCancelEdit}
              />
            </>
          ) : (
            <Button title="Add Todo" clickOn={handleAddTodoInList} />
          )}
        </div>

        <div className="flex flex-col gap-5">
          {currentTodo?.todos?.length ? (
            currentTodo.todos.map((tod) => (
              <div key={tod.id} className="flex gap-10 justify-between">
                <li
                  className={`list-none ${
                    tod.completed
                      ? "bg-green-600 hover:bg-green-600 text-white"
                      : "hover:bg-gray-600"
                  } relative w-full  hover:text-white p-2 rounded-[5px] items-center`}
                >
                  {tod.title}
                </li>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleOpenValidation(tod.id)}>
                    <RiDeleteBinFill className="text-red-600" size={24} />
                  </button>
                  <button onClick={() => handleTodoTitle(tod.id, tod.title)}>
                    <RiEditFill size={24} className="text-green-600" />
                  </button>
                  <Button
                    title={`${
                      tod.completed === true ? "Completed" : "Complete"
                    }`}
                    clickOn={() => setAsComplete(currentTodo.id, tod.id)}
                    className={`${
                      tod.completed ? "bg-green-600" : "bg-blue-600"
                    } py-1 hover:bg-blue-400`}
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No list!</p>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import TodoCard from "./TodoCard";
import TopTodo from "./TopTodo";
import AddTodoModal from "./AddTodoModal";
import { useTodo } from "../../customHooks/useTodo";
import { ListContainer } from "../../types/types";
import ListModal from "./ListModal";
import AddTodoEditModal from "./AddTodoEditModal";

export default function TodoPage() {
  const { todo, deleteList } = useTodo();

  const [currentTodo, setCurrentTodo] = useState<ListContainer | null>(null);
  const [openListModal, setOpenListModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openSettingId, setOpenSettingId] = useState<number | null>(null);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleEditCloseModal = () => {
    setOpenEditModal(false);
    setCurrentTodo(null);
  };

  const handleOpenEditModal = (todo: ListContainer) => {
    setCurrentTodo(todo);
    setOpenEditModal(true);
  };

  const handleDeleteListCard = (id: number) => {
    deleteList(id);
  };

  const handleToggleSetting = (id: number) => {
    setOpenSettingId(openSettingId === id ? null : id);
  };

  const handleOpenModal = (todo: ListContainer) => {
    setCurrentTodo(todo);
    setOpenListModal(true);
  };

  const handleCloseModal = () => {
    setCurrentTodo(null);
    setOpenListModal(false);
  };

  const filteredTodoArray = todo.filter((tod) =>
    tod.listName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-20 max-w-[1280px] mx-auto p-4 pt-[80px]">
      <TopTodo openModal={handleOpenAddModal} searchValue={searchTerm} searchInput={setSearchTerm} />
      {openAddModal && <AddTodoModal closeModal={handleCloseAddModal} />}
      {openEditModal && (
        <AddTodoEditModal
          todo={currentTodo}
          closeModal={handleEditCloseModal}
        />
      )}

      {openListModal && currentTodo && (
        <ListModal todo={currentTodo} closeModal={handleCloseModal} />
      )}

      <div className="grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-4 gap-5 ">
        {/* CARD */}

        {filteredTodoArray && filteredTodoArray.length > 0 ? (
          filteredTodoArray.map((tod) => (
            <TodoCard
              key={tod.id}
              singleTodo={tod}
              deleteList={() => handleDeleteListCard(tod.id)}
              openSetting={openSettingId === tod.id}
              toggleSetting={() => handleToggleSetting(tod.id)}
              openModal={() => handleOpenModal(tod)}
              handleEditListName={() => handleOpenEditModal(tod)}
            />
          ))
        ) : (
          <p>no list</p>
        )}
      </div>
    </div>
  );
}

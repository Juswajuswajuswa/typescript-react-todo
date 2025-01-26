import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import AuthContainer from "../../AuthModal/AuthContainer";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {

  const [openLogRegModal, setOpenLogRegModal] = useState<boolean>(false)

  const openModal = () => setOpenLogRegModal(true)
  const closeModal = () => setOpenLogRegModal(false)

  return (
    <div>
      <Navbar openModal={openModal} />

      <main className="relative">

      { openLogRegModal && (<AuthContainer closeModal={closeModal}/>) }

        <Outlet />
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}

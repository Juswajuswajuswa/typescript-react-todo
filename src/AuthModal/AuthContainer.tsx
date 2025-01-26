import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { IoMdClose } from "react-icons/io";

const tabs = (props: any) => [
  {
    id: "login",
    label: "Login",
    component: <Login {...props} />,
  },
  {
    id: "register",
    label: "Register",
    component: <Register  {...props} />,
  },
];

interface AuthContainerInterface {
    closeModal: () => void
}

export default function AuthContainer({closeModal} : AuthContainerInterface) {
  const [componentId, setComponentId] = useState<string>("login");
 

  const tabComponents = tabs({ closeModal });

  return (
    <div className="inset-0 fixed z-50  p-[24px] flex justify-center  backdrop-blur-sm items-center mx-auto">
      <div className=" h-[500px] w-full md:w-[500px] p-[24px] border-black bg-[#f4f4f4] border rounded-[5px] relative">

        <button onClick={closeModal}
        className="absolute right-2 top-2">
         <IoMdClose size={25} />
        </button>


        <div className="flex gap-10 mb-5 w-[200px] mx-auto justify-center relative border-black">
          <span className="absolute top-0  h-full inset-0 m-auto w-[1px] bg-black "></span>
          {tabComponents.map((tab) => (
            <button
              onClick={() => setComponentId(tab.id)}
              className={`p-1 border-none w-full h-full rounded-[5px] transition ease-in-out ${
                componentId === tab.id
                  ? "border-b-2 bg-black text-white "
                  : "text-gray-600"
              }`}
              key={tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>

          {/* RENDER THE COMPONETS THAT ARE PRESENT IN TABS ARRAY OBJECT */}
        <div>{tabComponents.find((tab) => tab.id === componentId)?.component}</div>
      </div>
    </div>
  );
}

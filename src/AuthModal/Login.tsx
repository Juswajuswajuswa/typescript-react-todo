import { useState } from "react";
import Button from "../components/Button";
import InputContainer from "../components/InputContainer";
import { useAuth } from "../customHooks/useAuth";
import { User } from "../types/types";
import { useNavigate } from "react-router";


interface LoginProps {
  closeModal: () => void
}


export default function Login({closeModal} : LoginProps) {
  const { login, error } = useAuth();
  const navigate = useNavigate()


  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name) {
      setUserInfo((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };



  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(userInfo.username, userInfo.password)
    setUserInfo({ username: "", password: "" });
    closeModal()
    navigate("/");
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col">

{
        error && (
          <span className="text-red-700 text-center">{error}</span>
        )
      }

      <div className="flex flex-col mt-10 gap-5">
        <InputContainer>
          <label htmlFor="username">Username: </label>
          <input
            className="border border-black p-2 outline-none rounded-[2.5px]"
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Password: </label>
          <input
            className="border border-black p-2 outline-none rounded-[2.5px]"
            type="password"
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </InputContainer>
        <Button title="Login" type="submit" />
      </div>
    </form>
  );
}

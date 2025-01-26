import { useState } from "react";
import Button from "../components/Button";
import InputContainer from "../components/InputContainer";
import { User } from "../types/types";
import { useAuth } from "../customHooks/useAuth";



export default function Register() {
  const { register, error } = useAuth();

  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    password: "",
  });
  const [comfirmPassword, setComfirmPassword] = useState<string>("");

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
    register(userInfo.username, userInfo.password, comfirmPassword);
    setUserInfo({username: "", password: ""})
    setComfirmPassword("")
 
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col">
      {error && <span className="text-red-700 text-center">{error}</span>}

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
        <InputContainer>
          <label htmlFor="password">Confirm Password: </label>
          <input
            className="border border-black p-2 outline-none rounded-[2.5px]"
            type="password"
            id="password2"
            name="password2"
            value={comfirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
          />
        </InputContainer>
        <Button title="Register" type="submit" />
      </div>
    </form>
  );
}

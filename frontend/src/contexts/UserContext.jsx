import { createContext, createSignal } from "solid-js";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = createSignal(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

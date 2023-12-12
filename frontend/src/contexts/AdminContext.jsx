import { createContext, createSignal } from "solid-js";

export const AdminContext = createContext();

export const AdminProvider = (props) => {
  const [admin, setAdmin] = createSignal(null);

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {props.children}
    </AdminContext.Provider>
  );
};

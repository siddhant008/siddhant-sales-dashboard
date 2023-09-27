import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/dashboard";

import PersistentDrawerLeft from "./components/home/PersistentDrawer";
import { createContext, useState } from "react";
import { arrayType } from "./components/types";

export const FileContext = createContext<{
  file: arrayType[];
  setFile: (newValue: arrayType[]) => void;
}>({
  file: [],
  setFile: () => undefined,
});
function App() {
  const [file, setFile] = useState<arrayType[]>([]);

  return (
    <>
      <FileContext.Provider value={{ file: file, setFile: setFile }}>
        <Routes>
          <Route element={<PersistentDrawerLeft />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to={{ pathname: "/home" }} />} />
          </Route>
        </Routes>
      </FileContext.Provider>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRenderer from "./pageRender";
import pagePaths  from "./data";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {pagePaths.map(path => (
          <Route
            key={path}
            path={path}
            element={<PageRenderer />}
          />

          
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

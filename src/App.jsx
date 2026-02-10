import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageRenderer from "./pageRender";
import pagePaths  from "./data";
import Loader from "./test";

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
      <Loader/>
    </BrowserRouter>
  );
}

export default App;






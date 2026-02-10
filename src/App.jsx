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



//newly added code to render pages based on the paths defined in the data file. Each path will render the PageRenderer component, which will handle the logic for displaying the appropriate content based on the URL.


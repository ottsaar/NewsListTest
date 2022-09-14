import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ArticleThumbnail } from "./components/ArticleThumbnail";
import { Articles } from "./components/Articles";
import { Titlebar } from "./components/Titlebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Titlebar />}>
          <Route index element={<Articles />}></Route>
          <Route path="news/:newsId" element={<></>} />
          <Route
            path="news"
            element={<ArticleThumbnail title="suva" imgSrc="" id="suva" />}
          />
          <Route
            path="*"
            element={
              <div>
                <p>teEROOEROKEPOSKDFre</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

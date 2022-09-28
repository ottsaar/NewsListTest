import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ArticleThumbnail } from "./components/ArticleThumbnail";
import { ArticleView } from "./components/ArticleView";
import { Articles } from "./components/Articles";
import { Titlebar } from "./components/Titlebar";
import { ErrorPage } from "./components/ErrorPage";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRouter />
    </BrowserRouter>
  );
}

function AnimatedRouter() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes key={location.key} location={location}>
        <Route path="/" element={<Titlebar />}>
          <Route index element={<Articles />}></Route>
          <Route path="news/:newsId" element={<ArticleView />} />
          <Route
            path="news"
            element={<ArticleThumbnail title="suva" imgSrc="" id="suva" />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;

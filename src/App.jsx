import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Show from "./pages/Show";
import Create from "./pages/Create";
import { AuthProvider } from "./contexts/AuthContext";
import LogIn from "./pages/Login";
import PrivatePage from "./middleware/PrivatePage";

function App() {

  return (
    <BrowserRouter>

      <AuthProvider>
        <Routes>

          {/* Rotte Pubbliche */}
          <Route element={<DefaultLayout />} >
            <Route index element={<Home />} />
            <Route path="login" element={<LogIn />} />
            <Route path="index" element={<Index />} />
            <Route path="/show/:slug" element={<Show />} />
          </Route>

          {/* Rotte Private */}
          <Route element={
            <PrivatePage>
              <DefaultLayout />
            </PrivatePage>
          }>
            <Route path="create" element={<Create />} />
          </Route>

        </Routes>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App

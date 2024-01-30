import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeaturedSection from "./components/FeaturedSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PromptList from "./pages/PromptList";
import { AuthProvider } from "./contexts/AuthContext";
import UserDetailsPage from "./pages/UserDetailsPage";
import AddPrompt from "./pages/AddPrompt";
import EditPrompt from "./pages/EditPrompt";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow ">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <HeroSection />
                    <FeaturedSection />
                  </>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/promptList" element={<PromptList />} />
              <Route path="/profile" element={<UserDetailsPage/>} />
              <Route path="/addPrompt" element={<AddPrompt/>} />
              <Route path="/editPrompt" element={<EditPrompt/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

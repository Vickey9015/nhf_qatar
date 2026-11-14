import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PestCursor from "./components/PestCursor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AudiencePage from "./pages/AudiencePage";
import PestPage from "./pages/PestPage";
import IndustriesPage from "./pages/IndustriesPage";
import IndustryPage from "./pages/IndustryPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PestCursor />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/residential" element={<AudiencePage kind="residential" />} />
        <Route path="/commercial" element={<AudiencePage kind="commercial" />} />
        <Route path="/pests/:id" element={<PestPage />} />
        <Route path="/industries" element={<IndustriesPage />} />
        <Route path="/industries/:id" element={<IndustryPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

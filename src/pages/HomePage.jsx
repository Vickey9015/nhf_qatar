import Hero from "../components/Hero";
import Intro from "../components/Intro";
import Pests from "../components/Pests";
import Solutions from "../components/Solutions";
import Process from "../components/Process";
import BlogTeaser from "../components/BlogTeaser";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Intro />
      <Pests />
      <Solutions />
      <Process />
      <BlogTeaser />
      <Testimonials />
    </main>
  );
}

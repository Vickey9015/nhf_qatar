import { Link } from "react-router-dom";
import { posts } from "../catalog";
import { PageBanner } from "../components/PageFrame";

export default function BlogPage() {
  return (
    <main>
      <PageBanner
        kicker="Notes from the desk"
        title="Blog"
        image="/images/industry-food.jpg"
        text="Short notes on booking a visit, reading the signs, and looking after a kitchen or a bedroom in Doha."
      />
      <section className="section">
        <div className="container blog-grid">
          {posts.map((post) => (
            <Link className="blog-card" key={post.slug} to={`/blog/${post.slug}`}>
              <img src={post.image} alt="" />
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

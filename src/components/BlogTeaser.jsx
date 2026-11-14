import { Link } from "react-router-dom";
import { posts } from "../catalog";

export default function BlogTeaser() {
  return (
    <section className="home-blog">
      <div className="container">
        <h2 className="band">NHF Arabia blog</h2>
        <div className="blog-grid">
          {posts.slice(0, 3).map((post) => (
            <article key={post.slug}>
              <img src={post.image} alt="" />
              <h3>
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.excerpt}</p>
              <Link className="btn btn-green" to={`/blog/${post.slug}`}>
                Read more
              </Link>
            </article>
          ))}
        </div>
        <p className="blog-more">
          <Link className="btn btn-gold" to="/blog">
            View all blogs
          </Link>
        </p>
      </div>
    </section>
  );
}

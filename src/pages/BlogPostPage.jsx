import { Link, useParams } from "react-router-dom";
import { formatPostDate } from "../catalog";
import { PageBanner, PageCta } from "../components/PageFrame";
import { useSite } from "../site-context";
import NotFoundPage from "./NotFoundPage";

export default function BlogPostPage() {
  const { slug } = useParams();
  const { posts, postsReady } = useSite();
  const post = posts.find((item) => item.slug === slug);

  if (!post && !postsReady) return null;
  if (!post) return <NotFoundPage />;

  return (
    <main>
      <PageBanner kicker={formatPostDate(post.date)} title={post.title} image={post.image} />
      <section className="section">
        <div className="container post-body">
          <img className="post-photo" src={post.image} alt="" />
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>
            <Link to="/blog">All notes</Link>
          </p>
        </div>
      </section>
      <PageCta text="If the note matches what you are seeing, ask for a time." />
    </main>
  );
}

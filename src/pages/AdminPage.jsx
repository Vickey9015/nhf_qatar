import { useEffect, useState } from "react";
import "../admin.css";

const blankPost = () => ({
  originalSlug: "",
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  image: "/images/industry-food.jpg",
  excerpt: "",
  paragraphsText: "",
});

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export default function AdminPage() {
  const [csrf, setCsrf] = useState("");
  const [phase, setPhase] = useState("loading");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("blogs");
  const [posts, setPosts] = useState([]);
  const [draft, setDraft] = useState(null);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState(null);
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  async function call(path, payload, token = csrf) {
    const response = await fetch(path, {
      method: payload ? "POST" : "GET",
      headers: {
        ...(payload ? { "Content-Type": "application/json" } : {}),
        ...(token ? { "X-CSRF-Token": token } : {}),
      },
      credentials: "same-origin",
      body: payload ? JSON.stringify(payload) : undefined,
    });
    const data = await response.json().catch(() => {
      throw new Error("The admin service is not available on this server yet.");
    });
    if (!response.ok) throw new Error(data.error || "Request failed.");
    if (data.csrf) setCsrf(data.csrf);
    return data;
  }

  async function loadPanel(token) {
    const [blogData, messageData, settingsData] = await Promise.all([
      call("/api/blogs.php", null, token),
      call("/api/enquiries.php", null, token),
      call("/api/settings.php", null, token),
    ]);
    setPosts(blogData.posts || []);
    setMessages(messageData.items || []);
    setSettings(settingsData.settings || null);
    setPhase("ready");
  }

  useEffect(() => {
    let active = true;
    fetch("/api/auth.php", { credentials: "same-origin" })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok || !data) {
          throw new Error(data?.error || "The admin service did not respond.");
        }
        return data;
      })
      .then((data) => {
        if (!active) return;
        setCsrf(data.csrf || "");
        if (data.authenticated) {
          loadPanel(data.csrf).catch((reason) => {
            setError(reason.message);
            setPhase("offline");
          });
          return;
        }
        setPhase(data.setupRequired ? "setup" : "login");
      })
      .catch((reason) => {
        if (!active) return;
        setError(reason.message || "The admin service did not respond.");
        setPhase("offline");
      });
    return () => {
      active = false;
    };
  }, []);

  async function submitPassword(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await call("/api/auth.php", {
        action: phase === "setup" ? "setup" : "login",
        password,
      });
      setPassword("");
      await loadPanel(data.csrf);
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await call("/api/auth.php", { action: "logout" }).catch(() => {});
    setPhase("login");
    setDraft(null);
  }

  function editPost(post) {
    setNotice("");
    setDraft({
      originalSlug: post.slug,
      slug: post.slug,
      title: post.title,
      date: post.date,
      image: post.image,
      excerpt: post.excerpt,
      paragraphsText: (post.paragraphs || []).join("\n\n"),
    });
  }

  async function savePost(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await call("/api/blogs.php", {
        action: "save",
        originalSlug: draft.originalSlug,
        post: {
          slug: draft.slug || slugify(draft.title),
          title: draft.title,
          date: draft.date,
          image: draft.image,
          excerpt: draft.excerpt,
          paragraphs: draft.paragraphsText.split(/\n\s*\n/).map((item) => item.trim()),
        },
      });
      setPosts(data.posts || []);
      setDraft(null);
      setNotice("Blog saved. It is live on the blog page.");
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  async function deletePost(slug) {
    if (!window.confirm("Delete this blog post?")) return;
    setError("");
    try {
      const data = await call("/api/blogs.php", { action: "delete", slug });
      setPosts(data.posts || []);
      setNotice("Blog deleted.");
    } catch (reason) {
      setError(reason.message);
    }
  }

  async function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      body.append("image", file);
      const response = await fetch("/api/upload.php", {
        method: "POST",
        headers: { "X-CSRF-Token": csrf },
        credentials: "same-origin",
        body,
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Upload failed.");
      setDraft((current) => ({ ...current, image: data.image }));
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  async function deleteMessage(id) {
    setError("");
    try {
      const data = await call("/api/enquiries.php", { action: "delete", id });
      setMessages(data.items || []);
    } catch (reason) {
      setError(reason.message);
    }
  }

  async function saveSettings(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const data = await call("/api/settings.php", { settings });
      setSettings(data.settings);
      setNotice("Site details saved. Refresh the public site to see them.");
    } catch (reason) {
      setError(reason.message);
    } finally {
      setBusy(false);
    }
  }

  if (phase === "loading") {
    return (
      <main className="admin">
        <section className="admin-card">
          <p>Opening admin…</p>
        </section>
      </main>
    );
  }

  if (phase === "offline") {
    return (
      <main className="admin">
        <section className="admin-card">
          <img className="admin-brand" src="/logo.png" alt="" />
          <h1>Admin</h1>
          <p className="admin-error">
            {error || "This panel runs on the live site after the build is uploaded. PHP has to be available there."}
          </p>
        </section>
      </main>
    );
  }

  if (phase === "setup" || phase === "login") {
    return (
      <main className="admin">
        <section className="admin-card">
          <img className="admin-brand" src="/logo.png" alt="" />
          <h1>{phase === "setup" ? "Set the admin password" : "Admin sign in"}</h1>
          <p className="admin-lead">
            {phase === "setup"
              ? "This is asked once. Choose a password you can remember, then use it to sign in later."
              : "Sign in to update blogs, read contact messages, and change the phone and email."}
          </p>
          <form onSubmit={submitPassword}>
            <label>
              Password
              <input
                type="password"
                autoComplete={phase === "setup" ? "new-password" : "current-password"}
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            {error ? <p className="admin-error">{error}</p> : null}
            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                {phase === "setup" ? "Save password" : "Sign in"}
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  const sections = [
    ["blogs", "Blogs", posts.length],
    ["messages", "Messages", messages.length],
    ["details", "Site details", null],
  ];
  const sectionTitle = sections.find(([id]) => id === tab)?.[1] || "Admin";

  function openSection(id) {
    setTab(id);
    setDraft(null);
    setError("");
    setNotice("");
    setNavOpen(false);
  }

  return (
    <main className={`admin-shell${navOpen ? " nav-open" : ""}`}>
      <aside className="admin-side">
        <div className="admin-side-brand">
          <img src="/logo.png" alt="" />
          <div>
            <strong>NHF Arabia</strong>
            <span>Admin</span>
          </div>
        </div>
        <nav>
          {sections.map(([id, label, count]) => (
            <button
              className={tab === id ? "active" : ""}
              key={id}
              type="button"
              onClick={() => openSection(id)}
            >
              {label}
              {count === null ? null : <span>{count}</span>}
            </button>
          ))}
        </nav>
        <button className="admin-signout" type="button" onClick={logout}>
          Sign out
        </button>
      </aside>
      <section className="admin-main">
        <header className="admin-head">
          <div>
            <button className="admin-menu" type="button" onClick={() => setNavOpen((open) => !open)}>
              Menu
            </button>
            <h1>{draft ? "Edit blog" : sectionTitle}</h1>
            <p>
              {tab === "blogs" && !draft ? "Create and update the notes on the public blog." : null}
              {tab === "blogs" && draft ? "Leave a blank line between paragraphs." : null}
              {tab === "messages" ? "Messages sent from the contact form." : null}
              {tab === "details" ? "Phone, email, and the lines shown across the site." : null}
            </p>
          </div>
          {tab === "blogs" && !draft ? (
            <div className="admin-actions">
              <button type="button" onClick={() => setDraft(blankPost())}>
                New blog
              </button>
              <a className="admin-link" href="/blog" target="_blank" rel="noreferrer">
                View blog
              </a>
            </div>
          ) : null}
        </header>
        {error ? <p className="admin-error">{error}</p> : null}
        {notice ? <p className="admin-ok">{notice}</p> : null}

        {tab === "blogs" && !draft ? (
          <div className="admin-stage">
            {posts.length === 0 ? <p className="admin-empty">No blogs yet.</p> : null}
            {posts.map((post) => (
              <article className="admin-row" key={post.slug}>
                <img src={post.image} alt="" />
                <div>
                  <h2>{post.title}</h2>
                  <p className="admin-meta">/{post.slug}</p>
                  <p>{post.excerpt}</p>
                </div>
                <div className="admin-row-actions">
                  <button type="button" onClick={() => editPost(post)}>
                    Edit
                  </button>
                  <button className="danger" type="button" onClick={() => deletePost(post.slug)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {tab === "blogs" && draft ? (
          <form className="admin-stage admin-form" onSubmit={savePost}>
            <label>
              Title
              <input
                value={draft.title}
                onChange={(event) => {
                  const title = event.target.value;
                  setDraft((current) => ({
                    ...current,
                    title,
                    slug: current.originalSlug ? current.slug : slugify(title),
                  }));
                }}
                required
              />
            </label>
            <div className="admin-split">
              <label>
                Address slug
                <input
                  value={draft.slug}
                  onChange={(event) => setDraft({ ...draft, slug: slugify(event.target.value) })}
                  required
                />
              </label>
              <label>
                Date
                <input
                  type="date"
                  value={draft.date}
                  onChange={(event) => setDraft({ ...draft, date: event.target.value })}
                  required
                />
              </label>
            </div>
            <label>
              Excerpt
              <input
                value={draft.excerpt}
                onChange={(event) => setDraft({ ...draft, excerpt: event.target.value })}
                required
              />
            </label>
            <label>
              Image address
              <input
                value={draft.image}
                onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                required
              />
            </label>
            <label>
              Upload a new image
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadImage} />
            </label>
            {draft.image ? <img className="admin-photo" src={draft.image} alt="" /> : null}
            <label>
              Article
              <textarea
                value={draft.paragraphsText}
                onChange={(event) => setDraft({ ...draft, paragraphsText: event.target.value })}
                placeholder="Write the article. Leave a blank line between paragraphs."
                required
              />
            </label>
            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                Save blog
              </button>
              <button className="secondary" type="button" onClick={() => setDraft(null)}>
                Cancel
              </button>
            </div>
          </form>
        ) : null}

        {tab === "messages" ? (
          <div className="admin-stage">
            {messages.length === 0 ? <p className="admin-empty">No messages yet.</p> : null}
            {messages.map((item) => (
              <article className="admin-row admin-message" key={item.id}>
                <span className="admin-avatar" aria-hidden="true">
                  {(item.name || "?").slice(0, 1).toUpperCase()}
                </span>
                <div>
                  <h2>{item.name}</h2>
                  <p className="admin-meta">
                    {item.createdAt?.replace("T", " ").slice(0, 16)} · {item.phone}
                    {item.email ? ` · ${item.email}` : ""}
                  </p>
                  <p>{[item.property, item.service].filter(Boolean).join(" · ")}</p>
                  <p>{item.message}</p>
                </div>
                <div className="admin-row-actions">
                  <a className="admin-link" href={`tel:${item.phone}`}>
                    Call
                  </a>
                  {item.email ? (
                    <a className="admin-link" href={`mailto:${item.email}`}>
                      Email
                    </a>
                  ) : null}
                  <button className="danger" type="button" onClick={() => deleteMessage(item.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {tab === "details" && settings ? (
          <form className="admin-stage admin-form" onSubmit={saveSettings}>
            {[
              ["phoneDisplay", "Phone"],
              ["email", "Info email"],
              ["salesEmail", "Sales email"],
              ["location", "Location"],
              ["crNumber", "CR number"],
              ["topNote", "Top bar line"],
              ["hours", "Hours line"],
            ].map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  value={settings[key] || ""}
                  onChange={(event) => setSettings({ ...settings, [key]: event.target.value })}
                />
              </label>
            ))}
            <div className="admin-actions">
              <button type="submit" disabled={busy}>
                Save details
              </button>
            </div>
            <p className="admin-note">
              Later uploads: do not replace the data folder on the server, or saved blogs and
              messages will be wiped.
            </p>
          </form>
        ) : null}
      </section>
    </main>
  );
}

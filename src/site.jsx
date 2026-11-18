import { useEffect, useState } from "react";
import { SiteContext, applySettings, baseCompany, basePosts } from "./site-context";

export function SiteProvider({ children }) {
  const [company, setCompany] = useState(() => applySettings(baseCompany));
  const [posts, setPosts] = useState(basePosts);
  const [postsReady, setPostsReady] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/settings.php").then((response) => (response.ok ? response.json() : null)).catch(() => null),
      fetch("/api/blogs.php").then((response) => (response.ok ? response.json() : null)).catch(() => null),
    ]).then(([settingsData, blogData]) => {
      if (!active) return;
      if (settingsData?.settings) setCompany(applySettings(baseCompany, settingsData.settings));
      if (Array.isArray(blogData?.posts)) setPosts(blogData.posts);
      setPostsReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <SiteContext.Provider value={{ company, posts, postsReady }}>
      {children}
    </SiteContext.Provider>
  );
}

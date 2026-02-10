// src/pages/PageRenderer.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#816678",
    display: "flex",
    justifyContent: "center",
    padding: "40px",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "1400px",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  content: {
    lineHeight: "1.7",
    fontSize: "16px",
    color: "#393333",
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
};

function PageRenderer() {
  const { pathname } = useLocation();

  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        setLoading(true);
        setError(null);

        // Backend API expects path
        const response = await fetch(
          `http://localhost:3000${pathname}`
        );

        
        if (!response.ok) {
          throw new Error("Failed to load page");
        }

        const data = await response.json();

        // backend returns { content: "<p>...</p>" }
        setHtml(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [pathname]); // 👈 refetch when route changes

  if (loading) return <Loader />;
  if (error) return <ErrorBox message={error} />;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div
          style={styles.content}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(html),
          }}
        />
      </div>
    </div>
  );
}
function Loader() {
  return (
    <div style={styles.center}>
      <p>Loading page...</p>
    </div>
  );
}

function ErrorBox({ message }) {
  return (
    <div style={{ ...styles.center, color: "red" }}>
      <p>{message}</p>
    </div>
  );
}

export default PageRenderer;

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    padding: "40px",
  },
  card: {
    backgroundColor: "#ffffff",
    width: "100%",
    maxWidth: "900px",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  content: {
    lineHeight: "1.7",
    fontSize: "16px",
    color: "#333",
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
};

function HtmlContentPage() {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch("http://localhost:3000/pages/user-term-conditions-page");

        if (!response.ok) {
          throw new Error("Failed to load content");
        }

        const data = await response.json();

        // assume backend sends { content: "<p>...</p>" }
        setHtml(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBox message={error} />;
  }

  const cleanHTML = DOMPurify.sanitize(html);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div
          style={styles.content}
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
      </div>
    </div>
  );
}
function Loader() {
  return (
    <div style={styles.center}>
      <p>Loading content...</p>
    </div>
  );
}
function ErrorBox({ message }) {
  return (
    <div style={{ ...styles.center, color: "red" }}>
      <p>Error: {message}</p>
    </div>
  );
}

export default HtmlContentPage;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Api/Axios";

const DashBoard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get("/posts")
      .then((res) => {
        setPosts(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="container py-5">
        <p style={{ color: "#64748b" }}>Loading dashboard…</p>
      </div>
    );
  }

  /* ---------- Error / Empty ---------- */
  if (error || posts.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h5 style={{ color: "#0f172a" }}>No blogs found</h5>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Start by creating your first blog.
        </p>
        <Link to="/create-blog" style={primaryBtn}>
          Create Blog
        </Link>
      </div>
    );
  }

  /* ---------- Frontend Calculations ---------- */
  const totalBlogs = posts.length;
  const publishedBlogs = posts.filter(
    (p) => p.status === "PUBLISHED"
  ).length;
  const draftBlogs = posts.filter(
    (p) => p.status === "DRAFT"
  ).length;

  const recentBlogs = posts.slice(0, 5);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-4">
        <h2 style={{ fontWeight: "600", color: "#0f172a" }}>
          Dashboard
        </h2>
        <p style={{ color: "#64748b", fontSize: "14px" }}>
          Overview of your blog activity
        </p>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-5">
        <Stat title="Total Blogs" value={totalBlogs} />
        <Stat title="Published" value={publishedBlogs} />
        <Stat title="Drafts" value={draftBlogs} />
        <Stat title="Views" value={0} />
      </div>

      {/* Recent Blogs */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 style={{ margin: 0 }}>Recent Blogs</h5>
        <Link to="/create-blog" style={primaryBtn}>
          Create Blog
        </Link>
      </div>

      <div style={tableWrapper}>
        <table className="table mb-0">
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentBlogs.map((blog) => (
              <tr key={blog.id}>
                <td>{blog.title || "Untitled"}</td>
                <td>
                  <StatusBadge status={blog.status || "DRAFT"} />
                </td>
                <td>
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <Link
                    to={`/posts/edit/${blog.id}`}
                    style={linkBtn}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ---------- Small Components ---------- */

const Stat = ({ title, value }) => (
  <div className="col-md-3">
    <div style={statCard}>
      <p style={statTitle}>{title}</p>
      <h3 style={statValue}>{value}</h3>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const published = status === "PUBLISHED";

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        background: published ? "#dcfce7" : "#fef3c7",
        color: published ? "#166534" : "#92400e",
      }}
    >
      {status}
    </span>
  );
};

/* ---------- Styles ---------- */

const statCard = {
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "18px",
  background: "#ffffff",
};

const statTitle = {
  margin: 0,
  fontSize: "13px",
  color: "#64748b",
};

const statValue = {
  marginTop: "6px",
  fontWeight: "600",
};

const tableWrapper = {
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  overflow: "hidden",
  background: "#ffffff",
};

const primaryBtn = {
  padding: "8px 16px",
  background: "#0f766e",
  color: "#ffffff",
  borderRadius: "6px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
};

const linkBtn = {
  fontSize: "13px",
  color: "#0f766e",
  textDecoration: "none",
  fontWeight: "500",
};

export default DashBoard;

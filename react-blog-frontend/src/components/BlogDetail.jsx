import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../Api/Axios";

const BlogDetail = () => {
  const [blog, setBlog] = useState({});
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setBlog(res.data);
    } catch (error) {
      console.error("Failed to load blog", error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  return (
    <div className="container py-5" style={{ maxWidth: "900px" }}>
      {/* Back */}
      <Link to="/blog" className="btn btn-outline-secondary mb-4">
        ← Back to Blogs
      </Link>

      {/* Blog Card */}
      <div className="card border-0 shadow-sm p-4 p-md-5">
        {/* Title */}
        <h1
          className="fw-bold mb-3"
          style={{ lineHeight: "1.3", color: "#0f172a" }}
        >
          {blog.title}
        </h1>

        {/* Date */}
        {blog.createdAt && (
          <div className="text-muted mb-4" style={{ fontSize: "14px" }}>
            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        )}

        {/* Cover Image */}
        {blog.imagePath && (
          <div className="mb-4">
            <img
              src={`http://localhost:8000/uploads/blogs/${blog.imagePath}`}
              alt={blog.title}
              className="img-fluid rounded"
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div
          className="blog-content"
          style={{
            fontSize: "17px",
            lineHeight: "1.9",
            color: "#1f2937",
          }}
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {/* Divider */}
        <hr className="my-5" />

        {/* Author Footer */}
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "48px",
              height: "48px",
              background: "#0f766e",
              color: "#fff",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            {blog.author?.charAt(0).toUpperCase()}
          </div>

          <div className="ms-3">
            <div className="fw-semibold" style={{ color: "#0f172a" }}>
              {blog.author}
            </div>
            <div className="text-muted" style={{ fontSize: "13px" }}>
              Author
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

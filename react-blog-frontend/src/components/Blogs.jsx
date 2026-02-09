import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import api from "../Api/Axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [keyword, setKeyword] = useState("");

  /* ---------- Fetch All Blogs (DEFAULT) ---------- */
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/posts");
      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------- Search Blogs by TITLE ---------- */
  const searchBlogs = async (event) => {
    event.preventDefault();

    // if search is empty → show all blogs
    if (!keyword.trim()) {
      fetchBlogs();
      return;
    }

    try {
      const res = await api.get("/posts/search", {
        params: { title: keyword },
      });

      setBlogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error(error);
    }
  };

  /* ---------- Reset Search ---------- */
  const resetSearch = () => {
    setKeyword("");
    fetchBlogs(); // 👈 show all blogs again
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const primaryBtn = {
    padding: "8px 16px",
    background: "#0f766e",
    color: "#ffffff",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  };

  return (
    <div className="container">
      {/* Search */}
      <div className="d-flex justify-content-center pt-5 mb-4">
        <form onSubmit={searchBlogs}>
          <div className="d-flex">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="form-control"
              placeholder="Search by title"
            />

            <button type="submit" className="btn ms-2" style={primaryBtn}>
              Search
            </button>

            <button
              type="button"
              style={primaryBtn}
              onClick={resetSearch}
              className="btn ms-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Header */}
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h3>Blogs</h3>
        <a href="/create" style={primaryBtn} className="btn">
          Create Blog
        </a>
      </div>

      {/* Blog List */}
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          ))
        ) : (
          <p className="text-center text-muted">No blogs found</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;

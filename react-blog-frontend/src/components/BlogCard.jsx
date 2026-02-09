import React from "react";
import { toast } from "react-toastify";
import api from "../Api/Axios";
import defaultBg from "../assets/B1.jpg";
import { Link } from "react-router-dom";
import './Common.css'; 

const BlogCard = ({ blog, blogs, setBlogs }) => {

  const getBackgroundImage = () => {
    return blog.image
      ? `http://localhost:8000/uploads/blogs/${blog.image}`
      : defaultBg;
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await api.delete(`/posts/${id}`);

      setBlogs(blogs.filter((b) => b.id !== id));
      toast.success("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div
        className="blog-card position-relative rounded shadow-sm overflow-hidden"
        style={{
          height: "280px",
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>

        {/* Content */}
        <div className="content position-relative h-100 d-flex flex-column justify-content-end p-3">
          <h5 className="text-white fw-semibold mb-2 text-truncate">
            {blog.title}
          </h5>

          <p className="text-light small mb-3 text-truncate">
            {blog.short_desc}
          </p>

          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/posts/${blog.id}`} className="btn btn-sm btn-light">
              Read More
            </Link>

            <div className="d-flex gap-2">
              <Link to={`/posts/edit/${blog.id}`} className="text-white">
                ✏️
              </Link>

              <span
                className="text-danger cursor-pointer"
                onClick={() => deleteBlog(blog.id)}
                style={{ cursor: "pointer" }}
              >
                🗑️
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

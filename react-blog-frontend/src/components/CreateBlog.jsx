import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import api from "../Api/Axios";

const CreateBlog = () => {
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState(null);
  const [status, setStatus] = useState("PUBLISHED"); // 👈 DRAFT / PUBLISHED

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* ---------- Editor ---------- */
  const handleEditorChange = (e) => {
    setDescription(e.target.value);
  };

  /* ---------- Image Upload ---------- */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await api.post("/save-temp-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.data?.image?.path) {
        toast.error("Image upload failed");
        return;
      }

      setImagePath(res.data.image.path);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Image upload error");
    }
  };

  /* ---------- Submit ---------- */
  const onSubmit = async (data) => {
    if (!description.trim()) {
      toast.error("Content is required");
      return;
    }

    const payload = {
      title: data.title,
      shortDescription: data.shortDescription,
      description: description,
      imagePath: imagePath,
      status: status, // 👈 important
    };

    try {
      await api.post("/posts", payload);

      toast.success(
        status === "DRAFT"
          ? "Blog saved as draft"
          : "Blog published successfully"
      );

      navigate("/blog");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save blog");
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Create Blog</h4>
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
          Back
        </Link>
      </div>

      {/* Form */}
      <div className="card border-0 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                {...register("title", { required: true })}
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Enter blog title"
              />
              {errors.title && (
                <div className="invalid-feedback">Title is required</div>
              )}
            </div>

            {/* Short Description */}
            <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                {...register("shortDescription", { required: true })}
                rows="3"
                className={`form-control ${
                  errors.shortDescription ? "is-invalid" : ""
                }`}
                placeholder="Brief summary of the blog"
              />
              {errors.shortDescription && (
                <div className="invalid-feedback">
                  Short description is required
                </div>
              )}
            </div>

            {/* Content */}
            <div className="mb-3">
              <label className="form-label">Content</label>
              <Editor
                value={description}
                onChange={handleEditorChange}
                containerProps={{ style: { height: "500px" } }}
              />
            </div>

            {/* Image */}
            <div className="mb-4">
              <label className="form-label">Cover Image (optional)</label>
              <input
                type="file"
                className="form-control"
                onChange={handleImageUpload}
              />
            </div>

            {/* Actions */}
            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-outline-dark btn-sm px-4"
                onClick={() => setStatus("DRAFT")}
              >
                Save as Draft
              </button>

              <button
                type="submit"
                className="btn btn-outline-dark btn-sm px-4"
                onClick={() => setStatus("PUBLISHED")}
              >
                Publish Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

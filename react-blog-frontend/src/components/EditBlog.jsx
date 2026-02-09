import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import api from "../Api/Axios";

const EditBlog = () => {
    const [blog, setBlog] = useState(null);
    const [html, setHtml] = useState('');
    const [imagePath, setImagePath] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // 🔹 WYSIWYG change
    const onChange = (e) => {
        setHtml(e.target.value);
    };

    // 🔹 Upload Image
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await api.post("/save-temp-image", formData);
            setImagePath(res.data.imagePath);
            toast.success("Image uploaded");
        } catch (error) {
            console.error(error);
            toast.error("Image upload failed");
        }
    };

    // 🔹 Fetch Blog
    const fetchBlog = async () => {
        try {
            const res = await api.get(`/posts/${id}`);
            const post = res.data;

            setBlog(post);
            setHtml(post.description || '');
            setImagePath(post.imagePath || null);

            reset({
                title: post.title,
                shortDescription: post.shortDescription,
                author: post.author
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to load blog");
        }
    };

    // 🔹 Update Blog
    const formSubmit = async (data) => {
        const payload = {
            title: data.title,
            shortDescription: data.shortDescription,
            description: html,
            imagePath: imagePath
        };

        try {
            await api.put(`/posts/edit/${id}`, payload);
            toast.success("Blog updated successfully");
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update blog");
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    if (!blog) return null;

    return (
        <div className="container">
            <div className="d-flex justify-content-between pt-5 mb-4">
                <h4>Edit Blog</h4>
                <button onClick={() => navigate(-1)} className="btn btn-dark">
                    Back
                </button>
            </div>

            <div className="card border-0 shadow-lg mb-5">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className="card-body">

                        {/* Title */}
                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input
                                {...register("title", { required: true })}
                                className={`form-control ${errors.title && 'is-invalid'}`}
                            />
                            {errors.title && (
                                <div className="invalid-feedback">Title is required</div>
                            )}
                        </div>

                        {/* Short Description */}
                        <div className="mb-3">
                            <label className="form-label">Short Description</label>
                            <textarea
                                {...register("shortDescription")}
                                rows="4"
                                className="form-control"
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <Editor
                                value={html}
                                onChange={onChange}
                                containerProps={{ style: { height: '500px' } }}
                            />
                        </div>

                        {/* Image */}
                        <div className="mb-3">
                            <label className="form-label">Image</label><br />
                            <input type="file" onChange={handleFileChange} />

                            {imagePath && (
                                <div className="mt-3">
                                    <img
                                        src={`http://localhost:8000/uploads/blogs/${imagePath}`}
                                        alt="Blog"
                                        className="w-50"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Author (read-only) */}
                        {/* <div className="mb-3">
                            <label className="form-label">Author</label>
                            <input
                                value={blog.author}
                                readOnly
                                className="form-control"
                            />
                        </div> */}

                        <button type="submit" className="btn btn-dark">
                            Update
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;

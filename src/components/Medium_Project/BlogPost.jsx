import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BlogPost = () => {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [bodyContent, setBodyContent] = useState('');
    const [editBlogId, setEditBlogId] = useState(null);

    // Fetching blogs from API
    const fetchBlog = async () => {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setBlogs(response.data.slice(0, 3)); // Limit to 3 blogs for simplicity
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    // Handle adding or editing blogs
    const handleAddBlog = async () => {
        if (!editBlogId) {
            // Adding a new blog
            try {
                const response = await axios.post('https://jsonplaceholder.typicode.com/posts', { title, body: bodyContent });
                setBlogs((prevBlogs) => [...prevBlogs, response.data]); // Directly add new blog to state
                setTitle('');
                setBodyContent('');
            } catch (error) {
                console.error('Error adding blog:', error);
            }
        } else {
            // Editing an existing blog
            try {
                await axios.put(`https://jsonplaceholder.typicode.com/posts/${editBlogId}`, { title, body: bodyContent });
                // Update the blog in the local state
                setBlogs((prevBlogs) =>
                    prevBlogs.map((blog) => (blog.id === editBlogId ? { ...blog, title, body: bodyContent } : blog))
                );
                setEditBlogId(null);
                setTitle('');
                setBodyContent('');
            } catch (error) {
                console.error('Error editing blog:', error);
            }
        }
    };

    // Handle editing blog
    const handleEditBlog = (blog) => {
        setTitle(blog.title);
        setBodyContent(blog.body);
        setEditBlogId(blog.id);
    };

    // Handle deleting blog
    const handleDeleteBlog = async (id) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
            // Remove blog from local state after successful delete
            setBlogs(blogs.filter((blog) => blog.id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="min-h-screen md:w-[50%] bg-gray-50 p-6">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center p-6 rounded-lg shadow-lg mb-8">
                <h1 className="text-4xl font-bold">Blog Manager</h1>
                <p className="text-sm mt-2">Create, edit, and manage your blogs effortlessly</p>
            </header>

            <div className="max-w-4xl mx-auto">
                {/* Blog Form */}
                <div className="bg-white shadow-lg rounded-lg p-6 mb-10">
                    <h2 className="text-3xl font-bold mb-4 text-indigo-600 text-center">
                        {editBlogId ? 'Edit Blog' : 'Create Blog'}
                    </h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Title</label>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                type="text"
                                placeholder="Enter blog title"
                                className="w-full bg-gray-600 placeholder:text-gray-200 text-white px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 font-medium mb-1">Content</label>
                            <textarea
                                onChange={(e) => setBodyContent(e.target.value)}
                                value={bodyContent}
                                placeholder="Enter blog content"
                                rows="4"
                                className="w-full bg-gray-600 placeholder:text-gray-200 text-white px-4 py-3 border border-gray-400 rounded-lg focus:ring-2 outline-none"
                            ></textarea>
                        </div>
                        <button
                            onClick={handleAddBlog}
                            type="button"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            {editBlogId ? 'Update Blog' : 'Save Blog'}
                        </button>
                    </form>
                </div>

                {/* Blog List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white border shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-800">{blog.title}</h3>
                                <p className="text-gray-600 mt-2">{blog.body}</p>
                            </div>
                            <div className="bg-gray-50 px-5 py-3 flex justify-between">
                                <button onClick={() => handleEditBlog(blog)} className="w-20 bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteBlog(blog.id)} className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPost;

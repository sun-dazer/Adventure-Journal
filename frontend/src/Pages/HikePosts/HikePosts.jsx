import React, { useState, useEffect } from "react";
import "./HikePosts.css";
import upvote from "../../Images/upvote.png";  

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/app/get-posts/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 403) {
          throw new Error("User is not logged in!");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch posts.");
        }
        return response.json();
      })
      .then((data) => setPosts(data.posts))
      .catch((error) => setError(error.message));
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Handle image file change
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newPost.trim() === "") return;

    const formData = new FormData();
    formData.append("content", newPost);
    formData.append("location", location);
    if (image) formData.append("image", image);

    fetch("http://localhost:8000/app/save-post/", {
      method: "POST",
      credentials: "include",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save post");
        }
        return response.json();
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error("Error saving post:", error));
  };

  // Handle upvote
  const handleUpvote = (postId) => {
    fetch(`http://localhost:8000/app/upvote-post/${postId}/`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to upvote post");
        }
        return response.json();
      })
      .then((updatedPost) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === updatedPost.id ? { ...post, upvotes: updatedPost.upvotes } : post
          )
        );
      })
      .catch((error) => console.error("Error upvoting post:", error));
  };

  return (
    <div className="Posts">
      <h2>Hike Posts Forum</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Location..."
        />
        <input
          type="text"
          value={newPost}
          onChange={handleInputChange}
          placeholder="Share your post..."
        />
        <input type="file" onChange={handleImageChange} />
        <button type="submit">Add Post</button>
      </form>

      <div className="PostsList">
        {posts.length === 0 ? (
          <p>No posts shared</p>
        ) : (
          posts
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map((post) => (
              <div key={post.id} className="Post">
                <div className="PostHeader">
                  <small className="PostUsername">{post.username}</small>
                </div>
                {post.location && <p className="PostLocation">Location: {post.location}</p>}
                <p>{post.content}</p>
                {post.image && <img src={post.image} alt="Post Image" className="PostImage" />}
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Posts;

import { Link } from "react-router-dom";
import "./Forum.css"; // Import the CSS file for the Forum component

const Forum = () => {
  const categories = [
    "General Discussion",
    "FontEnd",
    "BackEnd",
    "Database",
    "Security",
    "Misc",
    "Hosting",
  ];

  // Sample list of posts
  const posts = [
    {
      id: 1,
      title: "How do I create react styled-components?",
      content: "I have this react compon...",
      category: "Front-End",
    },
    {
      id: 2,
      title: "HELP!! Database Issue",
      content: "I am using MongoDb and I am...",
      category: "Database",
    },
    {
      id: 3,
      title: "Anyone can help with express backend?",
      content: "I am new to Express and I nee...",
      category: "BackEnd",
    },
  ];

  return (
    <div className="forum-container">
      {/* Sidebar with categories */}
      <div className="sidebar">
        <h3 className="titleColor">Categories</h3>
        <ul className="sidebarcolor">
          {categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))}
        </ul>
      </div>

      <div className="forum-content">
        {/* Forum header with a button to create new posts */}
        <div className="forum-header">
          <h2 className="titleColor">Forum</h2>
          <Link to="#">
            <button className="create-post-btn">Create New Post</button>
          </Link>
        </div>

        {/* List of posts */}
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <a
                className="post-title"
                href=""
                style={{ textDecoration: "none" }}
              >
                {post.title}
              </a>
              <p className="post-content">{post.content}</p>
              <p className="post-category">Category: {post.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;

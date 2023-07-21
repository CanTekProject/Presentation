import "../../assets/scss/partials/_welcome.scss"; // Import the SCSS file
import ChatOverFlowLogo from "../../assets/images/ChatOverFlowLogo.svg";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="title-section">
        <div>
          <h2 className="title">Welcome to</h2>
          <h2 className="title">Your Home</h2>
          <hr />
          <h2 className="title">Chat, Post, Solve! </h2>
          <div className="logo-container">
            <img src={ChatOverFlowLogo} className="logo" alt=""></img>
          </div>
        </div>
      </div>
      <div className="text-column">
        <h2 className="description">
          Instantly access accurate answers from our vibrant community chatroom
          and make swift progress on your project today!
        </h2>
      </div>

      <button
        type="submit"
        className="btn btn-custom btn-blue"
        onClick={() => {
          navigate("/Chat");
        }}
        style={{ marginBottom: "20px" }}
      >
        Chat
      </button>
      <button
        type="submit"
        className="btn btn-custom btn-blue"
        onClick={() => {
          navigate("/Forum");
        }}
        style={{ marginBottom: "20px" }}
      >
        Forum
      </button>
    </div>
  );
}

export default HomePage;

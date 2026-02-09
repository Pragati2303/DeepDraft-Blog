import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 style={{ fontWeight: "600", color: "#0f172a" }}>
          Welcome to My Blog
        </h1>

        <p
          style={{
            color: "#64748b",
            maxWidth: "620px",
            margin: "14px auto",
            fontSize: "15px",
          }}
        >
          Writing about technology, learning curves, and the quiet process of
          becoming better — one project, one idea at a time.
        </p>

        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link
            to="/login"
            style={{
              padding: "10px 22px",
              background: "#0f766e",
              color: "#ffffff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Get Started
          </Link>

          <Link
            to="/blogs"
            style={{
              padding: "10px 22px",
              border: "1px solid #0f766e",
              color: "#0f766e",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "500",
              fontSize: "14px",
            }}
          >
            Browse Blogs
          </Link>
        </div>
      </div>

      {/* Featured Section */}
      <div className="row g-4">
        {[1, 2, 3].map((item) => (
          <div className="col-md-4" key={item}>
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "20px",
                height: "100%",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "#0f766e",
                  fontWeight: "500",
                }}
              >
                Featured
              </span>

              <h5
                style={{
                  marginTop: "8px",
                  color: "#0f172a",
                  fontWeight: "600",
                }}
              >
                Learning by Building
              </h5>

              <p
                style={{
                  fontSize: "14px",
                  color: "#64748b",
                  marginTop: "8px",
                }}
              >
                Why consistent practice and small projects matter more than
                perfection.
              </p>

              <Link
                to="/login"
                style={{
                  fontSize: "14px",
                  color: "#0f766e",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
              >
                Start reading →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

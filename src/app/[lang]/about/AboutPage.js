import React from "react";
import "./AboutPage.css"; // You can keep your custom animations here if you want

function AboutPage() {
  return (
    <div className="about-page">
      {/* About Content Section */}
      <section className="py-5 py-md-7">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Side - Text Description */}
            <div className="col-md-6 mb-5 mb-md-0 animate__animated animate__fadeInUp">
              <h1 className="display-4 fw-bold mb-4">About Our Navigo</h1>

              <p className="lead mb-4">
                Navigo is an innovative and affordable GPS tracking and passenger assistance system
                designed specifically for government bus transportation. Unlike traditional systems
                that rely on costly hardware and internet-dependent IoT setups, Navigo uses basic
                GPS technology to deliver real-time bus tracking, seat availability updates, and
                route information.
              </p>

              <p className="mb-5">
                The system reduces complexity and cost by leveraging existing mobile networks and
                simple manual inputs, making it highly accessible for low-resource areas.
              </p>

              <div className="row mb-5">
                <div className="col-sm-6">
                  <div className="card h-100 shadow-sm border-0 mb-4">
                    <div className="card-body p-4">
                      <h3 className="h5 text-primary mb-3">Our Mission</h3>
                      <p className="text-muted">
                        To make public bus travel smarter and easier with a low-cost, real-time
                        tracking and assistance system.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6">
                  <div className="card h-100 shadow-sm border-0 mb-4">
                    <div className="card-body p-4">
                      <h3 className="h5 text-secondary mb-3">Our Vision</h3>
                      <p className="text-muted">
                        To make bus travel easier, safer, and more convenient for everyone by using
                        low-cost technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 animate__animated animate__fadeIn animate__delay-1s">
              <div className="position-relative rounded overflow-hidden shadow image-container">
                <img
                  src="https://cdna.artstation.com/p/assets/images/images/064/299/058/large/sathesh-tamilnadu-bus.jpg?1687586148"
                  alt="Our team collaborating in a modern office space"
                  className="img-fluid rounded w-100"
                />
                <div className="overlay-gradient"></div>

                <div className="position-absolute bottom-0 start-0 p-4 text-white">
                  <div className="d-flex align-items-center mb-2">
                    <span>NAVIGO</span>
                  </div>
                  <h3 className="h5 mb-0">A Low-Cost GPS-Based Tracking System</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Core Values</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              These principles guide everything we do and help us deliver exceptional results for
              our clients.
            </p>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <ValueCard
                icon={<People />}
                title="Seat Availability"
                description="We constantly seek new and better ways to solve problems and create value for our clients."
                color="primary"
              />
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <ValueCard
                icon={<Lightning />}
                title="Real-time tracking"
                description="We believe in the power of teamwork, diverse perspectives, and open communication."
                color="primary"
              />
            </div>
            <div className="col-md-4">
              <ValueCard
                icon={<CheckCircle />}
                title="Scalable"
                description="We strive for the highest quality in everything we do, from code to customer service."
                color="primary"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Lightning() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-lightning-charge"
      viewBox="0 0 16 16"
    >
      <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
    </svg>
  );
}

function People() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-people"
      viewBox="0 0 16 16"
    >
      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-check-circle"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
    </svg>
  );
}

// ValueCard Component
function ValueCard({ icon, title, description, color }) {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4">
        <div
          className={`d-inline-flex align-items-center justify-content-center bg-${color} bg-opacity-10 p-3 rounded-circle mb-3`}
        >
          <div className={`text-${color}`}>{icon}</div>
        </div>
        <h3 className="h5 mb-3">{title}</h3>
        <p className="text-muted mb-0">{description}</p>
      </div>
    </div>
  );
}

export default AboutPage;

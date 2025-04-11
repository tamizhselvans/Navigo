import React from "react";

const Empty = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center p-4">
        <div className="p-4 mb-3 d-inline-block">
          <i className="fi fi-ss-bus" style={{ fontSize: "60px" }}></i>
        </div>
        <h4 className="fw-semibold mb-2">No Buses Found</h4>
        <p className="text-muted mb-0">
          We couldn't find any buses matching your search. Please try different filters or check
          back later.
        </p>
      </div>
    </div>
  );
};

export default Empty;

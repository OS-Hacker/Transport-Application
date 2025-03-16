import React from 'react'

const Loading = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="spinner-border m-5" role="status"></div>
      </div>
    </>
  );
}

export default Loading
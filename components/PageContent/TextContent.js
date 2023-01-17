import React from "react";

export default ({ text }) => (
    <div
        className="project-content__block project-content__block--text"
        dangerouslySetInnerHTML={{ __html: text }}
    />
)
import React from "react";

const About = () => {
    return (
        <div className="mt-3">
            <div className="h3">Features:</div>
            <div className="ml-2">
                <div className="h6">All passwords are encrypted.</div>
                <div className="h6">
                    Don't have to remember all platform's passwords.
                </div>
                <div className="h6">Easy to Use.</div>
            </div>
            <div className="h3">About:</div>
            <div className="ml-2">
                <div className="h6 text-muted">Version 1.0.0</div>
            </div>
            <div className="alert alert-dark">
                <div className="h6 m-0">
                    <a
                        href="https://github.com/akshy78695"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary"
                    >
                        Visit Developer's GitHub Profile.
                    </a>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default About;

import React from "react";

const Loading = ({ margin_top, loaderWidth, loaderMessage }) => {
    return (
        <div style={{ height: "50vh" }}>
            <div
                className="text-center"
                style={{ marginTop: margin_top || "15em" }}
            >
                {/* <img src="/Double_Ring.gif" style={{width:"60px"}} alt="" /> */}
                <img
                    src="/Rolling.svg"
                    style={{ width: loaderWidth || "55px" }}
                    alt=""
                />
                {loaderMessage && <div style={{fontSize:"14px"}}>{loaderMessage}</div>}
            </div>
        </div>
    );
};

export default Loading;

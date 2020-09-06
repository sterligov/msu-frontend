import React from "react";

const PoorVision = React.lazy(() => import("./PoorVision"));
const NormalVision = React.lazy(() => import("./NormalVision"));

export default class VisionStyle extends React.Component {
    render() {
        return (
            <>
                <React.Suspense fallback={null}>
                    {localStorage.getItem("poor_vision") && <PoorVision/>}
                    {!localStorage.getItem("poor_vision") && <NormalVision/>}
                </React.Suspense>
                {this.props.children}
            </>
        );
    }
}


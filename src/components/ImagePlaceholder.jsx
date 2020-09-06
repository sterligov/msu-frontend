import React from "react";

import ContentLoader from "react-content-loader"

export default class ImagePlaceholder extends React.Component {
    render() {
        return (
            <ContentLoader
                speed={2}
                width={500}
                height={481}
                viewBox="0 80 500 481"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...this.props}
            >
                <rect x="0" y="56" rx="3" ry="3" width="500" height="481" />
            </ContentLoader>
        );
    }
}
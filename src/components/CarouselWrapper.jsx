import React from "react";
import Carousel from "react-bootstrap/Carousel";
import axios, {get} from "axios";
import ImagePlaceholder from "./ImagePlaceholder"

const MAX_IMAGE_IN_CAROUSEL = 4;

export class CarouselWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        this.cancelSource = axios.CancelToken.source();
        this._isMouted = true;

        get('/preview_images?partial=true', {cancelToken: this.cancelSource.token})
            .then(
                res => {
                    if (this._isMouted) {
                        this.setState({
                            items: res.data["hydra:member"].slice(0, MAX_IMAGE_IN_CAROUSEL)
                        });
                    }
                },
                () => {}
            )
    }

    componentWillUnmount() {
        this._isMouted = false;
        this.cancelSource.cancel();
    }

    render() {
        const items = this.state.items;

        return (
            <div className="wrap-slider">
                {items.length === 0 &&
                <ImagePlaceholder/>
                }
                <Carousel controls={false} interval={4000} keyboard={false}>
                    {items.map((item, index) =>
                        <Carousel.Item key={`carousel_${index}`}>
                            <img
                                className="d-block"
                                src={item.mediaObject.contentUrl}
                                alt="Изображение новости"
                                width="500px"
                            />
                        </Carousel.Item>
                    )}
                </Carousel>
            </div>
        );
    }
}
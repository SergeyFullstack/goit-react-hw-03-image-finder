import { Component } from 'react';
import PropTypes from 'prop-types';

import { GalleryItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  hendelModalOpen = e => {
    const curentImage = this.props.images.find(image => {
      return image.webformatURL === e.target.src;
    });

    this.props.modalOpen(curentImage);
  };

  render() {
    const { images } = this.props;

    return images.map(image => {
      return (
        <GalleryItem key={image.webformatURL}>
          <Image
            src={image.webformatURL}
            alt={image.tags}
            onClick={this.hendelModalOpen}
          />
        </GalleryItem>
      );
    });
  }
}

ImageGalleryItem.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};

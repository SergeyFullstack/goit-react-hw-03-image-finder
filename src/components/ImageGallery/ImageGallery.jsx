import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/ButtonLoad';
import { GalleryList, WrapGallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const {
      dataImages,
      toggleLoader,
      toggleButton,
      getGallery,
      clickLoadMore,
      modalOpen,
    } = this.props;

    return (
      <>
        {dataImages.length > 0 && (
          <WrapGallery>
            <>
              <GalleryList>
                <ImageGalleryItem images={dataImages} modalOpen={modalOpen} />
              </GalleryList>
              {toggleButton && (
                <Button
                  clickLoadMore={clickLoadMore}
                  toggleLoader={toggleLoader}
                  onClick={getGallery}
                />
              )}
            </>
          </WrapGallery>
        )}
      </>
    );
  }
}

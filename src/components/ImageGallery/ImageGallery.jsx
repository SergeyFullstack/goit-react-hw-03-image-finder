import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/ButtonLoad';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { GalleryList, WrapGallery } from './ImageGallery.styled';

export class ImageGallery extends Component {
  render() {
    const {
      searchName,
      dataImages,
      toggleLoader,
      toggleButton,
      toggleModal,
      largeImageUrl,
      largeImageAlt,

      clickLoadMore,
      modalOpen,
      closeModal,
    } = this.props;

    return (
      <>
        {toggleLoader && <Loader widthLoader={'200'} heightLoader={'200'} />}
        {dataImages.length > 0 && (
          <WrapGallery>
            {searchName && (
              <>
                <GalleryList>
                  <ImageGalleryItem images={dataImages} modalOpen={modalOpen} />
                </GalleryList>
                {toggleButton && (
                  <Button
                    clickLoadMore={clickLoadMore}
                    toggleLoader={toggleLoader}
                  />
                )}
              </>
            )}
            {toggleModal && (
              <Modal
                url={largeImageUrl}
                alt={largeImageAlt}
                closeModal={closeModal}
              />
            )}
          </WrapGallery>
        )}
      </>
    );
  }
}

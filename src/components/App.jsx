import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api/fetch-api-gallery';
import { Loader } from './Loader/Loader';
import { createRef } from 'react';

export class App extends Component {
  galleryRef = createRef();
  state = {
    searchName: '',
    dataImages: [],
    page: 1,
    toggleLoader: false,
    toggleButton: true,
    toggleModal: false,
    largeImageUrl: '',
    largeImageAlt: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchName, page } = this.state;

    if (searchName === '') return;
    else if (prevState.searchName !== searchName || prevState.page !== page) {
      this.setState({
        dataImages: [],
        toggleLoader: true,
        toggleButton: false,
      });

      this.getGallery();
    }
  }

  onSubmitSearch = searchName => {
    this.setState({ searchName });
  };

  getGallery = () => {
    const { searchName, page, dataImages } = this.state;

    this.setState({
      toggleLoader: true,
      toggleButton: false,
    });

    fetchImages(searchName, page)
      .then(images => {
        if (images.hits.length === 0) return;

        const newDataImages = [...dataImages, ...images.hits];

        if (Math.ceil(images.total / 12) <= page) {
          this.setState({ toggleButton: false });
        } else {
          this.setState({ toggleButton: true });
        }

        this.setState({
          dataImages: newDataImages,
        });

        this.scrollToBottom();
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ toggleLoader: false });
      });
  };

  scrollToBottom = () => {
    this.galleryRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };

  clickLoadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        toggleLoader: true,
      }),
      () => {
        this.getGallery();
      }
    );
  };

  modalOpen = curentImage => {
    this.setState({
      largeImageUrl: curentImage.largeImageURL,
      largeImageAlt: curentImage.tags,
      toggleModal: true,
    });
  };

  closeModal = () => {
    this.setState({
      largeImageUrl: '',
      largeImageAlt: '',
      toggleModal: false,
    });
  };

  render() {
    const {
      searchName,
      dataImages,
      toggleLoader,
      toggleButton,
      toggleModal,
      largeImageUrl,
      largeImageAlt,
    } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmitSearch} />
        {toggleLoader && <Loader widthLoader={'200'} heightLoader={'200'} />}
        <div ref={this.galleryRef}>
          <ImageGallery
            searchName={searchName}
            dataImages={dataImages}
            toggleLoader={toggleLoader}
            toggleButton={toggleButton}
            toggleModal={toggleModal}
            largeImageUrl={largeImageUrl}
            largeImageAlt={largeImageAlt}
            getGallery={this.getGallery}
            clickLoadMore={this.clickLoadMore}
            modalOpen={this.modalOpen}
            closeModal={this.closeModal}
          />
        </div>
      </>
    );
  }
}


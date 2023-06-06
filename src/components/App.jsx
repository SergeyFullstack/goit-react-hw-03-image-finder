import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api/fetch-api-gallery';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {
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

    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.getGallery();
    }
  }

  onSubmitSearch = searchName => {
    this.setState({
      searchName,
      dataImages: [],
      page: 1,
    });
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

        this.setState({
          dataImages: newDataImages,
          toggleButton: Math.ceil(images.total / 12) <= page ? false : true,
        });
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ toggleLoader: false });
      });
  };

  clickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      toggleLoader: true,
    }));
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
        <ImageGallery
          dataImages={dataImages}
          toggleButton={toggleButton}
          toggleLoader={toggleLoader}
          clickLoadMore={this.clickLoadMore}
          modalOpen={this.modalOpen}
        />
        {toggleModal && (
          <Modal
            url={largeImageUrl}
            alt={largeImageAlt}
            closeModal={this.closeModal}
          />
        )}
      </>
    );
  }
}

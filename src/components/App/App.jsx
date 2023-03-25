import { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import { searchImage } from '../../services/servicesApi';
import { Container } from './App.styles';

export default function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(false);
  const [modal, setModal] = useState('');
  const [error, setError] = useState('');
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!search) return;
    const imgGalleryList = async (search, page) => {
      setPending(true);
      try {
        const { images, totalImages } = await searchImage(search, page);
        if (images.length === 0) {
          setError('Were sorry, images is not found!');
        }
        setImages(prev => [...prev, ...images]);
        setError('');
        setTotalImages(totalImages);
      } catch (error) {
        setError('Ooops..Something went wrong!');
      } finally {
        setPending(false);
      }
    };
    imgGalleryList(search, page);
  }, [search, page]);

  const searchNewImage = async inputValue => {
    setSearch(inputValue);
    setPage(1);
    setImages([]);
  };

  const loadMoreButton = async () => {
    setPage(prev => prev + 1);
  };

  const showModal = imageId => {
    setModal(imageId);
  };

  const closeModal = () => {
    setModal('');
  };

  return (
    <Container>
      <Searchbar onSubmit={searchNewImage} />
      <ImageGallery images={images} showModal={showModal} />
      {images.length !== totalImages && !pending && (
        <Button loadMore={loadMoreButton} />
      )}
      {pending && <Loader />}
      {modal && <Modal image={modal} closeModal={closeModal} />}
      {error && <p>{error}</p>}
    </Container>
  );
}

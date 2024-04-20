import { callToApi } from 'Functions/callToApi';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export const App = () => {
  const [itemToSearch, setItemToSearch] = useState('');
  const [itemToSearchLocked, setItemToSearchLocked] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFromApi, setdataFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFromModal, setImageFromModal] = useState('');

  useEffect(() => {
    if (isLoading)
      callToApi(itemToSearchLocked, currentPage)
        .then(resp => {
          const { id, largeImageURL, webformatURL } = resp.hits;
          setdataFromApi(prev => [
            ...prev,
            ...resp.hits.map(r => ({
              myId: r.id,
              myLargeImageURL: r.largeImageURL,
              mySmallImageURL: r.webformatURL,
            })),
          ]);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
          setCurrentPage(prev => prev + 1);
        });
  }, [isLoading]);

  useEffect(() => {
    setdataFromApi([]);
    setCurrentPage(1);
    setIsDataLoaded(false);
  }, [isDataLoaded]);

  const handleSubmit = e => {
    e.preventDefault();
    const { value } = e.target[1];
    setItemToSearchLocked(value);
    setIsLoading(true);
    setIsDataLoaded(true);
  };

  const handleChange = e => {
    const { value } = e.target;
    setItemToSearch(value);
  };

  const handleClick = () => {
    setIsLoading(true);
    setIsDataLoaded(false);
  };

  const openModal = e => {
    if (e.target.nodeName === 'li' || 'img') setIsModalOpen(true);
    setImageFromModal(e.target.getAttribute('src'));
  };

  const closeModal = e => {
    console.log(e.target.nodeName);
    if (e.target.nodeName !== 'img') setIsModalOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <>
        <Searchbar handleSubmit={handleSubmit} handleChange={handleChange} />
        {isModalOpen ? (
          <Modal imageFromModal={imageFromModal} closeModal={closeModal} />
        ) : (
          <></>
        )}
        {isLoading ? <Loader /> : <></>}
        <ImageGallery openModal={openModal}>
          <ImageGalleryItem dataFromApi={dataFromApi} />
        </ImageGallery>
        {currentPage > 1 ? <Button handleClick={handleClick} /> : <></>}
      </>
    </div>
  );
};

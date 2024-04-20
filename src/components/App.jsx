import { callToApi } from 'Functions/callToApi';
import { useEffect, useState } from 'react';
import css from './App.module.css';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleClick = () => {
    setIsLoading(true);
    setIsDataLoaded(false);
  };

  const openModal = e => {
    if (e.target.nodeName === 'IMG') setIsModalOpen(true);
    setImageFromModal(e.target.getAttribute('src'));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar
          handleSubmit={handleSubmit}
          setItemToSearch={setItemToSearch}
        />
        {isModalOpen ? (
          <Modal imageFromModal={imageFromModal} closeModal={closeModal} />
        ) : (
          <></>
        )}
        <ImageGallery openModal={openModal}>
          <ImageGalleryItem dataFromApi={dataFromApi} />
        </ImageGallery>
        {isLoading ? <Loader /> : <></>}
        {currentPage > 1 ? <Button handleClick={handleClick} /> : <></>}
      </div>
    </>
  );
};

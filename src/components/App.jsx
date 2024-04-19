import { callToApi } from 'Functions/callToApi';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';

export const App = () => {
  const [itemToSearch, setItemToSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFromApi, setdataFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (isLoading)
      callToApi(itemToSearch, currentPage)
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

  const handleSubmit = evt => {
    evt.preventDefault();
    setIsLoading(true);
    setIsDataLoaded(true);
  };

  const handleChange = e => {
    const { value } = e.target;
    setItemToSearch(value);
  };

  const handleClick = () => {
    setIsLoading(true);
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
      <Searchbar handleSubmit={handleSubmit} handleChange={handleChange} />
      <ImageGallery>
        {isLoading ? <Loader /> : <></>}
        {isDataLoaded ? <ImageGalleryItem dataFromApi={dataFromApi} /> : <></>}
        {isDataLoaded ? <Button handleClick={handleClick} /> : <></>}
      </ImageGallery>
    </div>
  );
};

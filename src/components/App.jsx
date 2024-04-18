import { callToApi } from 'Functions/callToApi';
import { useState } from 'react';
import { ImageGallery } from './ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Searchbar } from './Searchbar';

export const App = () => {
  const [itemToSearch, setItemToSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFromApi, setdataFromApi] = useState([{}]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();

    callToApi(itemToSearch, currentPage)
      .then(resp => {
        const { id, largeImageURL, webformatURL } = resp.hits;
        setdataFromApi(
          resp.hits.map(r => ({
            myId: r.id,
            myLargeImageURL: r.largeImageURL,
            mySmallImageURL: r.webformatURL,
          }))
        );
        setIsLoading(false);
        setIsDataLoaded(true);
      })
      .catch(e => setError(e))
      .finally(setIsLoading(true));
  };

  const handleChange = e => {
    const { value } = e.target;
    setItemToSearch(value);
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
      <ImageGallery dataFromApi={dataFromApi}>
        {isDataLoaded ? <ImageGalleryItem dataFromApi={dataFromApi} /> : <></>}
      </ImageGallery>
    </div>
  );
};

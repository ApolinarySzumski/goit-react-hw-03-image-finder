import { nanoid } from 'nanoid';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ dataFromApi }) => {
  return dataFromApi.map(item => (
    <li key={`${item.myId} + ${nanoid()}`} className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={item.myLargeImageURL}
        srcSet={item.mySmallImageURL}
        alt=""
      />
    </li>
  ));
};

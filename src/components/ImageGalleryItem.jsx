import { nanoid } from 'nanoid';

export const ImageGalleryItem = ({ dataFromApi }) => {
  return dataFromApi.map(item => (
    <li key={`${item.myId} + ${nanoid()}`} className="gallery-item">
      <img src={item.mySmallImageURL} alt="" />
    </li>
  ));
};
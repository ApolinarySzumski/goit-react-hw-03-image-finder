export const ImageGalleryItem = ({ dataFromApi }) => {
  return dataFromApi.map(item => (
    <li key={item.myId} className="gallery-item">
      <img src={item.mySmallImageURL} alt="" />
    </li>
  ));
};

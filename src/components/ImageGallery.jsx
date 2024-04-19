export const ImageGallery = ({ children, openModal }) => {
  return (
    <ul className="gallery" onClick={openModal}>
      {children}
    </ul>
  );
};

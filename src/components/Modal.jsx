export const Modal = ({ openModal, imageFromModal, closeModal }) => {
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal">
        <img src={imageFromModal} alt="" />
      </div>
    </div>
  );
};

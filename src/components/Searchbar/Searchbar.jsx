import css from './Searchbar.module.css';

console.log(css);

export const Searchbar = ({ handleSubmit, setItemToSearch }) => {
  const handleChange = e => {
    const { value } = e.target;
    setItemToSearch(value);
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Enter</span>
        </button>

        <input
          onChange={handleChange}
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

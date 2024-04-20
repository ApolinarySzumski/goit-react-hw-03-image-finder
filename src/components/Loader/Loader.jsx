import { CSSProperties } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#3f51b5',
};

export const Loader = () => (
  <span>
    <ClipLoader
      cssOverride={override}
      size={300}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </span>
);

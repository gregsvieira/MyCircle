import PropTypes from 'prop-types';
import { Container, Img, ImportIcon } from './styles';
import Spinner from '../Spinner';
import userIcon from '../../assets/images/user-icon.png';

export default function FormGroupImage({
  children,
  isLoading,
  image,
  error,
  handleImageClick,
}) {
  return (
    <Container>
      <Img src={image ?? userIcon} alt="Preview" onClick={handleImageClick} />
      {isLoading && (
        <div className="loader">
          <Spinner size={16} />
        </div>
      )}
      {error && <small>{error}</small>}
      <ImportIcon alt="Import" className="importIcon" />
      {children}
    </Container>
  );
}

FormGroupImage.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  image: PropTypes.string,
  handleImageClick: PropTypes.func.isRequired,
};

FormGroupImage.defaultProps = {
  error: null,
  isLoading: false,
  image: null,
};

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from './styles';

import arrow from '../../assets/images/icons/arrow.svg';

export default function PageHeader({ title, path }) {
  return (
    <Container>
      <Link to={path}>
        <img src={arrow} alt="Back" />
        <span>Back</span>
      </Link>

      {title && (
        <h1>{title}</h1>
      )}
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
};

PageHeader.defaultProps = {
  title: undefined,
};

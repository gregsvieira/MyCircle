/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function CreateRecordHeader({
  hasError,
  quantityOfItems,
  quantityOfFilteredItems,
  recordLink,
  singularRecordType,
  pluralRecordType,
}) {
  const alignment = hasError
    ? 'flex-end'
    : (
      quantityOfItems > 0
        ? 'space-between'
        : 'center'
    );

  return (
    <Container
      justifyContent={alignment}
    >
      {(!hasError && quantityOfItems > 0) && (
      <strong>
        {quantityOfFilteredItems}
        {quantityOfFilteredItems === 1 ? ` ${singularRecordType}` : ` ${pluralRecordType}`}
      </strong>
      )}
      <Link to={`${recordLink}/new`}>
        {`New ${singularRecordType}`}
      </Link>
    </Container>
  );
}

CreateRecordHeader.propTypes = {
  hasError: PropTypes.bool.isRequired,
  quantityOfItems: PropTypes.number.isRequired,
  quantityOfFilteredItems: PropTypes.number.isRequired,
  recordLink: PropTypes.string.isRequired,
  singularRecordType: PropTypes.string.isRequired,
  pluralRecordType: PropTypes.string.isRequired,
};

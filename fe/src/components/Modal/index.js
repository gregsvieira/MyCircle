import PropTypes from 'prop-types';

import {
  OverLay, Container, Footer,
} from './styles';

import Button from '../Button';

export default function Modal({ danger }) {
  return (
    <OverLay>
      <Container danger={danger}>
        <h1>
          Tem certeza que deseja remover o contato ”Mateus Silva”?
        </h1>
        <p>
          Esta ação não poderá ser desfeita!
        </p>
        <Footer>
          <button type="button" className="cancel-button">
            Cancel
          </button>
          <Button danger={danger}>
            Delete
          </Button>
        </Footer>
      </Container>
    </OverLay>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};

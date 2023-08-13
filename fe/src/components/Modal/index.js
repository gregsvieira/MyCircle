import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';

import {
  OverLay, Container, Footer,
} from './styles';

import Button from '../Button';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
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
    </OverLay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};

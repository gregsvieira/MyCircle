import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import ReactPortal from '../ReactPortal';

import {
  Overlay, Container, Footer,
} from './styles';

import Button from '../Button';

export default function Modal({
  danger,
  visible,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    let timeoutId;
    if (!visible) {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, 200);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!visible}>
        <Container danger={danger} isLeaving={!visible}>
          <h1>
            {title}
          </h1>

          <div className="modal-body">
            {children}
          </div>

          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
      ,
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm',
};

/* eslint-disable react/forbid-prop-types */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Container, InputWrapper, InputLabel, FileInput,
} from './styles';

const InputFileUpload = forwardRef(({
  onClick,
  selectedFile,
  error,
  onChange,
  fileFormat,
}, ref) => (
  <Container>
    <InputWrapper onClick={onClick}>
      <InputLabel>
        {selectedFile ? selectedFile.name : 'Choose one file'}
      </InputLabel>
    </InputWrapper>
    <FileInput
      error={error}
      type="file"
      accept={fileFormat}
      ref={ref}
      onChange={onChange}
    />
  </Container>
));

InputFileUpload.propTypes = {
  error: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  fileFormat: PropTypes.string.isRequired,
  selectedFile: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default InputFileUpload;

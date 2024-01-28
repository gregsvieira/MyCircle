import PropTypes from 'prop-types';
import {
  useState, forwardRef, useImperativeHandle,
} from 'react';

import useErrors from '../../hooks/useErrors';

import {
  Form, ButtonContainer, Container, Text,
} from './styles';
import FormGroup from '../FormGroup';
import Button from '../Button';

const PostForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const [contentPost, setContentPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (contentPost && errors.length === 0);

  useImperativeHandle(ref, () => ({
    setFieldsValues: (post) => {
      setContentPost(post.content ?? '');
    },
    resetFields: () => {
      setContentPost('');
    },
  }), []);

  function handleContentPostChange(event) {
    const postContent = event.target.value;
    const postLength = postContent.length;

    setContentPost(postContent);

    if (postLength > 255) {
      setError({ field: 'content', message: 'Content is longer than 255 characteres' });
    } else {
      removeError('content');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    await onSubmit({ content: contentPost });

    setIsSubmitting(false);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} noValidate>

        <FormGroup error={getErrorMessageByFieldName('content')}>
          <Text
            value={contentPost}
            error={getErrorMessageByFieldName('content')}
            placeholder="What're you thinking?"
            onChange={handleContentPostChange}
            disabled={isSubmitting}
          />
        </FormGroup>

        <ButtonContainer>
          <Button
            type="submit"
            disabled={!isFormValid}
            isLoading={isSubmitting}
          >
            {buttonLabel}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
});

PostForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default PostForm;

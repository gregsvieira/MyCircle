import CategoryForm from '../../components/CategoryForm';
import PageHeader from '../../components/PageHeader';

import useNewCategory from './useCategory';

export default function NewCategory() {
  const {
    contactFormRef,
    handleSubmit,
  } = useNewCategory();

  return (
    <>
      <PageHeader
        title="New category"
        path="/categories"
      />
      <CategoryForm
        ref={contactFormRef}
        title="New category"
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}

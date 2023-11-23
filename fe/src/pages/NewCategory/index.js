import CategoryForm from '../../components/CategoryForm';
import PageHeader from '../../components/PageHeader';

import useNewCategory from './useCategory';

export default function NewCategory() {
  const {
    categoryFormRef,
    handleSubmit,
  } = useNewCategory();

  return (
    <>
      <PageHeader
        title="New category"
        path="/categories"
      />
      <CategoryForm
        ref={categoryFormRef}
        title="New category"
        buttonLabel="Register"
        onSubmit={handleSubmit}
      />
    </>
  );
}

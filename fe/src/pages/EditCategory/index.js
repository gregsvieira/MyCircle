import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../components/CategoryForm';
import Loader from '../../components/Loader';
import useEditCategory from './useEditCategory';

export default function EditCategory() {
  const {
    isLoading,
    categoryName,
    categoryFormRef,
    handleSubmit,
  } = useEditCategory();

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Loading...' : `Edit ${categoryName}`}
        path="/categories"
      />
      <CategoryForm
        ref={categoryFormRef}
        buttonLabel="Save changes"
        onSubmit={handleSubmit}
      />
    </>
  );
}

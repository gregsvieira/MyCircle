// import { useRef } from 'react';
import { useRef } from 'react';
import CategoryForm from '../../components/CategoryForm';
import PageHeader from '../../components/PageHeader';

import toast from '../../utils/toast';
import CategoriesService from '../../services/CategoriesService';

export default function NewCategory() {
  const contactFormRef = useRef(null);

  async function handleSubmit(
    name,
  ) {
    try {
      const response = await CategoriesService.createCategory({
        name,
      });

      toast({
        type: 'success',
        text: `Category '${response.name}' registered successfully`,
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: error.message,
      });
    }
  }

  return (
    <>
      <PageHeader
        title="New category"
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

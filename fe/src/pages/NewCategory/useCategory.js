import { useRef } from 'react';

import toast from '../../utils/toast';
import CategoriesService from '../../services/CategoriesService';

export default function useNewCategory() {
  const categoryFormRef = useRef(null);

  async function handleSubmit(category) {
    try {
      const response = await CategoriesService.createCategory(category);

      categoryFormRef.current.resetFields();

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

  return {
    categoryFormRef,
    handleSubmit,
  };
}

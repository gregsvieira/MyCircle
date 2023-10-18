import { useRef } from 'react';

import toast from '../../utils/toast';
import CategoriesService from '../../services/CategoriesService';
import CategoryMapper from '../../services/mappers/CategoryMapper';

export default function useNewCategory() {
  const contactFormRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      const category = CategoryMapper.toPersistence(formData);

      const response = await CategoriesService.createCategory(category);

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
    contactFormRef,
    handleSubmit,
  };
}

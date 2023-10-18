import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import APIError from '../../errors/APIError';

import toast from '../../utils/toast';
import useSafeAsyncAction from '../../hooks/useSafeAsyncAction';
import CategoriesService from '../../services/CategoriesService';

export default function useEditCategory() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  const categoryFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadCategory() {
      try {
        const category = await CategoriesService.getCategoryById(id);

        safeAsyncAction(() => {
          categoryFormRef.current.setFieldsValues(category);
          setIsLoading(false);
          setCategoryName(category.name);
        });
      } catch (error) {
        safeAsyncAction(() => {
          history.push('/categories');
          toast({
            type: 'danger',
            text: 'Category not found!',
          });
        });
      }
    }

    loadCategory();
  }, [id, history, safeAsyncAction]);

  async function handleSubmit(category) {
    try {
      const updatedCategory = await CategoriesService.updateCategory(id, category);

      setCategoryName(updatedCategory.name);

      toast({
        type: 'success',
        text: 'Category edited successfully',
      });
    } catch (error) {
      let message;
      if (error instanceof APIError) {
        message = error.message;
      }

      toast({
        type: 'danger',
        text: `${message ?? 'Unable to edit category'}`,
      });
    }
  }

  return {
    isLoading,
    categoryName,
    categoryFormRef,
    handleSubmit,
  };
}

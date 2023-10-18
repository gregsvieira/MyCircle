import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import APIError from '../../errors/APIError';
import CategoriesService from '../../services/CategoriesService';
import toast from '../../utils/toast';

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderyBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [categoryBeingDeleted, setCategoryBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredCategories = useMemo(() => categories.filter((category) => (
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [categories, searchTerm]);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const categoriesList = await CategoriesService.listCategories(orderBy);

      setHasError(false);
      setCategories(categoriesList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  function handleOrderBy() {
    setOrderyBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadCategories();
  }

  function handleDeleteCategory(category) {
    setCategoryBeingDeleted(category);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setCategoryBeingDeleted(null);
  }

  async function handleCloseDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await CategoriesService.deleteCategory(categoryBeingDeleted.id);

      setCategories((prevState) => prevState.filter(
        (category) => category.id !== categoryBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Category deleted successfully',
      });
    } catch (error) {
      let message;
      if (error instanceof APIError) {
        message = error.message;
      }

      toast({
        type: 'danger',
        text: `${message ?? 'Unable to delete category'}`,
      });
    } finally {
      setIsLoadingDelete(false);
      handleCloseDeleteModal();
    }
  }

  return {
    isLoading,
    isLoadingDelete,
    categoryBeingDeleted,
    handleCloseDeleteModal,
    handleCloseDeleteContact,
    isDeleteModalVisible,
    categories,
    filteredCategories,
    orderBy,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    handleOrderBy,
    handleDeleteCategory,
  };
}

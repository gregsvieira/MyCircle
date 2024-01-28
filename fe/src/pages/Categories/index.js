/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */

import {
  Container,
  InputSearchContainer,
  ErrorContainer,
} from './styles';

import CategoriesList from './CategoriesList';

import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import SearchNotFound from '../../components/SearchNotFound';

import CreateRecordHeader from '../../components/CreateRecordHeader';
import EmptyList from '../Contacts/components/EmptyList';
import sad from '../../assets/images/sad.svg';

import useCategories from './useCategories';

export default function Categories() {
  const {
    isLoading,
    isLoadingDelete,
    categoryBeingDeleted,
    handleCloseDeleteModal,
    handleCloseDeleteContact,
    isDeleteModalVisible,
    filteredCategories,
    quantityOfCategories,
    quantityOfFilteredCategories,
    orderBy,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    handleOrderBy,
    handleDeleteCategory,
  } = useCategories();

  const hasCategories = quantityOfCategories > 0;
  const isListEmpty = !hasError && (!hasCategories && !isLoading);
  const isSearchEmpty = !hasError && (hasCategories && quantityOfFilteredCategories < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        isLoading={isLoadingDelete}
        title={`Are you sure you want to remove the "${!categoryBeingDeleted?.name}" category?`}
        confirmLabel="Delete"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleCloseDeleteContact}
        visible={isDeleteModalVisible}
      >
        <p>
          You can&apos;t restore this category after remove
        </p>
      </Modal>

      {hasCategories && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Search category..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <CreateRecordHeader
        hasError={hasError}
        quantityOfItems={quantityOfCategories}
        quantityOfFilteredItems={quantityOfFilteredCategories}
        recordLink="/categories"
        singularRecordType="category"
        pluralRecordType="categories"
      />

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>An error occurred while trying to get the categories</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {isListEmpty && (
          <EmptyList>
            <p>
              You don&apos;t have any category registered! Click the <strong>“New Category”</strong>
              button above to register the first category!
            </p>
          </EmptyList>
          )}

          {isSearchEmpty && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          {hasCategories && (
          <CategoriesList
            orderBy={orderBy}
            filteredCategories={filteredCategories}
            onOrderBy={handleOrderBy}
            onOpenDeleteCategoryModal={handleDeleteCategory}
          />
          )}
        </>
      )}

    </Container>
  );
}

/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  ListHeader,
  Card,
  InputSearchContainer,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import Button from '../../components/Button';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

import PageHeader from '../../components/PageHeader';
import useCategories from './useCategories';

export default function Categories() {
  const {
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
  } = useCategories();

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

      <PageHeader
        path="/"
      />

      {categories.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Search category..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={(
          hasError
            ? 'flex-end'
            : (
              categories.length > 0
                ? 'space-between'
                : 'center'
            )
          )}
      >
        {(!hasError && categories.length > 0) && (
          <strong>
            {filteredCategories.length}
            {filteredCategories.length === 1 ? ' category' : ' categories'}
          </strong>
        )}
        <Link to="/categories/new">New Category</Link>
      </Header>

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
          {(categories.length < 1 && !isLoading) && (
          <EmptyListContainer>
            <img src={emptyBox} alt="Empty box" />

            <p>
              You don&apos;t have any category registered! Click the <strong>“New Category”</strong>
              button above to register the first category!
            </p>
          </EmptyListContainer>
          )}

          {(categories.length > 0 && filteredCategories.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />
              <span>No results were found for <strong>”{searchTerm}”</strong>.</span>
            </SearchNotFoundContainer>
          ))}

          {filteredCategories.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" className="sort-button" onClick={handleOrderBy}>
              <span>Name</span>
              <img src={arrow} alt="arrow" />
            </button>
          </ListHeader>
          )}

          {filteredCategories.map((category) => (
            <Card key={category.id}>
              <div className="info">
                <div className="category-name">
                  <strong>
                    {category.name}
                  </strong>
                </div>
              </div>

              <div className="actions">
                <Link to={`categories/edit/${category.id}`}>
                  <img src={edit} alt="edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteCategory(category)}
                >
                  <img src={trash} alt="delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}

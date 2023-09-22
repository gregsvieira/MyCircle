/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
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
import CategoriesService from '../../services/CategoriesService';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderyBy] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredCategories = useMemo(() => categories.filter((category) => (
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [categories, searchTerm]);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      const categoriesList = await CategoriesService.listCategories();

      setHasError(false);
      setCategories(categoriesList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  return (
    <Container>
      <Loader isLoading={isLoading} />

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
              <span>Nenhum resultado foi encontrado para <strong>”{searchTerm}”</strong>.</span>
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
                <div className="contact-name">
                  <strong>
                    {category.name}
                  </strong>
                </div>
              </div>

              <div className="actions">
                <Link to={`/edit/${category.id}`}>
                  <img src={edit} alt="edit" />
                </Link>
                <button type="button">
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

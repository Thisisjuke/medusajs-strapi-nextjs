import * as React from 'react'
import styled from 'styled-components';
import {
  Button
} from '@strapi/design-system'

const ChevronLeft = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12l4.58-4.59z"></path></svg>
)
const ChevronsLeft = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18.41 7.41L17 6l-6 6l6 6l1.41-1.41L13.83 12l4.58-4.59m-6 0L11 6l-6 6l6 6l1.41-1.41L7.83 12l4.58-4.59Z"></path></svg>
)
const ChevronRight = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6l-6-6z"></path></svg>
)
const ChevronsRight = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5.59 7.41L7 6l6 6l-6 6l-1.41-1.41L10.17 12L5.59 7.41m6 0L13 6l6 6l-6 6l-1.41-1.41L16.17 12l-4.58-4.59Z"></path></svg>
)

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin-right: 0.8rem;
  }
`;

const PaginationButton = styled(Button)`
  display: flex;
  align-items: center;
  img {
    filter: invert(100%) sepia(0%) saturate(7500%) hue-rotate(175deg) brightness(
        121%
      ) contrast(114%);
  }
  ${(props) => (props.disabled ? disabled : enabled)};
`;

const enabled = `
  cursor: pointer;
`;

const disabled = `
  background-color: var(--color-primary-disabled);
`;

const PaginationLabel = styled(Button)`
  pointer-events: none;
  font-size: 1rem;
`;

const Pagination = ({ total, limit, value:page , onChange:setPage }) => {
  const goToFirstPage = () => setPage(1);

  const goToLastPage = () => setPage(getLastPage());

  const incrementPage = () => page < getLastPage() && setPage(page + 1);

  const decrementPage = () => page > 1 && setPage(page - 1);

  const atFirstPage = () => page === 1;

  const atLastPage = () => page === getLastPage();

  const getLastPage = () => Math.ceil(total / limit);

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => goToFirstPage()}
        disabled={atFirstPage()}
      >
        <ChevronsLeft />
      </PaginationButton>
      <PaginationButton
        onClick={() => decrementPage()}
        disabled={atFirstPage()}
      >
        <ChevronLeft />
      </PaginationButton>
      <PaginationLabel variant={'tertiary'}>{`${page} / ${getLastPage()}`}</PaginationLabel>
      <PaginationButton onClick={incrementPage} disabled={atLastPage()}>
        <ChevronRight />
      </PaginationButton>
      <PaginationButton onClick={goToLastPage} disabled={atLastPage()}>
        <ChevronsRight />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;

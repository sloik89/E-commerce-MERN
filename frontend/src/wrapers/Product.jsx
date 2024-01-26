import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .product-result {
    background-color: var(--bg-nav);
    color: var(--light-300);
    padding: 1rem;
    border-radius: 1rem;

    .product-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn-container {
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
    }
    .price {
      font-size: 2.5rem;
    }
  }
  @media screen and (min-width: 800px) {
    flex-direction: row;
    align-items: start;
    .product-info {
      flex-basis: 60%;
    }
    .product-result {
      flex-basis: 50%;
    }
  }
`;
export default Wrapper;

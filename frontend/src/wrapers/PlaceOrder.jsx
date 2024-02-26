import styled from "styled-components";
const Wrapper = styled.div`
  .order {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .cart-items {
    img {
      width: 100px;
    }
    display: flex;
    gap: 2rem;
    flex-direction: column;
    .cart-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .order-summary {
    border: 2px dotted var(--violet);
    padding: 2rem;
    align-self: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .total-price {
      font-size: 2rem;
    }
  }
`;
export default Wrapper;

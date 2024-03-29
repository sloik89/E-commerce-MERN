import styled from "styled-components";
const Wrapper = styled.div`
  .list-items {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .list-item {
      display: grid;
      grid-template-columns: 200px 1fr auto 300px auto;
      align-items: center;
      justify-items: center;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--light-300);
      @media screen and (max-width: 700px) {
        grid-template-columns: unset;
        grid-auto-flow: row;
        justify-content: center;
      }
    }
    .item-img {
      width: 200px;
    }
  }
  .btn {
    margin-left: 1rem;
  }
  .subtotal-info {
    gap: 1rem;

    .subtotal-price {
      font-size: 1rem;
      font-weight: bold;
      font-size: 2rem;
    }
  }
  .subtotal {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h3 {
      font-size: 2rem;
      color: var(--light-300);
    }
  }
  .subtotal .btn {
    align-self: center;
  }
`;
export default Wrapper;

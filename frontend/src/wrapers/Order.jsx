import styled from "styled-components";
const Wrapper = styled.div`
  .orders {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h3 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
  .orders-container {
    .order-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .order-heading {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .order-heading img {
      width: 100px;
    }
  }
  .orders-detail {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    .orders-detail-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .orders-summary {
    padding: 1rem 2rem;
    justify-self: center;
    align-self: center;
    border: 3px dashed var(--violet);
    h3 {
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    .orders-detail-item {
    }
  }
  .paypal-container {
    align-self: center;
    width: 50%;
  }
  .btn-test {
    margin: 1rem 0;
  }
  .paypal-wrapper {
    display: flex;
    flex-direction: column;
  }
  .total-summary {
    font-size: 2rem;
    font-weight: bold;
  }
`;
export default Wrapper;

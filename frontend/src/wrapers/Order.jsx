import styled from "styled-components";
const Wrapper = styled.div`
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
`;
export default Wrapper;

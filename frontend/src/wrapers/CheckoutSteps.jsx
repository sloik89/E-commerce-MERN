import styled from "styled-components";
const Wrapper = styled.div`
  .checkout-links {
    gap: 1rem;
    margin: 2rem 0;
    a {
      font-size: 1.1rem;
      font-weight: bold;
    }
    a:hover {
      color: var(--light-400);
    }
    a[disabled] {
      color: var(--light-200);
      font-weight: normal;
    }
    a:hover {
      color: var(--light-400);
    }
  }
`;
export default Wrapper;

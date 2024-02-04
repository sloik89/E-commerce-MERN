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
`;
export default Wrapper;

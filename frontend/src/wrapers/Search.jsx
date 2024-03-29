import styled from "styled-components";
const Wrapper = styled.div`
  position: relative;
  .input-search {
    padding: 0.4rem 1rem;
    background-color: transparent;
    border: none;
    border-bottom: solid 1px var(--light-300);
    color: var(--light-300);
    margin-right: 1rem;
  }
  .input-search:focus {
    border-bottom: solid 2px var(--violet);
  }

  .btn-search {
    font-size: 0.8rem;
  }
  .icon-search {
    position: absolute;
    left: -6px;
    color: var(--light-300);
    top: 50%;
    transform: translate(-50%, -50%);
    transition: 0.1s linear;
    opacity: 100%;
  }
  .input-search:focus + .icon-search {
    transform: translate(-100%, -50%);
    opacity: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 2rem 0;
  }
`;
export default Wrapper;

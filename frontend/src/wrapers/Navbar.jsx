import styled from "styled-components";
const Wrapper = styled.nav`
  background-color: var(--bg);
  transition: 0.5s linear;
  padding: 1rem 0;
  .section-center {
    transition: 0.5s linear;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .auth-container {
      display: flex;
      gap: 0.5rem;
    }
    .hamburger {
      font-size: 1.5rem;
      color: var(--violet);
      background: transparent;
      border: none;
      cursor: pointer;
    }
    .auth-container.show {
      flex: 1 1 100%;
      display: flex;
      padding: 0.5rem 0;
    }
    .auth-container.hide {
      display: none;
    }
    @media (min-width: 768px) {
      .hamburger {
        display: none;
      }
      .auth-container.hide {
        display: flex;
      }
      .auth-container.show {
        flex: 0 0 auto;
      }
    }
  }
`;
export default Wrapper;

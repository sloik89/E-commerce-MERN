import styled from "styled-components";
const Wrapper = styled.nav`
  .form {
    background-color: var(--bg);
    padding: 2rem;
    width: 90%;
  }
  .form-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    input {
      font-size: 1.1rem;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid var(--light-300);
      color: white;
    }
    input:focus {
      border-bottom: 1px solid var(--violet);
    }
  }
  .btn-login {
    align-self: center;
  }
`;
export default Wrapper;

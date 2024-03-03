import styled from "styled-components";
const Wrapper = styled.div`
  .form-profile {
    width: clamp(40%, 700px, 80%);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .form-row {
      display: flex;
      flex-direction: column;
    }
    label {
      font-size: 1.3rem;
    }
    input {
      border: none;
      background-color: transparent;
      border-bottom: 1px solid var(--violet);
      color: var(--light-300);
      padding: 0.5rem 1rem;
    }
  }
`;
export default Wrapper;

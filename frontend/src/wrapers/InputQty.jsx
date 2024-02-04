import styled from "styled-components";
const Wrapper = styled.div`
  .input-container {
    position: relative;
    background-color: var(--bg-body);
    height: 40px;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    input {
      background-color: transparent;
      border: none;
      color: white;
      font-size: 1.1rem;
      text-align: center;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    button {
      border: none;
      background-color: transparent;
      color: white;
      cursor: pointer;
    }
  }
`;
export default Wrapper;

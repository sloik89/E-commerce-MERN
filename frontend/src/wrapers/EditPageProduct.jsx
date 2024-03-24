import styled from "styled-components";
const Wrapper = styled.div`
  .form-create {
    padding: 4rem 1rem;
    background-color: var(--bg-nav);
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .form-row {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
    }
    textarea {
      height: 300px;
    }
    input,
    textarea {
      border-radius: 0.5rem;
      border: 2px solid var(--violet);
      padding: 0.3rem 1rem;
      font-size: 1.2rem;
      background-color: transparent;
      color: var(--light-100);
    }
    .checbox-row {
      display: flex;
      flex-direction: row;
    }
    .checkbox {
      align-self: center;
    }
    select {
      background-color: transparent;
      border: 2px solid var(--violet);
      color: var(--light-100);
      padding: 0.4rem 0;
      font-size: 1.2rem;
      option {
        padding: 0.4rem 0;
        background-color: transparent;
        color: black;
      }
    }
    .create-btn {
      color: white;
      background-color: var(--violet);
      cursor: pointer;
      width: 100px;
      border-radius: 0.4rem;
      height: 40px;
      font-size: 1.1rem;
      align-self: center;
    }
    .create-btn:hover {
      background-color: var(--light-400);
      color: var(--violet);
    }
  }
`;
export default Wrapper;

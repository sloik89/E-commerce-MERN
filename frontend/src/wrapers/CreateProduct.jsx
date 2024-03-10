import styled from "styled-components";
const Wrapper = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  .form {
    position: relative;
    width: 60%;
    max-width: 800px;
  }
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
      border: none;
      padding: 0.3rem 1rem;
      font-size: 1.2rem;
      background-color: red;
    }
  }
  .btn {
    position: absolute;
    top: 0;
    right: 0;
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
  .form-create.animate {
    animation: move 0.3s ease-in alternate;
  }

  @keyframes move {
    0% {
      transform: translateX(-200%);
    }
    50% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes hide {
    0% {
      transform: translateX(0);
    }

    100% {
      transform: translateX(-200%);
    }
  }
`;
export default Wrapper;

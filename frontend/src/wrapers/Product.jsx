import styled from "styled-components";
const Wrapper = styled.div`
  .product-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .product-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .btn {
      align-self: start;
    }
  }
  .product-result {
    background-color: var(--bg-nav);
    color: var(--light-300);
    padding: 1rem;
    border-radius: 1rem;

    .product-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .btn-container {
      gap: 0.5rem;
      display: flex;
      flex-direction: column;
    }
    .price {
      font-size: 2.5rem;
    }
  }

  .form-comment {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem 0;
    select {
      align-self: flex-start;
    }
    label {
      font-size: 1.3rem;
    }
    .form-row {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    button {
      align-self: center;
    }

    textarea {
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 0.5rem;
    }
    textarea:focus {
      outline: 2px solid var(--violet);
    }
  }
  .product-reviews {
    margin-top: 2rem;
  }
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
  @media screen and (min-width: 800px) {
    .product-container {
      flex-direction: row;
      align-items: start;
    }
    .product-info {
      flex-basis: 60%;
    }
    .product-result {
      flex-basis: 50%;
    }
  }
`;
export default Wrapper;

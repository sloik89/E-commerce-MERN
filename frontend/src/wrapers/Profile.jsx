import styled from "styled-components";
const Wrapper = styled.div`
  .profile {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    h3 {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 2rem;
    }
  }
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
  table {
    border: 1px solid white;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;

    thead {
      font-size: 1.2rem;
      height: 50px;
    }

    tr {
      text-align: center;
    }
    td {
      padding: 20px 10px;
      background-color: var(--bg-nav);
    }
  }
`;
export default Wrapper;

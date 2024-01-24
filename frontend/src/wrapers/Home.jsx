import styled from "styled-components";
const Wrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;

  @media (max-width: 700px) {
    justify-items: center;
    width: 90%;
  }
`;

export default Wrapper;

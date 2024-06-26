import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .main-slider {
    margin: 0;
    width: 90%;
  }

  .slider {
    background-color: var(--violet);
    position: relative;
  }
  .carousel-desc {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100px;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .link {
    font-size: 2rem;
  }
  .item-bg {
    width: 50px;
    border: 1px solid pink;
    height: 400px;
  }

  .slick-list {
    /* height: 500px; */
    position: relative;
  }
  .carousel-img {
    height: 400px;
    width: 50%;
    object-fit: cover;
  }
  .slick-dots {
    .slick-active {
      color: white;
    }
    li {
      button:before {
        color: var(--violet);
        width: 50px;
        height: 50px;
        font-size: 1rem;
      }
    }
  }
`;
export default Wrapper;

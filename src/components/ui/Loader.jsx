import { styled } from "styled-components";

const Loader = () => {
  return <StLoader />;
};

const StLoader = styled.div`
  position: fixed;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  width: 100px;
  height: 100px;
  border: 6px solid #fff;
  border-top: 6px solid #333;
  border-bottom: 6px solid #333;
  border-radius: 100%;

  animation: spin 800ms infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
export default Loader;

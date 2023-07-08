import { styled } from "styled-components";

const Layout = ({ children }) => {
  return <StLayout>{children}</StLayout>;
};

const StLayout = styled.div`
  max-width: 800px;
  max-height: 800px;
  margin: 0 auto;
`;

export default Layout;

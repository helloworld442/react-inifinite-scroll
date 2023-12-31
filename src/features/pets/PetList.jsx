import { styled } from "styled-components";
import PetItem from "./PetItem";

const PetList = ({ children }) => {
  return <StPetList>{children}</StPetList>;
};

const StPetList = styled.ul`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: grid;
  place-items: center;
  text-align: center;
  overflow-y: scroll;
`;

PetList.Item = PetItem;

export default PetList;

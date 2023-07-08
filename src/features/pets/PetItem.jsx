import { styled } from "styled-components";

const PetItem = ({ item, idx }) => {
  const title = item.breeds[0].name;
  const imgSrc = item.url;
  return (
    <StPetItem>
      <div className="id">{idx + 1}</div>
      <div className="content">
        <div className="thumbnail">
          <img src={imgSrc} />
        </div>
        <div className="title">{title}</div>
      </div>
    </StPetItem>
  );
};

const StPetItem = styled.li`
  position: relative;
  width: 500px;
  height: 100px;
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #333;

  .id {
    position: absolute;
    top: 0;
    left: 0;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #333;
    color: #fff;
    font-weight: bold;
  }

  .content {
    width: 300px;
    display: flex;
    justify-content: space-between;

    .thumbnail {
      img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        border: 2px solid #333;
        object-fit: contain;
      }
    }

    .title {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
      font-weight: bold;
    }
  }
`;

export default PetItem;

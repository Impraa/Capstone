import { useNavigate } from "react-router-dom";
import {
  BackgroundImage,
  Body,
  DirecotryItemContainer,
} from "./DirectoryItem.styles";

interface CategoryInter {
  id: number;
  title: string;
  imageUrl: string;
  route: string;
}

function DirectoryItem(props: CategoryInter) {
  const { id, imageUrl, title, route } = props;

  const navigate = useNavigate();

  const navigationHandler = () => navigate(route);

  return (
    <DirecotryItemContainer key={id} onClick={navigationHandler}>
      <BackgroundImage style={{ backgroundImage: `url(${imageUrl})` }} />
      <Body>
        <h2>{title}</h2>
        <p>Shop now</p>
      </Body>
    </DirecotryItemContainer>
  );
}

export default DirectoryItem;

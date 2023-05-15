import "./DirectoryItem.scss";

interface CategoryInter {
  id: number;
  title: string;
  imageUrl: string;
}

function DirectoryItem(props: CategoryInter) {
  const { id, imageUrl, title } = props;

  return (
    <div key={id} className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="body">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
}

export default DirectoryItem;

import "./categoryItem.scss";

interface CategoryInter {
  id: number;
  title: string;
  imageUrl: string;
}

function CategoryItem(props: CategoryInter) {
  const { id, imageUrl, title } = props;

  return (
    <div key={id} className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
}

export default CategoryItem;

import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  { id: "p1", title: "My First Book", description: "My first book", price: 6 },
  {
    id: "p2",
    title: "My Second Book",
    description: "My second book",
    price: 4,
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;

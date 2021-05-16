import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'My First Book',
    description: 'The first book i ever read'
  },
  {
    id: 'p2',
    price: 5,
    title: 'My Second Book',
    description: 'The second book i ever read'
  },
  {
    id: 'p3',
    price: 7,
    title: 'My Third Book',
    description: 'The third book i ever read'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => (<ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />)
        )}
      </ul>
    </section>
  );
};

export default Products;

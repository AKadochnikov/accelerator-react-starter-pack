import Icons from '../icons/icons';
import Header from '../header/header';
import Footer from '../footer/footer';
import {isCatalog} from '../../const';
import ProductItem from '../product-item/product-item';

function Product (): JSX.Element {
  return (
    <>
      <Icons/>
      <div className="wrapper" data-testid={'product'}>
        <Header isCatalog={isCatalog.no}/>
        <ProductItem/>
        <Footer/>
      </div>
    </>
  );
}

export default Product;

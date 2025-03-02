import CategoryList from "./_components/CategoryList";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";


export default async function Home() {

  const sliderList = await GlobalApi.getSliders()
  const categoryList = await GlobalApi.getCategoryList()
  const productList = await GlobalApi.getAllProducts()

  return (
    <div className="p-5 md:p-10 px-18 space-y-6">
      <Slider sliderList={sliderList}/>
      <CategoryList categoryList={categoryList}/>
      {/* <ProductList productList={productList}/> */}
      <Footer />
    </div>
  );
}

import CategoryList from "./_components/CategoryList";
import DeliveryDetails from "./_components/DeliveryDetails";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import PromoSlider from "./_components/PromoSlider";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";


export default async function Home() {

  const sliderList = await GlobalApi.getSliders()
  const sliderPromoList = await GlobalApi.getPromoSliders()
  const categoryList = await GlobalApi.getCategoryList()
  const productList = await GlobalApi.getAllProducts()

  return (
    <div className="p-5 md:p-10 px-18 space-y-6 flex flex-col">
      <DeliveryDetails />
      <CategoryList categoryList={categoryList} className='flex md:hidden'/>
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} className='hidden md:flex'/>
      {/* <PromoSlider sliderList={sliderPromoList}/> */}
      {/* <ProductList productList={productList}/> */}
      <Footer />
    </div>
  );
}

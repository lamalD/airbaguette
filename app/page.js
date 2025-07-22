import BannerHomepage from "./_components/Banner_Home";
import CategoryList from "./_components/CategoryList";
import DeliveryDetails from "./_components/DeliveryDetails";
import FlightSplitBoard from "./_components/flightSplitBoard";
import Footer from "./_components/Footer";
import ProductList from "./_components/ProductList";
import PromoBoard from "./_components/promoBoard";
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
      <BannerHomepage />
      {/* <PromoBoard className='hidden md:flex'/> */}
      <CategoryList categoryList={categoryList} className='flex sm:hidden'/>
      <PromoSlider sliderList={sliderPromoList}/>
      <DeliveryDetails />
      {/* <FlightSplitBoard /> */}
      {/* <Slider sliderList={sliderList} /> */}
      {/* <CategoryList categoryList={categoryList} className='hidden md:flex'/> */}
      {/* <ProductList productList={productList}/> */}
      <Footer />
    </div>
  );
}

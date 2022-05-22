import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link as ScrollLink } from 'react-scroll';

import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import banner01 from '../../Assets/images/banners/banner01.jpg';
import banner02 from '../../Assets/images/banners/banner02.jpg';

const Banner = () => {
  return (
    <div className="font-poppins text-black">
      <Swiper
        spaceBetween={30}
        navigation={true}
        centeredSlides={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative">
            <img
              className="h-[80vh] w-screen object-right-bottom object-cover"
              src={banner01}
              alt="Browse Items Banner"
            />
            <div className="absolute top-[30%] md:top-[40%] left-[15%] py-6 px-4">
              <h1 className="text-xl font-medium mb-6">
                Shop Premium Quality Supplies
              </h1>
              <h1 className="text-xl font-medium mb-6">
                24/7 Customer Support
              </h1>
              <button className="btn rounded">
                <ScrollLink
                  to="tools"
                  spy={true}
                  smooth={true}
                  offset={50}
                  duration={500}
                >
                  Browse Items
                </ScrollLink>
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img
              className="h-[80vh] w-screen object-right-bottom object-cover"
              src={banner02}
              alt="Manage Account Banner"
            />
            <div className="absolute top-[30%] md:top-[40%] left-[15%] py-6 px-4">
              <h1 className="text-xl md:text-3xl font-medium mb-6">
                Manage your account
              </h1>
              <h1 className="text-xl md:text-3xl font-medium mb-6">
                Track your orders.
              </h1>
              <button className="btn rounded">
                <Link to="/manage">Manage Now</Link>
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;

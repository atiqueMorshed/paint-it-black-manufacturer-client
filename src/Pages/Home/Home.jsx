import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import LatestSold from './LatestSold';
import Location from './Location/Location';
import Reviews from './Reviews/Reviews';
import Tools from './Tools/Tools';

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Tools />
      <BusinessSummary />
      <Reviews />
      <Location />
      <LatestSold />
    </div>
  );
};

export default Home;

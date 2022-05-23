import CountUp from 'react-countup';

import customer from '../../Assets/images/summary/b-customer.png';
import revenue from '../../Assets/images/summary/b-revenue.png';
import feedback from '../../Assets/images/summary/b-feedback.png';

const BusinessSummary = () => {
  return (
    <div className={`w-11/12 max-w-xl xl:max-w-[1200px] mx-auto pb-32`}>
      <h1 className="text-4xl text-center font-medium mb-16">
        Business Summary
      </h1>
      <div className="flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-center">
        <div className="flex flex-col justify-center items-center gap-2">
          <img className="w-28" src={customer} alt="Happy Customer" />
          <h1 className="font-black text-4xl mt-2">
            <CountUp end={500} enableScrollSpy />+
          </h1>
          <h2 className="text-xl font-medium text-accent">Happy Clients</h2>
        </div>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2">
            <img className="w-32" src={revenue} alt="Revenue" />
            <h1 className="font-black text-4xl mt-2">
              <CountUp end={100} enableScrollSpy />
              K+
            </h1>
            <h2 className="text-xl font-medium text-accent">In Revenue</h2>
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-center items-center gap-2">
            <img className="w-28" src={feedback} alt="Customer Feedback" />
            <h1 className="font-black text-4xl mt-2">
              <CountUp end={250} enableScrollSpy />+
            </h1>
            <h2 className="text-xl font-medium text-accent">Feedbacks</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSummary;

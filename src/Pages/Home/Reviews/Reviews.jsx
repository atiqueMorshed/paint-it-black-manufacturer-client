import { sub } from 'date-fns';
import React from 'react';
import Review from './Review';
const reviews = [
  {
    _id: '1',
    name: 'Abdul Bari',
    date: sub(new Date(), { years: 1 }).toISOString(),
    rating: 4.5,
    review:
      "I am a long time user, I've bought so many stuff from here for my local business. These products are really good and I couldn't be any more happier.",
  },
  {
    _id: '2',
    name: 'Atique Morshed',
    date: sub(new Date(), { months: 6 }).toISOString(),
    rating: 5,
    review:
      'I run a stationary shop and these products sells like cakes. I am a very frequent customer. Aside from the great products, they also have really good support staff.',
  },
  {
    _id: '3',
    name: 'Rahim Mia',
    date: sub(new Date(), { days: 2 }).toISOString(),
    rating: 4,
  },
];
const Reviews = () => {
  console.log(
    "INFO: The rating component in Review page throws the 'Using UNSAFE_componentWillReceiveProps'. (package issue)."
  );
  return (
    <div className="mb-32">
      <h1 className="text-4xl font-medium text-center mb-16">Reviews</h1>
      <div className="w-11/12 max-w-xl xl:max-w-[1200px] mx-auto flex flex-col gap-10">
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default Reviews;

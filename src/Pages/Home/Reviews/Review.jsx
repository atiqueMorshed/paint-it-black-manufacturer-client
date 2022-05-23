import Rating from 'react-rating';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';

const Review = ({ review: { name, date, rating, review } }) => {
  // Generates Random Profile background.
  const colors = ['#F06292', '#0E86D4', '#36D399', '#FF80AB', '#E6D94A'];
  const idx = Math.floor(Math.random() * 5);

  // Generates initials.
  const names = name.split(' ');
  let initials = names[0][0];
  if (names[1][0]) initials += names[1][0];

  return (
    <div className="p-4 shadow">
      <div className="flex items-center mb-4 space-x-4">
        <div
          className="w-12 h-12 rounded-full flex justify-center items-center"
          style={{ backgroundColor: `${colors[idx]}` }}
        >
          <p className="text-xl text-white">{initials}</p>
        </div>

        <div className="space-y-1 font-medium">
          <div>
            {name}
            <div className="block text-sm text-gray-500 dark:text-gray-400">
              Reviewed {formatDistanceToNow(parseISO(date))} ago.
            </div>
          </div>
        </div>
      </div>

      <Rating
        initialRating={rating}
        emptySymbol={<FontAwesomeIcon icon={faStar} />}
        fullSymbol={<FontAwesomeIcon icon={faSolidStar} />}
        readonly
      />

      <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
        {review ? review : 'This user did not leave a message.'}
      </p>
    </div>
  );
};

export default Review;

import Rating from 'react-rating';
import { formatDistanceToNow, parseISO } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faSolidStar } from '@fortawesome/free-solid-svg-icons';

const Review = ({ review: { displayName, reviewedOn, rating, review } }) => {
  // Generates Random Profile background.
  const colors = [
    '#F06292',
    '#0E86D4',
    '#36D399',
    '#FF80AB',
    '#E6D94A',
    '#FF8080',
    '#FEE2C5',
    '#A85CF9',
    '#9145B6',
  ];
  const idx = Math.floor(Math.random() * 9);

  // Generates initials.
  const names = displayName.split(' ');
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
            {displayName}
            <div className="block text-sm text-gray-500 dark:text-gray-400">
              Reviewed {formatDistanceToNow(parseISO(reviewedOn))} ago.
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

import moment from 'moment';
import { Card } from 'react-bootstrap';
import {
  HandThumbsUpFill,
  Star,
  StarFill,
  HandThumbsDownFill,
} from 'react-bootstrap-icons';
import Rating from 'react-rating';
import './styles/ReviewCard.scss';

const ReviewCard = (props) => {
  const {
    id,
    dateCreated,
    title,
    content,
    rate,
    valorization,
    likes,
    dislikes,
    buyingDate,
  } = props;

  const getTimeAgo = (date) => {
    return moment(date).locale('es').subtract(3, 'hours').fromNow(); // convert to UTC-3
  };

  return (
    <div className="review-card">
      <Card>
        <Card.Header>
          <span className="review-card-title">{title}</span>
          <div className="review-card-timeago">{getTimeAgo(dateCreated)}</div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <span className="reviews-average-stars">
              <Rating
                emptySymbol={<Star />}
                fullSymbol={<StarFill />}
                readonly={true}
                initialRating={rate}
              />
            </span>
          </Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <div className="thumb-icon">{likes} me gusta</div>
          <div className="thumb-icon">{dislikes} no me gusta</div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ReviewCard;

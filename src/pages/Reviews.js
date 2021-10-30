import { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { ArrowLeft, Star, StarFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ItemsService from '../services/ItemsService';
import Rating from 'react-rating';
import './styles/Reviews.scss';
import ReviewCard from '../components/ReviewCard';

const Reviews = (props) => {
  const { listId, itemId } = useParams();

  const [itemReviews, setItemReviews] = useState(null);
  const [itemData, setItemData] = useState(null);
  const [apiErr, setApiErr] = useState(null);

  const fetchData = async () => {
    try {
      const item = await ItemsService.getItem(itemId);
      setItemData(item);

      const revs = await ItemsService.getItemReviews(
        itemId,
        item.catalog_product_id || ''
      );
      setItemReviews(revs);
    } catch (err) {
      setApiErr(err);
    }
  };

  const byDateCreated = (a, b) => {
    if (a.date_created > b.date_created) {
      return -1;
    } else if (a.date_created < b.date_created) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // itemReviews.reviews.sort(byDateCreated)

  return (
    <div className="reviews-page">
      <Container>
        <Alert show={apiErr} variant="danger">
          Ocurrió un error al buscar las opiniones del producto.
        </Alert>
        <Link to={`/lists/${listId}/${itemId}`}>
          <ArrowLeft /> Atrás
        </Link>
        {itemReviews && itemData && (
          <div>
            <div className="reviews-title-box">
              <span className="reviews-title">
                {itemReviews.paging.total} opiniones de {itemData.title}
              </span>
            </div>
            <div className="reviews-average">
              Promedio de puntuación:{' '}
              <span className="reviews-average-stars">
                <Rating
                  emptySymbol={<Star />}
                  fullSymbol={<StarFill />}
                  readonly={true}
                  initialRating={itemReviews.ratingAverage}
                />
              </span>
              {` (${itemReviews.ratingAverage} / 5)`}
            </div>
            <div className="reviews-list">
              {itemReviews.reviews.sort(byDateCreated).map((r, i) => {
                return (
                  <ReviewCard
                    key={r.id}
                    id={r.id}
                    dateCreated={r.date_created}
                    title={r.title}
                    content={r.content}
                    rate={r.rate}
                    valorization={r.valorization}
                    likes={r.likes}
                    dislikes={r.dislikes}
                    buyingDate={r.buying_date}
                  />
                );
              })}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Reviews;

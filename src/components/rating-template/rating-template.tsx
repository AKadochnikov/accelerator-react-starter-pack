type RatingTemplateProps = {
  rating: number;
  id: number | string;
}

function RatingTemplate (props: RatingTemplateProps): JSX.Element {
  const {rating, id} = props;

  const newRating = new Array(5).fill(null).fill('full', 0, rating);
  return (
    <>
      <span className="visually-hidden">Рейтинг:</span>
      {newRating.map((item, index) => {
        if (!item) {
          return (
            <svg key={`${id}_${index + 100}`} width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"/>
            </svg>
          );
        }
        return (
          <svg key={`${id}_${index + 200}`} width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"/>
          </svg>
        );
      })}
    </>
  );
}

export default RatingTemplate;

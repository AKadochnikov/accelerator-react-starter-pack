import Card from '../card/card';
import {Guitar} from '../../types/types';

type CatalogCardProps = {
  guitars: Guitar[],
}

function CatalogCards (props: CatalogCardProps): JSX.Element {
  const {guitars} = props;
  return (
    <div className="cards catalog__cards" data-testid={'catalog-cards'}>
      {guitars.map((guitar) => (<Card key={guitar.id} guitar={guitar}/>)) }
    </div>
  );
}

export default CatalogCards;

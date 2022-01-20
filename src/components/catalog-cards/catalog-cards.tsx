import Card from '../card/card';
import {Guitar} from '../../types/types';
import {LoadingStatus} from '../../const';

import Loading from '../loading/loading';

type CatalogCardProps = {
  guitars: Guitar[],
  loadStatus: string;
}

function CatalogCards (props: CatalogCardProps): JSX.Element {
  const {guitars, loadStatus} = props;

  return (
    <div className="cards catalog__cards" data-testid={'catalog-cards'}>
      {loadStatus === LoadingStatus.Loading? <Loading/>: guitars.map((guitar) => (<Card key={guitar.id} guitar={guitar}/>)) }
    </div>
  );
}

export default CatalogCards;

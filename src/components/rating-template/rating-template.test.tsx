import {render, screen} from '@testing-library/react';
import RatingTemplate from './rating-template';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fakeGuitar} from '../../mockGuitars';
const history = createMemoryHistory();


describe('Component: RatingTemplate', () => {
  it('should is rendered component', () => {
    render(<Router history={history}><RatingTemplate rating={fakeGuitar.rating} id={fakeGuitar.id}/></Router>);

    expect(screen.getByText(/Рейтинг/i)).toBeInTheDocument();
  });
});

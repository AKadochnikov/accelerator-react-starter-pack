import {render, screen} from '@testing-library/react';
import Rating from './rating';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fakeGuitar} from '../../mock-guitars';
const history = createMemoryHistory();


describe('Component: Rating', () => {
  it('should is rendered component', () => {
    render(<Router history={history}><Rating rating={fakeGuitar.rating} id={fakeGuitar.id} comments={fakeGuitar.comments}/></Router>);

    expect(screen.getByText(`${fakeGuitar.comments.length}`)).toBeInTheDocument();
  });
});

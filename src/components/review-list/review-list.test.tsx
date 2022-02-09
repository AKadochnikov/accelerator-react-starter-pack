import {render, screen} from '@testing-library/react';
import ReviewList from './review-list';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fakeGuitar} from '../../mockGuitars';
import {defaultFallbackInView} from 'react-intersection-observer';
defaultFallbackInView(true);
const history = createMemoryHistory();


describe('Component: RatingTemplate', () => {
  it('should is rendered component', () => {
    render(<Router history={history}><ReviewList comments={fakeGuitar.comments}/></Router>);

    expect(screen.getByText(/Паша/i)).toBeInTheDocument();
    expect(screen.getByText(/Ольга/i)).toBeInTheDocument();
    expect(screen.getByText(/Bvz/i)).toBeInTheDocument();
    expect(screen.getByText(/Артём/i)).toBeInTheDocument();
  });
});

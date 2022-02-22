import {render, screen} from '@testing-library/react';
import SuccessAddReviewModal from './success-add-review-modal';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fakeGuitar} from '../../mock-guitars';


const history = createMemoryHistory();

describe('Component: SuccessAddReviewModal', () => {
  it('should is rendered component', () => {
    render(<Router history={history}><SuccessAddReviewModal setIsOpen={jest.fn} setComments={jest.fn} id={fakeGuitar.id}/></Router>);

    expect(screen.getByTestId('modal-success')).toBeInTheDocument();
  });
});

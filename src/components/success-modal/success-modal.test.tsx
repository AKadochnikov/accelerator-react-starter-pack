import {render, screen} from '@testing-library/react';
import SuccessModal from './success-modal';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fakeGuitar} from '../../mock-guitars';


const history = createMemoryHistory();

describe('Component: SuccessModal', () => {
  it('should is rendered component', () => {
    render(<Router history={history}><SuccessModal setIsOpen={jest.fn} setComments={jest.fn} id={fakeGuitar.id}/></Router>);

    expect(screen.getByTestId('modal-success')).toBeInTheDocument();
  });
});

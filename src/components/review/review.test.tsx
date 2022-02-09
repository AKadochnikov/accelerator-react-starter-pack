import {render, screen} from '@testing-library/react';
import Review from './review';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Comment} from '../../types/types';
const history = createMemoryHistory();

const fakeComment: Comment  = {
  'id': '79cf0718-eb12-4a57-b7e3-ced344c4a0bd',
  'userName': 'Паша',
  'advantage': 'Недорогая, за такую цену звук отличный.',
  'disadvantage': 'Быстро приходит в негодность покрытие краской.',
  'comment': 'Когда в наличии будет в чёрном цвете?',
  'rating': 4,
  'createAt': '2022-01-05T05:32:33.840Z',
  'guitarId': 1,
};

describe('Component: Review', () => {
  it('should is rendered component', () => {
    render(<Router history={history}><Review commentItem={fakeComment}/></Router>);

    expect(screen.getByText(/Паша/i)).toBeInTheDocument();
  });

  it('should date is humanized', () => {
    render(<Router history={history}><Review commentItem={fakeComment}/></Router>);

    expect(screen.getByText(/05 января/i)).toBeInTheDocument();
  });
});

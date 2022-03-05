import Product from '../product/product';
import {render, screen} from '@testing-library/react';
import {AppRoute, LoadingStatus} from '../../const';
import {useFetchGuitar} from '../../hooks/use-fetch-guitar/use-fetch-guitar';
import {fakeGuitar} from '../../mock-guitars';
import {MemoryRouter} from 'react-router-dom';
import {defaultFallbackInView} from 'react-intersection-observer';
import userEvent from '@testing-library/user-event';
import {store} from '../../mock-store';
import {Provider} from 'react-redux';
import Card from '../card/card';
defaultFallbackInView(true);

jest.mock('../../hooks/use-fetch-guitar/use-fetch-guitar', () => ({
  useFetchGuitar: jest.fn(),
}));

describe('Component: AddCartModal',  () => {
  it('should is rendered on button click in Product component',   () => {
    // noinspection DuplicatedCode
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>,Parameters<typeof useFetchGuitar>>).mockReturnValue({guitar: fakeGuitar, loadStatus: LoadingStatus.Complete});
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoute.CurrentGuitar}1`]}>
          <Product/>
        </MemoryRouter>
      </Provider>,
    );
    userEvent.click(screen.getByTestId('add-cart-in-product'));
    expect(screen.getByTestId('cart-modal')).toBeInTheDocument();
  });

  it('should is rendered on button click in Card component', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>,Parameters<typeof useFetchGuitar>>).mockReturnValue({guitar: fakeGuitar, loadStatus: LoadingStatus.Complete});
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoute.CurrentGuitar}1`]}>
          <Card guitar={fakeGuitar}/>
        </MemoryRouter>
      </Provider>,
    );
    userEvent.click(screen.getByTestId('add-cart-in-card'));
    expect(screen.getByTestId('cart-modal')).toBeInTheDocument();
  });
});

import Product from '../product/product';
import {render, screen} from '@testing-library/react';
import {AppRoute, LoadingStatus} from '../../const';
import {useFetchGuitar} from '../../hooks/use-fetch-guitar/use-fetch-guitar';
import {MemoryRouter} from 'react-router-dom';
import {defaultFallbackInView} from 'react-intersection-observer';
import {fakeGuitar} from '../../mock-guitars';
import {Provider} from 'react-redux';
import {store} from '../../mock-store';
defaultFallbackInView(true);

jest.mock('../../hooks/use-fetch-guitar/use-fetch-guitar', () => ({
  useFetchGuitar: jest.fn(),
}));

describe('Component: Product',  () => {
  it('should is loading component', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>, Parameters<typeof useFetchGuitar>>).mockReturnValue({
      guitar: null,
      loadStatus: LoadingStatus.Loading,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries = {[`${AppRoute.CurrentGuitar}1`]} >
          <Product />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should is error', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>, Parameters<typeof useFetchGuitar>>).mockReturnValue({
      guitar: null,
      loadStatus: LoadingStatus.Error,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries = {[`${AppRoute.CurrentGuitar}1`]} >
          <Product />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('should is rendered component', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>, Parameters<typeof useFetchGuitar>>).mockReturnValue({
      guitar: fakeGuitar,
      loadStatus: LoadingStatus.Loading,
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries = {[`${AppRoute.CurrentGuitar}1`]} >
          <Product />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('product')).toBeInTheDocument();
  });
});

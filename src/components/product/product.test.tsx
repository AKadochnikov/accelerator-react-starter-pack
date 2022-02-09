import Product from '../product/product';
import {render, screen} from '@testing-library/react';
import {AppRoute, LoadingStatus} from '../../const';
import {useFetchGuitar} from '../../hooks/useFetchGuitar';
//import {fakeGuitar} from '../../mockGuitars';
import {MemoryRouter} from 'react-router-dom';
import {defaultFallbackInView} from 'react-intersection-observer';
import {fakeGuitar} from '../../mockGuitars';
defaultFallbackInView(true);

jest.mock('../../hooks/useFetchGuitar', () => ({
  useFetchGuitar: jest.fn(),
}));

describe('Component: Product',  () => {
  it('should is loading component', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>, Parameters<typeof useFetchGuitar>>).mockReturnValue({
      guitar: null,
      loadStatus: LoadingStatus.Loading,
    });
    render(
      <MemoryRouter initialEntries = {[`${AppRoute.CurrentGuitar}1`]} >
        <Product />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should is error', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>, Parameters<typeof useFetchGuitar>>).mockReturnValue({
      guitar: null,
      loadStatus: LoadingStatus.Error,
    });
    render(
      <MemoryRouter initialEntries = {[`${AppRoute.CurrentGuitar}1`]} >
        <Product />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  it('should is rendered component', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>, Parameters<typeof useFetchGuitar>>).mockReturnValue({
      guitar: fakeGuitar,
      loadStatus: LoadingStatus.Loading,
    });
    render(
      <MemoryRouter initialEntries = {[`${AppRoute.CurrentGuitar}1`]} >
        <Product />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('product')).toBeInTheDocument();
  });
});

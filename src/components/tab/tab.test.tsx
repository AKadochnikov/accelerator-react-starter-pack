import {render, screen} from '@testing-library/react';
import Tab from './tab';
import {MemoryRouter, Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {fakeGuitar} from '../../mock-guitars';
import {useFetchGuitar} from '../../hooks/use-fetch-guitar';
import {AppRoute, LoadingStatus} from '../../const';
import Product from '../product/product';
import userEvent from '@testing-library/user-event';
import {defaultFallbackInView} from 'react-intersection-observer';

defaultFallbackInView(true);

jest.mock('../../hooks/use-fetch-guitar', () => ({
  useFetchGuitar: jest.fn(),
}));


const history = createMemoryHistory();

describe('Component: Tab', () => {
  it('should is rendered component', () => {
    render(<Router history={history}><Tab vendorCode={fakeGuitar.vendorCode} type={fakeGuitar.type} stringCount={fakeGuitar.stringCount} description={fakeGuitar.description}/></Router>);

    expect(screen.getByTestId('tab-component')).toBeInTheDocument();
  });

  it('should is change tabs on click',   () => {
    // noinspection DuplicatedCode
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>,Parameters<typeof useFetchGuitar>>).mockReturnValue({guitar: fakeGuitar, loadStatus: LoadingStatus.Complete});
    render(
      <MemoryRouter initialEntries={[`${AppRoute.CurrentGuitar}1`]}>
        <Product/>
      </MemoryRouter>,
    );
    expect(screen.getByTestId('tab-component')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('desc-button'));
    expect(screen.queryByTestId('spec-table')).not.toBeVisible();
    expect(screen.getByTestId('description')).toBeVisible();
    userEvent.click(screen.getByTestId('spec-button'));
    expect(screen.queryByTestId('description')).not.toBeVisible();
    expect(screen.getByTestId('spec-table')).toBeVisible();
  });
});

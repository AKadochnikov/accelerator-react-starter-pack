import Product from '../product/product';
import {render, screen} from '@testing-library/react';
import {AppRoute, LoadingStatus} from '../../const';
import {useFetchGuitar} from '../../hooks/useFetchGuitar';
import {fakeGuitar} from '../../mockGuitars';
import {MemoryRouter} from 'react-router-dom';
import {defaultFallbackInView} from 'react-intersection-observer';
import userEvent from '@testing-library/user-event';
defaultFallbackInView(true);

jest.mock('../../hooks/useFetchGuitar', () => ({
  useFetchGuitar: jest.fn(),
}));


describe('Component: AddCommentModal',  () => {
  it('should is rendered on button click in Product component',   () => {
    // noinspection DuplicatedCode
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>,Parameters<typeof useFetchGuitar>>).mockReturnValue({guitar: fakeGuitar, loadStatus: LoadingStatus.Complete});
    render(
      <MemoryRouter initialEntries={[`${AppRoute.CurrentGuitar}1`]}>
        <Product/>
      </MemoryRouter>,
    );
    userEvent.click(screen.getByTestId('add-comment-button'));
    expect(screen.getByTestId('comment-modal')).toBeInTheDocument();
  });

  it('should input name in form-input', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>,Parameters<typeof useFetchGuitar>>).mockReturnValue({guitar: fakeGuitar, loadStatus: LoadingStatus.Complete});
    render(
      <MemoryRouter initialEntries={[`${AppRoute.CurrentGuitar}1`]}>
        <Product/>
      </MemoryRouter>,
    );
    userEvent.click(screen.getByTestId('add-comment-button'));
    userEvent.type(screen.getByTestId('name-input'), 'Alex');
    expect(screen.getByTestId('name-input')).toHaveValue('Alex');
  });

  it('should check rating value', () => {
    (useFetchGuitar as jest.Mock<ReturnType<typeof useFetchGuitar>,Parameters<typeof useFetchGuitar>>).mockReturnValue({guitar: fakeGuitar, loadStatus: LoadingStatus.Complete});
    render(
      <MemoryRouter initialEntries={[`${AppRoute.CurrentGuitar}1`]}>
        <Product/>
      </MemoryRouter>,
    );
    userEvent.click(screen.getByTestId('add-comment-button'));
    userEvent.click(screen.getByTestId('rate-5'));
    expect(screen.getByTestId('rate-5')).toBeChecked();
    userEvent.click(screen.getByTestId('rate-4'));
    expect(screen.getByTestId('rate-4')).toBeChecked();
    userEvent.click(screen.getByTestId('rate-3'));
    expect(screen.getByTestId('rate-3')).toBeChecked();
    userEvent.click(screen.getByTestId('rate-2'));
    expect(screen.getByTestId('rate-2')).toBeChecked();
    userEvent.click(screen.getByTestId('rate-1'));
    expect(screen.getByTestId('rate-1')).toBeChecked();
  });
});

import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import CatalogCards from './catalog-cards';
import {history} from '../../mockStore';
import {makeFakeGuitars} from '../../mockGuitars';

const fakeGuitars = makeFakeGuitars();

describe('Component: CatalogCards', () => {
  it('should render CatalogCards component', () => {
    render(<Router history={history}><CatalogCards guitars={fakeGuitars}/></Router>);

    expect(screen.getByTestId('catalog-cards')).toBeInTheDocument();
  });
} );

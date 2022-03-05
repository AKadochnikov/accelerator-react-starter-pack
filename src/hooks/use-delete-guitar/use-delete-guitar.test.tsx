import * as redux from 'react-redux';
import {makeFakeAddedGuitars} from '../../mock-guitars';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {renderHook} from '@testing-library/react-hooks';
import {useDeleteGuitar} from './use-delete-guitar';

const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue({ addedGuitars: makeFakeAddedGuitars() });
const mockStore = configureMockStore();
const fakeId = 2;

describe('Hook: useDeleteGuitar', () => {
  it('should return button handler',  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wrapper = ({ children }) => (
      <Provider store={mockStore({})}>
        {children}
      </Provider>
    );

    const {result} = renderHook(() => useDeleteGuitar(jest.fn(), fakeId),{wrapper});

    const handleDelete = result.current;

    expect(typeof handleDelete).toBe('function');
  });
});

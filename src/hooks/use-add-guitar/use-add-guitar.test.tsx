import {renderHook} from '@testing-library/react-hooks';
import {useAddGuitar} from './use-add-guitar';
import {Provider} from 'react-redux';
import * as redux from 'react-redux';
import {makeFakeAddedGuitars} from '../../mock-guitars';
import {configureMockStore} from '@jedmao/redux-mock-store';


const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue({ addedGuitars: makeFakeAddedGuitars() });
const mockStore = configureMockStore();
const fakeId = 9;
const fakeFn = jest.fn();


describe('Hook: useAddGuitar', () => {
  it('should return function button handler',  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wrapper = ({ children }) => (
      <Provider store={mockStore({})}>
        {children}
      </Provider>
    );

    const {result} = renderHook(() => useAddGuitar(fakeId, fakeFn, fakeFn, fakeFn), {wrapper});

    const {handleAddCartButton} = result.current;

    expect(typeof handleAddCartButton).toBe('function');
  });
});

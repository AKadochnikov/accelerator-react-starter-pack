import {renderHook} from '@testing-library/react-hooks';
import {Provider} from 'react-redux';
import * as redux from 'react-redux';
import {fakeGuitar, makeFakeAddedGuitars} from '../../mock-guitars';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {useCartItem} from './use-cart-item';


const spy = jest.spyOn(redux, 'useSelector');
spy.mockReturnValue({ addedGuitars: makeFakeAddedGuitars() });
const mockStore = configureMockStore();

describe('Hook: useCartItem', () => {
  it('should return correct types',  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wrapper = ({ children }) => (
      <Provider store={mockStore({})}>
        {children}
      </Provider>
    );

    const {id, previewImg, type, price} = fakeGuitar;

    const {result} = renderHook(() => useCartItem(id, previewImg, type, price, jest.fn),{wrapper});

    const {currentCount, setCurrentCount, handleInputCount, handleIncrementCount, handleDecrementCount, imagePath, russianType, totalPrice, handleFocusCount} = result.current;

    expect(typeof currentCount).toBe('number');
    expect(typeof setCurrentCount).toBe('function');
    expect(typeof handleInputCount).toBe('function');
    expect(typeof handleIncrementCount).toBe('function');
    expect(typeof handleDecrementCount).toBe('function');
    expect(typeof imagePath).toBe('string');
    expect(typeof russianType).toBe('string');
    expect(typeof totalPrice).toBe('number');
    expect(typeof handleFocusCount).toBe('function');
  });
});

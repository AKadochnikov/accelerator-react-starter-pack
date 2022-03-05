import {renderHook} from '@testing-library/react-hooks';
import {usePrice} from './use-price';
import {makeFakeGuitars} from '../../mock-guitars';

const fakeGuitars = makeFakeGuitars();
const fakeDiscount = 15;

describe('Hook: usePrice', () => {
  it('should return correct types',  () => {
    const {result} = renderHook(() => usePrice(fakeGuitars, fakeDiscount));

    const {resultPrice, totalPrice} = result.current;

    expect(typeof resultPrice).toBe('number');
    expect(typeof totalPrice).toBe('number');
  });
});

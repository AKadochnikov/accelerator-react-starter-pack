import {renderHook} from '@testing-library/react-hooks';
import {useSearch} from './useSearch';
import {useMinMaxPrice} from './useMinMaxPrice';

const fakeParams = '';

jest.mock('./useSearch', () => ({
  useSearch: jest.fn(),
}));

describe('Hook: useMinMaxPrice', () => {
  it('should array and object',  () => {
    (useSearch as jest.Mock<ReturnType<typeof useSearch>,Parameters<typeof useSearch>>).mockReturnValue(new URLSearchParams('_start=0&_end=9'));
    const {result} = renderHook(() => useMinMaxPrice(fakeParams));

    const [minPrice, maxPrice] = result.current;

    expect(typeof minPrice).toBe('number');
    expect(typeof maxPrice).toBe('number');
  });
});

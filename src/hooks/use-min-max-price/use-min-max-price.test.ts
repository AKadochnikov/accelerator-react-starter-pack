import {renderHook} from '@testing-library/react-hooks';
import {useSearch} from '../use-search/use-search';
import {useMinMaxPrice} from './use-min-max-price';

const fakeParams = '';

jest.mock('./use-search', () => ({
  useSearch: jest.fn(),
}));

describe('Hook: useMinMaxPrice', () => {
  it('should numbers',  () => {
    (useSearch as jest.Mock<ReturnType<typeof useSearch>,Parameters<typeof useSearch>>).mockReturnValue(new URLSearchParams('_start=0&_end=9'));
    const {result} = renderHook(() => useMinMaxPrice(fakeParams));

    const [minPrice, maxPrice] = result.current;

    expect(typeof minPrice).toBe('number');
    expect(typeof maxPrice).toBe('number');
  });
});

import {renderHook} from '@testing-library/react-hooks';
import {useFetchGuitars} from './useFetchGuitars';
import {useSearch} from './useSearch';

const fakeParams = '';

jest.mock('./useSearch', () => ({
  useSearch: jest.fn(),
}));

describe('Hook: useFetchGuitars', () => {
  it('should array and object',  () => {
    (useSearch as jest.Mock<ReturnType<typeof useSearch>,Parameters<typeof useSearch>>).mockReturnValue(new URLSearchParams('_start=0&_end=9'));
    const {result} = renderHook(() => useFetchGuitars(fakeParams));

    const {guitars, totalGuitars} = result.current;

    expect(Array.isArray(guitars)).toBe(true);
    expect(typeof totalGuitars).toBe('number');
  });
});

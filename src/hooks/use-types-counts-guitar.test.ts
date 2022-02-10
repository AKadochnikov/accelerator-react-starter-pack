import {renderHook} from '@testing-library/react-hooks';
import {useSearch} from './useSearch';
import {useTypesCountsGuitar} from './useTypesCountsGuitar';


jest.mock('./useSearch', () => ({
  useSearch: jest.fn(),
}));

describe('Hook: useFetchGuitars', () => {
  it('should array and object',  () => {
    (useSearch as jest.Mock<ReturnType<typeof useSearch>,Parameters<typeof useSearch>>).mockReturnValue(new URLSearchParams('_start=0&_end=9'));
    const {result} = renderHook(() => useTypesCountsGuitar());

    const {currentTypes, currentCounts} = result.current;

    expect(Array.isArray(currentTypes)).toBe(true);
    expect(Array.isArray(currentCounts)).toBe(true);
  });
});

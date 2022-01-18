import {renderHook} from '@testing-library/react-hooks';
import {useFetchGuitars} from './useFetchGuitars';
import * as module from './useSearch';

const fakeParams = '';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
jest.mock(module, () => ({
  useSearch: jest.fn().mockReturnValue(new URLSearchParams('_start=0&_end=9')),
}));

describe('Hook: useFetchGuitars', () => {
  it('should array and object',  () => {
    const {result} = renderHook(() => useFetchGuitars(fakeParams));

    const {guitars, totalGuitars} = result.current;

    expect(guitars).toBeInstanceOf(Array);
    expect(totalGuitars).toBeInstanceOf(Number);
  });
});

import {renderHook} from '@testing-library/react-hooks';
import {useFetchGuitar} from './use-fetch-guitar';

const id = '1';
const fakeId = '1ol';

describe('Hook: useFetchGuitar', () => {
  it('should object and loadStatus',  () => {
    const {result} = renderHook(() => useFetchGuitar(id));

    const {guitar, loadStatus} = result.current;

    expect(typeof guitar).toBe('object');
    expect(typeof loadStatus).toBe('string');
  });

  it('should null and loadStatus if take fakeId',  () => {
    const {result} = renderHook(() => useFetchGuitar(fakeId));

    const {guitar, loadStatus} = result.current;

    expect(guitar).toBe(null);
    expect(typeof loadStatus).toBe('string');
  });
});

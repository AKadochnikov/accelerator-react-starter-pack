import {renderHook} from '@testing-library/react-hooks';
import {useSearch} from './use-search';
import {useLocation} from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}));

describe('Hook: useSearch', () => {
  it('should object',  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (useLocation as jest.Mock<ReturnType<typeof useLocation>,Parameters<typeof useLocation>>).mockReturnValue({search:'?key=value'} as Location<unknown>);
    const {result} = renderHook(() => useSearch());

    const search = result.current;

    expect(typeof search).toBe('object');
  });
});

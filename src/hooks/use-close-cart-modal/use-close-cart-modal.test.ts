import {renderHook} from '@testing-library/react-hooks';
import {useCloseCartModal} from './use-close-cart-modal';

const fakeFn = jest.fn();

describe('Hook: useCloseCartModal', () => {
  it('should return two close handlers',  () => {
    const {result} = renderHook(() => useCloseCartModal(fakeFn));

    const {handleKeyDown, handleCloseClick} = result.current;

    expect(typeof handleKeyDown).toBe('function');
    expect(typeof handleCloseClick).toBe('function');
  });
});

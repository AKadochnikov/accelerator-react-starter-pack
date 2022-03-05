import {renderHook} from '@testing-library/react-hooks';
import {useOpenCartModal} from './use-open-cart-modal';

describe('Hook: useOpenCartModal', () => {
  it('should return correct types',  () => {
    const {result} = renderHook(() => useOpenCartModal());

    const {handleOpenCartModal, setIsOpenedCartModal, isOpenedCartModal} = result.current;

    expect(typeof handleOpenCartModal).toBe('function');
    expect(typeof setIsOpenedCartModal).toBe('function');
    expect(typeof isOpenedCartModal).toBe('boolean');
  });
});

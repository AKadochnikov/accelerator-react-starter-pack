import {renderHook} from '@testing-library/react-hooks';
import {useOpenSuccessCartModal} from './use-open-success-cart-modal';

describe('Hook: useOpenSuccessCartModal', () => {
  it('should return correct types',  () => {
    const {result} = renderHook(() => useOpenSuccessCartModal());

    const {setIsOpenedSuccessCartModal, isOpenedSuccessCartModal} = result.current;

    expect(typeof setIsOpenedSuccessCartModal).toBe('function');
    expect(typeof isOpenedSuccessCartModal).toBe('boolean');
  });
});

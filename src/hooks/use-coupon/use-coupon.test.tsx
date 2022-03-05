import {renderHook} from '@testing-library/react-hooks';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {useCoupon} from './use-coupon';

const mockStore = configureMockStore();

describe('Hook: useCoupon', () => {
  it('should return correct types',  () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const wrapper = ({ children }) => (
      <Provider store={mockStore({})}>
        {children}
      </Provider>
    );

    const {result} = renderHook(() => useCoupon(),{wrapper});

    const {isLoading, isError, isSuccess, handleCouponValidity, handleInput} = result.current;

    expect(typeof isLoading).toBe('boolean');
    expect(typeof isError).toBe('boolean');
    expect(typeof isSuccess).toBe('boolean');
    expect(typeof handleCouponValidity).toBe('function');
    expect(typeof handleInput).toBe('function');
  });
});

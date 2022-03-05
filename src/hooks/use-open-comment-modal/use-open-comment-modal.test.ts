import {renderHook} from '@testing-library/react-hooks';
import {useOpenCommentModal} from './use-open-comment-modal';

describe('Hook: useOpenCommentModal', () => {
  it('should return correct types',  () => {
    const {result} = renderHook(() => useOpenCommentModal());

    const {handleOpenCommentModal, setIsOpenedCommentModal, isOpenedCommentModal} = result.current;

    expect(typeof handleOpenCommentModal).toBe('function');
    expect(typeof setIsOpenedCommentModal).toBe('function');
    expect(typeof isOpenedCommentModal).toBe('boolean');
  });
});

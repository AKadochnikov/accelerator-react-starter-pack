import {renderHook} from '@testing-library/react-hooks';
import {useAddCommentForm} from './use-add-comment-form';

const fakeFn = jest.fn();
const fakeId = 9;

describe('Hook: useAddCommentForm', () => {
  it('should return correct types',  () => {
    const {result} = renderHook(() => useAddCommentForm(fakeFn, fakeFn, fakeId));

    const {isDisabledSubmit, isValidInput, isValidRating, isFormDisabled, handleInput, handleRating, handleSubmit, advantageRef, commentRef, disadvantageRef} = result.current;

    expect(typeof isDisabledSubmit).toBe('boolean');
    expect(typeof isValidInput).toBe('boolean');
    expect(typeof isValidRating).toBe('boolean');
    expect(typeof isFormDisabled).toBe('boolean');
    expect(typeof handleInput).toBe('function');
    expect(typeof handleRating).toBe('function');
    expect(typeof handleSubmit).toBe('function');
    expect(typeof advantageRef).toBe('object');
    expect(typeof commentRef).toBe('object');
    expect(typeof disadvantageRef).toBe('object');
  });
});

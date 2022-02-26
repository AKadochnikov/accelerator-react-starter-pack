import {Dispatch, FormEvent, MouseEvent, SetStateAction, useRef, useState} from 'react';
import {postComment} from '../../utils';

export const useAddCommentForm = (setIsOpenedCommentModal: Dispatch<SetStateAction<boolean>>, setIsOpenedSuccessModal: Dispatch<SetStateAction<boolean>>, id: number) => {
  const [nameValue, setNameValue] = useState<string>('');
  const [isDisabledSubmit, setIsDisabledSubmit] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [isValidRating, setIsValidRating] = useState<boolean>(true);
  const advantageRef = useRef<HTMLInputElement | null>(null);
  const disadvantageRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const handleInput = (evt: FormEvent<HTMLInputElement>) => {
    const currentValue = evt.currentTarget.value;
    setNameValue(currentValue);
    if (currentValue === '') {
      setIsDisabledSubmit(true);
      setIsValidInput(false);
    } else if (ratingValue === 0) {
      setIsDisabledSubmit(true);
      setIsValidRating(false);
      setIsValidInput(true);
    } else {
      setIsDisabledSubmit(false);
      setIsValidInput(true);
    }
  };

  const handleRating = (evt: MouseEvent<HTMLInputElement>) => {
    const currentValue = Number(evt.currentTarget.value);
    setRatingValue(currentValue);
    if (currentValue === 0) {
      setIsDisabledSubmit(true);
      setIsValidRating(false);
    } else if (nameValue === '') {
      setIsDisabledSubmit(true);
      setIsValidInput(false);
      setIsValidRating(true);
    } else {
      setIsDisabledSubmit(false);
      setIsValidRating(true);
    }
  };

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(nameValue === '' || ratingValue === 0) {
      setIsValidInput(false);
      setIsValidRating(false);
      return;
    }
    let advantageValue = '-';
    let disadvantageValue = '-';
    let commentValue = '-';
    if (advantageRef.current?.value) {
      advantageValue = advantageRef.current?.value;
    }
    if (disadvantageRef.current?.value) {
      disadvantageValue = disadvantageRef.current?.value;
    }
    if (commentRef.current?.value) {
      commentValue = commentRef.current?.value;
    }
    postComment(id, nameValue, advantageValue, disadvantageValue, commentValue, ratingValue, setIsFormDisabled, setIsDisabledSubmit, setIsOpenedCommentModal, setIsOpenedSuccessModal);
  };
  return {isDisabledSubmit, isValidInput, isValidRating, isFormDisabled, handleInput, handleRating, handleSubmit, advantageRef, commentRef, disadvantageRef};
};

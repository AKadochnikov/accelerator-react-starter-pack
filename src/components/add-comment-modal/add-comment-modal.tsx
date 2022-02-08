import {Dispatch, SetStateAction, useState} from 'react';
import {Key} from '../../const';
import FocusTrap from 'focus-trap-react';
import {FormEvent, MouseEvent} from 'react';

type AddCommentModalProps = {
  setIsOpenedCommentModal: Dispatch<SetStateAction<boolean>>
  guitarName: string;
}


function AddCommentModal(props: AddCommentModalProps): JSX.Element {
  const {setIsOpenedCommentModal, guitarName} = props;
  const [isValidRating, setIsValidRating] = useState<boolean>(true);
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [isDisabledSubmit, setIsDisabledSubmit] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>('');
  const [ratingValue, setRatingValue] = useState<number>(0);

  const handleKeyDown = (evt: KeyboardEvent) => {
    if(evt.key === Key.Escape || evt.key === Key.Esc) {
      setIsOpenedCommentModal(false);
      document.body.removeEventListener('keydown', handleKeyDown);
    }
  };

  document.body.addEventListener('keydown', handleKeyDown);
  const handleCloseClick = () => {
    document.body.style.overflow = 'scroll';
    setIsOpenedCommentModal(false);
    document.body.removeEventListener('keydown', handleKeyDown);
  };

  const handleInput = (evt: FormEvent<HTMLInputElement>) => {
    const currentValue = evt.currentTarget.value;
    setNameValue(currentValue);
    if (currentValue === '') {
      setIsDisabledSubmit(true);
      setIsValidInput(false);
    } else if (ratingValue === 0) {
      setIsDisabledSubmit(true);
      setIsValidRating(false);
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
    } else {
      setIsDisabledSubmit(false);
      setIsValidRating(true);
    }
  };

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    // eslint-disable-next-line no-console
    console.log('Hello');
  };

  return (
    <FocusTrap>
      <div className="modal is-active modal--review">
        <div className="modal__wrapper">
          <div onClick={handleCloseClick} className="modal__overlay"/>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{guitarName}</h3>
            <form className="form-review">
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input onInput={handleInput} className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off"/>
                  <span className="form-review__warning" aria-live='polite'>{isValidInput? '' : 'Заполните поле'}</span>
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input onClick={handleRating} className="visually-hidden" type="radio" id="star-5" name="rate" value="5"/>
                    <label className="rate__label" htmlFor="star-5" title="Отлично"/>
                    <input onClick={handleRating} className="visually-hidden" type="radio" id="star-4" name="rate" value="4"/>
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"/>
                    <input onClick={handleRating} className="visually-hidden" type="radio" id="star-3" name="rate" value="3"/>
                    <label className="rate__label" htmlFor="star-3" title="Нормально"/>
                    <input onClick={handleRating} className="visually-hidden" type="radio" id="star-2" name="rate" value="2"/>
                    <label className="rate__label" htmlFor="star-2" title="Плохо"/>
                    <input onClick={handleRating} className="visually-hidden" type="radio" id="star-1" name="rate" value="1"/>
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"/>
                    <span className="rate__count"/>
                    <span className="rate__message" aria-live='polite'>{isValidRating? '' : 'Поставьте оценку'}</span>
                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="user-name">Достоинства</label>
              <input className="form-review__input" id="pros" type="text" autoComplete="off"/>
              <label className="form-review__label" htmlFor="user-name">Недостатки</label>
              <input className="form-review__input" id="user-name" type="text" autoComplete="off"/>
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off"/>
              <button onClick={handleSubmit} className="button button--medium-20 form-review__button" type="submit" disabled={isDisabledSubmit}>Отправить отзыв</button>
            </form>
            <button onClick={handleCloseClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"/>
              <span className="modal__close-btn-interactive-area"/>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default AddCommentModal;

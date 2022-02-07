import {Dispatch, SetStateAction} from 'react';
import {Key} from '../../const';

type AddCommentModalProps = {
  setIsOpenedCommentModal: Dispatch<SetStateAction<boolean>>
  guitarName: string;
}


function AddCommentModal(props: AddCommentModalProps): JSX.Element {
  const {setIsOpenedCommentModal, guitarName} = props;

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
  return (
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
                <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off"/>
                <span className="form-review__warning">Заполните поле</span>
              </div>
              <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                <div className="rate rate--reverse">
                  <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5"/>
                  <label className="rate__label" htmlFor="star-5" title="Отлично"/>
                  <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4"/>
                  <label className="rate__label" htmlFor="star-4" title="Хорошо"/>
                  <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3"/>
                  <label className="rate__label" htmlFor="star-3" title="Нормально"/>
                  <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2"/>
                  <label className="rate__label" htmlFor="star-2" title="Плохо"/>
                  <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1"/>
                  <label className="rate__label" htmlFor="star-1" title="Ужасно"/>
                  <span className="rate__count"/>
                  <span className="rate__message">Поставьте оценку</span>
                </div>
              </div>
            </div>
            <label className="form-review__label" htmlFor="user-name">Достоинства</label>
            <input className="form-review__input" id="pros" type="text" autoComplete="off"/>
            <label className="form-review__label" htmlFor="user-name">Недостатки</label>
            <input className="form-review__input" id="user-name" type="text" autoComplete="off"/>
            <label className="form-review__label" htmlFor="user-name">Комментарий</label>
            <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off"/>
            <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
          </form>
          <button onClick={handleCloseClick} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
            <span className="button-cross__icon"/>
            <span className="modal__close-btn-interactive-area"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCommentModal;

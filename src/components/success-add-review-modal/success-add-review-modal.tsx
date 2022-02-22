import {Key} from '../../const';
import FocusTrap from 'focus-trap-react';
import {Dispatch, SetStateAction, MouseEvent} from 'react';
import {Comment} from '../../types/types';
import {getComments} from '../../utils';

type SuccessModalProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setComments: Dispatch<SetStateAction<Comment[]>>
  id: number;
}

function SuccessModal (props: SuccessModalProps): JSX.Element {
  const {setIsOpen, setComments, id} = props;
  const handleKeyDownSuccess = (evt: KeyboardEvent) => {
    if(evt.key === Key.Escape || evt.key === Key.Esc) {
      getComments(id, setComments);
      setIsOpen(false);
      document.body.removeEventListener('keydown', handleKeyDownSuccess);
    }
  };

  document.body.addEventListener('keydown', handleKeyDownSuccess);
  const handleCloseClick = () => {
    getComments(id, setComments);
    document.body.style.overflow = 'scroll';
    setIsOpen(false);
    document.body.removeEventListener('keydown', handleKeyDownSuccess);
  };

  const handleClickButton = (evt: MouseEvent<HTMLButtonElement>) => {
    getComments(id, setComments);
    handleCloseClick();
  };

  return (
    <FocusTrap>
      <div className="modal is-active modal--success" data-testid={'modal-success'}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={handleCloseClick}/>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"/>
            </svg>
            <p className="modal__message">Спасибо за ваш отзыв!</p>
            <div className="modal__button-container modal__button-container--review">
              <button onClick={handleClickButton} className="button button--small modal__button modal__button--review">К покупкам!</button>
            </div>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
              <span className="button-cross__icon"/>
              <span onClick={handleCloseClick} className="modal__close-btn-interactive-area"/>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
}

export default SuccessModal;

import {useCloseCartModal} from '../../hooks/use-close-cart-modal/use-close-cart-modal';
import {Dispatch, SetStateAction, MouseEvent} from 'react';
import FocusTrap from 'focus-trap-react';
import {useHistory} from 'react-router-dom';
import {AppRoute} from '../../const';

type SuccessAddCartModalProps = {
  setIsOpenedSuccessCartModal: Dispatch<SetStateAction<boolean>>;
}

function SuccessAddCartModal (props: SuccessAddCartModalProps): JSX.Element {
  const {setIsOpenedSuccessCartModal} = props;
  const {handleCloseClick, handleKeyDown} = useCloseCartModal(setIsOpenedSuccessCartModal);
  const history = useHistory();
  document.body.addEventListener('keydown', handleKeyDown);

  const handleClickButton = (evt: MouseEvent<HTMLButtonElement>, path: string) => {
    handleCloseClick(evt);
    history.push(path);
  };

  return (
    <FocusTrap>
      <div className="modal is-active modal--success">
        <div className="modal__wrapper">
          <div onClick={handleCloseClick} className="modal__overlay" data-close-modal/>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"/>
            </svg>
            <p className="modal__message">Товар успешно добавлен в корзину</p>
            <div className="modal__button-container modal__button-container--add">
              <button onClick={(evt) => handleClickButton(evt, AppRoute.Cart)} className="button button--small modal__button">Перейти в корзину</button>
              <button onClick={(evt) => handleClickButton(evt, AppRoute.Main)} className="button button--black-border button--small modal__button modal__button--right">Продолжить покупки</button>
            </div>
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

export default SuccessAddCartModal;

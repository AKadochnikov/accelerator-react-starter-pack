import FocusTrap from 'focus-trap-react';
import {Dispatch, SetStateAction, useEffect} from 'react';
import {useCloseCartModal} from '../../hooks/use-close-cart-modal/use-close-cart-modal';
import {useDeleteGuitar} from '../../hooks/use-delete-guitar/use-delete-guitar';

type DeleteCartModalProps = {
  name: string;
  vendorCode: string;
  imagePath: string;
  stringCount: number;
  price: number;
  type: string;
  setIsOpenedModal: Dispatch<SetStateAction<boolean>>
  id: number;
}

function DeleteCartModal (props: DeleteCartModalProps): JSX.Element {
  const {name, stringCount, vendorCode, type, price, imagePath, setIsOpenedModal, id} = props;
  const {handleCloseClick, handleKeyDown} = useCloseCartModal(setIsOpenedModal);
  const handleDeleteGuitars = useDeleteGuitar(handleCloseClick, id);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, id]);

  return (
    <FocusTrap>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div onClick={handleCloseClick} className="modal__overlay" data-close-modal/>
          <div className="modal__content" data-testid={'delete-modal'}>
            <h2 className="modal__header title title--medium title--red">Удалить этот товар?</h2>
            <div className="modal__info"><img className="modal__img" src={imagePath} width="67" height="137" alt="Честер bass"/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{type}, {stringCount} струнная</p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{price} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button onClick={handleDeleteGuitars} className="button button--small modal__button">Удалить товар</button>
              <button onClick={handleCloseClick} className="button button--black-border button--small modal__button modal__button--right">Продолжить
              покупки
              </button>
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

export default DeleteCartModal;

import FocusTrap from 'focus-trap-react';
import {Dispatch, SetStateAction, useEffect} from 'react';
import {useCloseCartModal} from '../../hooks/use-close-cart-modal/use-close-cart-modal';
import {getRussianType} from '../../utils';
import {useAddGuitar} from '../../hooks/use-add-guitar/use-add-guitar';

type AddCartModalProps = {
  setIsOpenedCartModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenedSuccessCartModal: Dispatch<SetStateAction<boolean>>
  name: string;
  vendorCode: string;
  type: string;
  stringCount: number;
  price: number;
  imgPath: string;
  id: number
}

function AddCartModal(props: AddCartModalProps): JSX.Element {
  const {setIsOpenedCartModal, stringCount, type, name, vendorCode, price, imgPath, id, setIsOpenedSuccessCartModal} = props;
  const {handleKeyDown, handleCloseClick} = useCloseCartModal(setIsOpenedCartModal);
  const {handleAddCartButton} = useAddGuitar(id, setIsOpenedCartModal, handleKeyDown, setIsOpenedSuccessCartModal);
  const russianType = getRussianType(type);

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
  });
  return (
    <FocusTrap>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div onClick={handleCloseClick} className="modal__overlay" data-close-modal/>
          <div className="modal__content" data-testid={'cart-modal'}>
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img className="modal__img" src={imgPath} width="67" height="137" alt="Честер bass"/>
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">Гитара {name}</h3>
                <p className="modal__product-params modal__product-params--margin-11">Артикул: {vendorCode}</p>
                <p className="modal__product-params">{russianType}, {stringCount} струнная</p>
                <p className="modal__price-wrapper"><span className="modal__price">Цена:</span>
                  <span className="modal__price">{price} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button onClick={handleAddCartButton} className="button button--red button--big modal__button modal__button--add" data-testid={'add-cart'}>Добавить в корзину</button>
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

export default AddCartModal;

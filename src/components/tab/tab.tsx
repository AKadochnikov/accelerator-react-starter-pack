import {getRussianType} from '../../utils';
import {useState} from 'react';
import {Tabs} from '../../const';
import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';

type TabProps = {
  vendorCode: string;
  type: string;
  stringCount: number;
  description: string;
}

function Tab (props: TabProps): JSX.Element {
  const {type, stringCount, vendorCode, description} = props;
  const russianType = getRussianType(type);
  const [activeTab, setActiveTab] = useState<string>(Tabs.Specifications);

  const handleChangeTab = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    const currentValue = evt.currentTarget.getAttributeNode('datatype')?.value;
    if (currentValue !== undefined) {
      setActiveTab(currentValue);
    }
  };

  return (
    <div className="tabs" data-testid={'tab-component'}>
      <Link onClick={handleChangeTab} className={`button button--medium tabs__button ${activeTab === Tabs.Specifications? '' : 'button--black-border'}`} to={'#'} datatype={Tabs.Specifications} data-testid={'spec-button'}>Характеристики</Link>
      <Link onClick={handleChangeTab} className={`button button--medium tabs__button ${activeTab === Tabs.Description? '' : 'button--black-border'}`} to={'#'} datatype={Tabs.Description} data-testid={'desc-button'}>Описание</Link>
      <div className="tabs__content" id="characteristics">
        <table className="tabs__table" hidden={activeTab === Tabs.Description} data-testid={'spec-table'}>
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{vendorCode}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{russianType}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{stringCount} струнная</td>
            </tr>
          </tbody>
        </table>
        <p className="tabs__product-description" hidden={activeTab === Tabs.Specifications} data-testid={'description'}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default Tab;

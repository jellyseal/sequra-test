import CreditCalls from '../calls/creditCalls';
import EventsCall from '../calls/eventCalls';
import SequraPaymentsModal from './SequraPaymentsModal';
import { DOMException, ApiException } from './SequraPaymentsErrors';

function SequraPayments({
  addonScope,
  container,
  priceId,
  sequraAddonContainer,
}) {
  const checkDOMErrors = () => {
    if (!addonScope.querySelector(container)) {
      throw new DOMException('No se ha podido encontrar o no se ha declarado el container');
    }
    const newContainer = addonScope.querySelector(container);
    if (!newContainer.querySelector(priceId)) {
      throw new DOMException('No se ha podido encontrar o no se ha declarado el priceId');
    }
    if (!newContainer.querySelector(sequraAddonContainer)) {
      throw new DOMException('No se ha podido encontrar o no se ha declarado el sequraAddonContainer');
    }
  };
  const getPrice = (priceContainer) => {
    const numberPattern = /\d+/g;
    const stringPricesArray = priceContainer.innerHTML.match(numberPattern);
    const stringPrice = `${stringPricesArray[0]}.${stringPricesArray[1]}`;
    const price = parseFloat(stringPrice);
    return price;
  };
  const openMoreInfoModal = (agreements, sequraSelect) => {
    const newDiv = addonScope.createElement('DIV');
    const instalmentTotal = agreements[sequraSelect.selectedIndex].instalment_total.string;
    const overlayStyle = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(128, 128, 128, 0.5);
            z-index: 99999;
        `;
    const modalStyle = `
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            left: 50%;
            width: 400px;
            padding: 20px;
            background: white;
            z-index: 999999;
        `;
    newDiv.style = overlayStyle;
    newDiv.innerHTML = SequraPaymentsModal(modalStyle, instalmentTotal);
    // Append modal to body
    addonScope.body.appendChild(newDiv);
    newDiv.addEventListener('click', () => {
      newDiv.remove();
    });
  };

  const renderAddon = async () => {
    const modifiedContainer = this.sequraAddonContainer;
    const initialHtml = `
            <div style="display: flex; flex-direction: column; width: 100%;">
                <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                    <p>Págalo en</p>
                    <p style="cursor: pointer; text-decoration: underline; color: blue;">Más información</p>
                </div>
                <select />
            </div>
        `;
    modifiedContainer.innerHTML = initialHtml;
    const sequraSelect = modifiedContainer.children[0].children[1];
    const agreements = await CreditCalls.getCreditAgreement(this.productPrice);
    if (agreements.length) {
      agreements.forEach(({
        // eslint-disable-next-line camelcase
        instalment_count,
        cost_of_credit: { string },
      }) => {
        // eslint-disable-next-line camelcase
        const instalmentCount = instalment_count;
        const option = addonScope.createElement('OPTION');
        option.innerHTML = `${instalmentCount} cuotas de ${string}/mes`;
        option.value = instalmentCount;
        sequraSelect.appendChild(option);
      });
      // Listen and send select events
      sequraSelect.addEventListener('change', (event) => {
        EventsCall.sendEvent({
          context: 'checkoutWidget',
          type: 'simulatorInstalmentChanged',
          selectedInstalment: event.target.value,
        });
      });
      // Listen moreInfo click and open modal
      const moreInfoButton = modifiedContainer.children[0].children[0].children[1];
      moreInfoButton.addEventListener('click', () => {
        openMoreInfoModal(agreements, sequraSelect);
      });
    } else {
      throw new ApiException('No se ha recibido ningún Agreement');
    }
  };
  checkDOMErrors();
  this.container = addonScope.querySelector(container);
  this.priceId = priceId;
  this.priceContainer = this.container.querySelector(this.priceId);
  this.sequraAddonContainer = this.container.querySelector(sequraAddonContainer);
  this.productPrice = getPrice(this.priceContainer);
  this.run = () => renderAddon();
}

export default SequraPayments;

import {Selector, t} from 'testcafe';

class FinishPage {
    constructor(){
        this.finishLabel = Selector('.subheader');
        this.FinishBtn = Selector('.cart_button');
        this.thanksMessage = Selector('.complete-header');
        this.orderDispatchedMessage = Selector('.complete-text');

    }

    async finishPageLoaded(){
        let finishLabel = await this.finishLabel.textContent;
        console.log('checkout Page: ' + finishLabel);
        return finishLabel
    }

    async thanksMessageDsplayed(){
        let thanksMessage = await this.thanksMessage.textContent;
        console.log('checkout Page: ' + thanksMessage);
        return thanksMessage
    }

    async orderDispatched(){
        let orderMessage = await this.orderDispatchedMessage.textContent;
        console.log('checkout Page: ' + orderMessage);
        return orderMessage
    }

}

export default new FinishPage();
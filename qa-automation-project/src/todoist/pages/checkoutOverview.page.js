import {Selector, t} from 'testcafe';

class CheckoutOverviewPage {
    constructor(){
        this.checkoutLabel = Selector('.subheader');
        this.paymentLabel = Selector('div.summary_info_label').withExactText('Payment Information:');
        this.shippingLabel = Selector('div.summary_info_label').withExactText('Shipping Information:');
        this.FinishBtn = Selector('.cart_button');
        this.backpackAdded = Selector('div.inventory_item_name').withExactText('Sauce Labs Backpack');
        this.tShirtAdded = Selector ('div.inventory_item_name').withExactText('Sauce Labs Bolt T-Shirt');
        this.jacketAded = Selector ('div.inventory_item_name').withExactText('Sauce Labs Fleece Jacket');
    }

    async checkoutOverviewPageLoaded(){
        let checkoutLabel = await this.checkoutLabel.textContent;
        console.log('checkout Page: ' + checkoutLabel);
        return checkoutLabel
    }

    async paymentInfoLabel(){
        return await this.paymentLabel.exists;
    }

    async shippingInfoLabel(){
        return await this.shippingLabel.exists;
    }

    async verifyBackpackAdded(){
        let existsBackpackItem = await this.backpackAdded.exists;
        console.log('item added: ' + existsBackpackItem);
        return existsBackpackItem
    }

    async verifyTShirtAdded(){
        let existsTShirt = await this.tShirtAdded.exists;
        console.log('item added: ' + existsTShirt);
        return existsTShirt
    }

    async verifyJacketAded(){
        let existsJacket = await this.jacketAded.exists;
        console.log('item added: ' + existsJacket);
        return existsJacket
    }

    async clickFinishOrder(){
        await t.click(this.FinishBtn);
    }
}

export default new CheckoutOverviewPage();
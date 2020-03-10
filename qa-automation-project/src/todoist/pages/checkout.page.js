import {Selector, t} from 'testcafe';

class CheckoutPage {
    constructor(){
        this.checkoutLabel = Selector('.subheader');
        this.firstName = Selector('#first-name');
        this.lastName = Selector('#last-name');
        this.zipCode = Selector('#postal-code');
        this.continuetBtn = Selector('.cart_button');

    }

    get errorMessage(){
        return Selector('h3[data-test="error"]');
    }

    async checkoutPageLoaded(){
        let checkoutLabel = await this.checkoutLabel.textContent;
        console.log('checkout Page: ' + checkoutLabel);
        return checkoutLabel
    }

    async requiredNameMessage(lastName,zipCode){
        await t.typeText(this.lastName, lastName)
                .typeText(this.zipCode, zipCode)
                .click(this.continuetBtn);
        let errorMessage = await this.errorMessage.textContent;
        console.log('required messsage' + errorMessage);
        return errorMessage
    }

    async requiredLastNameMessage(name,zipCode){
        await t.typeText(this.firstName, name)
                .typeText(this.zipCode, zipCode)
                .click(this.continuetBtn);
        let errorMessage = await this.errorMessage.textContent;
        console.log('required messsage' + errorMessage);
        return errorMessage
    }

    async requiredZipCodeMessage(name,lastName){
        await t.typeText(this.firstName, name)
                .typeText(this.lastName, lastName)
                .click(this.continuetBtn);
        let errorMessage = await this.errorMessage.textContent;
        console.log('required messsage' + errorMessage);
        return errorMessage
    }

    async enterCheckoutInfo(name,lastName,zipCode){
        await t.typeText(this.firstName, name)
                .typeText(this.lastName, lastName)
                .typeText(this.zipCode,zipCode)
                
    }   
    
    async clickContinueBtn(){
        await t.click(this.continuetBtn);
    }
}

export default new CheckoutPage();
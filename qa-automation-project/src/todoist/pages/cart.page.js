import {Selector, t} from 'testcafe';

class CartPage {
    constructor(){
        this.subheader = Selector('.subheader');
        this.checkoutBtn = Selector('.checkout_button');
        this.backpackAdded = Selector('div.inventory_item_name').withExactText('Sauce Labs Backpack');
        this.tShirtAdded = Selector ('div.inventory_item_name').withExactText('Sauce Labs Bolt T-Shirt');
        this.jacketAded = Selector ('div.inventory_item_name').withExactText('Sauce Labs Fleece Jacket');
        this.removeBtn = Selector('.btn_secondary.cart_button');  
    }

    get itemAdded(){
        return Selector('.inventory_item_name');
    }

    async cartPageLoaded(){
        let cartLabel = await this.subheader.textContent;
        console.log('text content cart header: ' + cartLabel);
        return cartLabel
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

    async verifyJacketAdded(){
        let existsJacket = await this.jacketAded.exists;
        console.log('item added: ' + existsJacket);
        return existsJacket
    }

    async clickCheckout(){
        await t.click(this.checkoutBtn);
    }

    async removeItems(){
        let removeExists = await this.removeBtn.exists;
       while(await this.removeBtn.exists){
                await t.click(this.removeBtn);
                removeExists = await this.removeBtn.exists
                console.log("Remove status"+ removeExists);
        }   
       return await this.removeBtn.exists
    }
}

export default new CartPage();
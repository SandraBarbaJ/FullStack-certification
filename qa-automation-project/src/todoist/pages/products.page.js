import {Selector, t} from 'testcafe';

class ProductsPage {
    constructor(){
        this.productsLabel = Selector('.product_label');
        this.menuPage = Selector('.bm-burger-button');
        this.logOutlink = Selector('.bm-item-list a#logout_sidebar_link');
        this.cartImage = Selector('#shopping_cart_container');
        this.productBag = Selector ('div.inventory_item_name').withExactText('Sauce Labs Backpack').parent('a').parent('div').parent('div').find('button.btn_primary').withExactText('ADD TO CART');
        this.productTShirt = Selector ('div.inventory_item_name').withExactText('Sauce Labs Bolt T-Shirt').parent('a').parent('div').parent('div').find('button.btn_primary').withExactText('ADD TO CART');
        this.productJacket = Selector ('div.inventory_item_name').withExactText('Sauce Labs Fleece Jacket').parent('a').parent('div').parent('div').find('button.btn_primary').withExactText('ADD TO CART');
    }

    async productsPageLoaded(){
        let productsLabel = await this.productsLabel.textContent;
        console.log('Exist Prduct Page: ' + productsLabel);
        return productsLabel
    }

    async pageLogOut(){
        await t.click(this.menuPage)
               .click(this.logOutlink);
    }

    async clickCart(){
        await t.click(this.cartImage);
    }

    async addOneItem(){
        await t.click(this.productBag);
    }

    async addMultipleItems(){
        await t.click(this.productJacket);
        await t.click(this.productTShirt);
    }
    
}

export default new ProductsPage();
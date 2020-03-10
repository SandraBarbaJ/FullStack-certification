import {Selector, t} from 'testcafe';

class LoginPage {

    /* este constructor es para dar clic en login link*/
    constructor(){
        this.userField = Selector('#user-name');
        this.userPassword = Selector('#password');
        this.loginButton = Selector('.btn_action');
        this.mainImage = Selector('.bot_column')
    }

    get errorMessage(){
        return Selector('h3[data-test="error"]');
    }

    async login(user,password){
        await t.typeText(this.userField, user)
                .typeText(this.userPassword, password)
                .click(this.loginButton)
    }

    async errorIncorrectLogIn(){
        let error = await this.errorMessage.textContent;
        console.log('Text: ' + error);
        return error
    }

    async mainImageDisplayed(){
        let image = await this.mainImage.exists;
        return image
    }
}

export default new LoginPage();
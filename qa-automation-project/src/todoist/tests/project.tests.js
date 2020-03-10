import { t } from 'testcafe';
import LoginPage from '../pages/login.page.js';
import ProductsPage from '../pages/products.page.js';
import CartPage from '../pages/cart.page.js';
import CheckoutPage from '../pages/checkout.page.js';
import CheckoutOverviewPage from '../pages/checkoutOverview.page.js';
import FinishPage from '../pages/finish.page.js';
import checkoutOverviewPage from '../pages/checkoutOverview.page.js';
//import data from '../data.js';


/*const USER= data.USER;
const PASSWORD = data.PASSWORD;
const WRONGPASS = data.WRONGPASS;
const FIRSTNAME = data.FIRSTNAME;
const LASTNAME = data.LASTNAME;
const ZIPCODE = data.ZIPCODE;*/

const  USER ='standard_user';
const  PASSWORD = 'secret_sauce';
const  WRONGPASS = 'hola';
const  FIRSTNAME = 'Sandra';
const  LASTNAME = 'Barba';
const  ZIPCODE = '44444';

fixture('Project Tests').page('https://www.saucedemo.com/');


test('Test Case 1: Verify Products page is displayed after Login Successful', async t => {
    await LoginPage.login(USER,PASSWORD);
    await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');
    await ProductsPage.pageLogOut();
});

test('Test Case 2: Verify error message displayed after do an Incorrect Login', async t =>{
  await LoginPage.login(USER,WRONGPASS);
  let errorMessage = await LoginPage.errorIncorrectLogIn();
  await t.expect(errorMessage).contains("Epic sadface: Username and password do not match any user in this service");
});

test('Test Case 3: Verify that you can Logout from Products page', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 4: Verify user is able to Navigate to Shoping Cart', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();

});

test('Test Case 5: Verify that you can Add one item to the Shoping Cart', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');
  await ProductsPage.addOneItem();       
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  let item1Added = await CartPage.verifyBackpackAdded();
  await t.expect(item1Added).ok();
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 6: Verify that you can Add multiple items to the Shoping Cart', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');
  await ProductsPage.addMultipleItems();       
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  let item2Added = await CartPage.verifyJacketAdded();
  await t.expect(item2Added).ok();
  let item3Added = await CartPage.verifyTShirtAdded();
  await t.expect(item3Added).ok();
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 7.1: Validate FirstName required message on Users information page', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');    
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  await CartPage.clickCheckout();
  await t.expect(await CheckoutPage.checkoutPageLoaded()).contains('Checkout: Your Information');
  let requiredMessage = await CheckoutPage.requiredNameMessage(LASTNAME,ZIPCODE);
  await t.expect(requiredMessage).contains("Error: First Name is required");
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 7.2: Validate LastName required message on Users information page', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');     
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  await CartPage.clickCheckout();
  await t.expect(await CheckoutPage.checkoutPageLoaded()).contains('Checkout: Your Information');
  let requiredMessage = await CheckoutPage.requiredLastNameMessage(FIRSTNAME,ZIPCODE);
  await t.expect(requiredMessage).contains("Error: Last Name is required");
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 7.3: Validate zipCode required message on Users information page', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');    
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  await CartPage.clickCheckout();
  await t.expect(await CheckoutPage.checkoutPageLoaded()).contains('Checkout: Your Information');
  let requiredMessage = await CheckoutPage.requiredZipCodeMessage(FIRSTNAME,LASTNAME);
  await t.expect(requiredMessage).contains("Error: Postal Code is required");
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 8: Validate users can navigate to Checkout:Your Information', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');      
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  await CartPage.clickCheckout();
  await t.expect(await CheckoutPage.checkoutPageLoaded()).contains('Checkout: Your Information');
  await CheckoutPage.enterCheckoutInfo(FIRSTNAME,LASTNAME,ZIPCODE);
  await CheckoutPage.clickContinueBtn();
  let productOverviewHeader = await CheckoutOverviewPage.checkoutOverviewPageLoaded()
  await t.expect(productOverviewHeader).contains("Checkout: Overview");
});

test('Test Case 9: Validate users can navigate to Checkout:Overview with the list of items added', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');    
  await ProductsPage.addMultipleItems();       
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  await CartPage.clickCheckout();
  await t.expect(await CheckoutPage.checkoutPageLoaded()).contains('Checkout: Your Information');
  await CheckoutPage.enterCheckoutInfo(FIRSTNAME,LASTNAME,ZIPCODE);
  await CheckoutPage.clickContinueBtn();
  let productOverviewHeader = await CheckoutOverviewPage.checkoutOverviewPageLoaded()
  await t.expect(productOverviewHeader).contains("Checkout: Overview");

  let item2displeyed = await checkoutOverviewPage.verifyJacketAded();
  await t.expect(item2displeyed).ok();
  let item3displayed = await checkoutOverviewPage.verifyTShirtAdded();
  await t.expect(item3displayed).ok();
  await t.expect(await CheckoutOverviewPage.paymentInfoLabel()).ok();
  await t.expect(await CheckoutOverviewPage.shippingInfoLabel()).ok();
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 10: Validate Confirmation/Finish page is showed', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');      
  await ProductsPage.clickCart();
  await CartPage.clickCheckout();
  await t.expect(await CheckoutPage.checkoutPageLoaded()).contains('Checkout: Your Information');
  await CheckoutPage.enterCheckoutInfo(FIRSTNAME,LASTNAME,ZIPCODE);
  await CheckoutPage.clickContinueBtn();
  let productOverviewHeader = await CheckoutOverviewPage.checkoutOverviewPageLoaded()
  await t.expect(productOverviewHeader).contains("Checkout: Overview");
  await CheckoutOverviewPage.clickFinishOrder();
  await t.expect(await FinishPage.finishPageLoaded()).contains("Finish");
  await t.expect(await FinishPage.thanksMessageDsplayed()).contains("THANK YOU FOR YOUR ORDER");
  await t.expect(await FinishPage.orderDispatched()).contains("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

test('Test Case 11: Verify that items added can be removed', async t=>{
  await LoginPage.login(USER,PASSWORD);
  await t.expect(await ProductsPage.productsPageLoaded()).contains('Products');
  await ProductsPage.addMultipleItems();       
  await ProductsPage.clickCart();
  let cartHeader = await CartPage.cartPageLoaded();
  await t.expect(cartHeader).contains("Your Cart");
  let removed = await CartPage.removeItems();
  await t.expect(removed).eql(false);
  console.log("**No more products exists on the cart**");
  await ProductsPage.pageLogOut();
  await t.expect(await LoginPage.mainImageDisplayed()).ok();
});

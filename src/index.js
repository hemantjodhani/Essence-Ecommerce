import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection
} from 'firebase/firestore';

import {
  getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword
} from 'firebase/auth'

import handle_login_form from "./login-form";
import logout_handler from './logout';
import item_generator from './add-item';
import data_appender from './data-appender'
import get_user_id from './anonymous-login';
import cart_data_appender from './cart-data';
import delete_handler from './delete-item';
import quantity_handler from './quantity-checker';
import cart_data_handler from './cart-delete';
import checkout_handler from './checkout';
import order_handler from './order-accepter';
import admin_data_visibility from './admin-content-visibility';
import order_table from './orders-chart'
import delete_product from './remove-unwanted-item'
import update_order_status from './order-status';
import header_generator from './dynamic-header';
const firebaseConfig = {
  apiKey: "AIzaSyDSuPN5A7lGyDhnZ_rFtEwN5LUEVu3YrkM",
  authDomain: "essence-e-commerce.firebaseapp.com",
  projectId: "essence-e-commerce",
  storageBucket: "essence-e-commerce.appspot.com",
  messagingSenderId: "616322358284",
  appId: "1:616322358284:web:b87cdee015839da03a6229"
};
initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

var user_id = null;

get_user_id()
  .then(id => {
    user_id = id;

    $(document).ready(function () {
      
      // These are admin's functions
      handle_login_form();
      logout_handler();
      item_generator();
      // Frontend's functions
      cart_data_appender();
      delete_handler();
      // quantity_handler()
      cart_data_handler()
      quantity_handler() 
      cart_data_handler()
      checkout_handler()
      header_generator()
      order_handler()
      if ($(".home-page").length) {
        data_appender();
        

      }
      if($(".admin-page").length){
        delete_product()
        order_table()
        admin_data_visibility()
        update_order_status()
        
      }
    });
  })
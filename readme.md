INTRODUCTION:
-------------
        In this Ecomm application, I have given use cases for two types of users like ADMIN or CUSTOMER. Depends on the role of the user the accessbility and functionality changes in application. Every functionality is accessed by restful APIs, those APIs are validated for every call and only the authorised and authentication user can request for the service of the application. Everything in this application is done in module fashion.

TECHNOLOGIES USED:
-------------------

* Java Script
* NODE JS
* Express ( framework )
* Sequelize ( ORM tool)

DEPENDENCIES INSTALLED:
------------------------

* body parser
* express
* mysql2
* sequelize
* bcrypt
* jsonwebtoken

CONFIGURATION : 
---------------
    In this folder, I have given all the values that can change in the application when used on different environment and systems. The DataBase information is also given in this folder.

MODELS :
--------
    I have created 5 models here namely, 
        * user
        * category
        * products
        * role
        * cart 

    RELATIONSHIPS:
    -------------
        * User and Role have " many to many " relationship.
        * User and Cart have " one to many " relationship.
        * Product and cart have " many to many " realtionship. 

CONTROLLERS : 
-------------
     This is the place where all the functionalities are defined for all the models present in the application. All the functionalities are accessed by using APIs from the authenticated and authorised users.

     AUTH CONTROLLER:
     ----------------
        This the place where the user will be redirected when they want to sign up or sign in to the application. User who are signed in will be authenticated and be given with JSON WEB TOKENS, by using that tokens only the user can access the functionalities of the application.
    
     CATEGORY CONTROLLER:
     --------------------
        In this file, authenticated user can Create, update, find one, find All or delete the categories in the application.

     PRODUCT CONTROLLER:
     ------------------
        In this file, authenticated user will have the accessibility to create,update, findall, findone or delete the products in the application.

     CART CONTROLLER:
     ----------------
        In this file, authenticated use will have the accessbility to create or update the new cart. Finally everything present in that cart will be displayed to the user along with the total price of the cart.

MIDDLEWARE:
-----------
      This is the folder where every API requests are validated, also every user is authenticated and authorized using json web tokens. In Index.js file in this folder every other files in this folder are linked and exported at once. 

ROUTES:
-------
      This is the folder where every API call source is present, for each API call conrol is transferred to the correct controller file where all the functionalities are done. Before passing the control to the controllers, middlewares are called to check the authenticity and validation of the API call.


Thank you so much for reading.
Naveen Sundararajan
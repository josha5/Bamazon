# Bamazon
Node JS application that takes in orders from customers and depletes stock from store inventory in mysql database.
To have access full access to bamazon please:
* clone repo
* run the command 'npm install' 
* Run 'ctrl + c' to exit each JS file.


## bamazonCustomer.js Walkthrough:
* Type bamazonCustomer.js in your terminal 
* User is shown current items and there quantities from the mysql database.
* User is prompted to type the ID of the item they are looking to purchase.
* Once user selects an item ID, they are then prompted to specify the quantity of the item they are looking to purchase.
    * If a valid ID is entered and the current stock can meet the amount entered the user is shown the order total.
    * If the purhcase is successful the amount of stock is updated in the mysql database.






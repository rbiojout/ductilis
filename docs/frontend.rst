################################
Frontend
################################

*****************************************
React
*****************************************

Reactjs is the framework used for the front-end.
It is made from a create-react-app script and adjusted.

Sources are in the folder **src**.

In addition to Reactjs, the Redux is used wiht a strict separation of the different parts:

* **actions** : to help reuse the CRUD logic, actions linked to Database objects are built with **redux-resource** (https://redux-resource.js.org/)
* **reducers**
* **middleware**

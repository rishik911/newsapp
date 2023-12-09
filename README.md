# Welcome to News App

This is an application that shows random news (latest news)



# API Details

The app consumes an endpoint from newsapi.org that returns a list of news 
The api is limited to 200 requests per day .Exceeding the same will result in an error in the reponse
API curl :
curl --location 'https://newsapi.org/v2/everything?q=1&sortBy=publishedAt&apiKey=164ae127c65a4d14a857403f3d08297a&pageSize=100'

Since the API response doesn't return an unique id , hence we are using uuid and react-native-get-random-values to generate random values.

## Extra Packages used

-   [@react-native-async-storage/async-storage ](https://www.npmjs.com/package/@react-native-async-storage/async-storage). 
-  [@react-native-community/netinfo ](https://www.npmjs.com/package/@react-native-community/netinfo). 
- [axios ](https://www.npmjs.com/package/axios)
- [react-native-gesture-handler ](https://www.npmjs.com/package/react-native-gesture-handler)
- [react-native-get-random-values ](https://www.npmjs.com/package/react-native-get-random-values) 
- [react-native-splash-screen](https://www.npmjs.com/package/react-native-splash-screen) 
- [react-native-toast-message](https://www.npmjs.com/package/react-native-toast-message) 
- [react-native-vector-icons](https://www.npmjs.com/package/react-native-vector-icons) 
- [uuid](https://www.npmjs.com/package/uuid) 


## About the app

The app supports the following  :

1.  The initial api call loads 100 news items, and the same is persisted into local storage. The app uses react-context and sync storage to handle the persistence of data . 
2. Before any api call is made, internet connectivity is checked and once internet connection is available the network connections are done.
3. Every list item supports two swipe gestures , 
	- left  -> to delete the item
	- right -> to pin the item to top of the list
4. Once an item is deleted , the the same is updated in the local storage
5. Once an item is pinned to the top of the list , the gestures are disabled and the item can be unpinned by clicking on the unpin icon .
6. Once the of the list is reached , the list is reloaded with new data.
7. There is a background API call been made to load 5 new items every 20 seconds
8. The background API is stopped once any of the following events occur and once the event is completed 		     the background service starts again 
   -  Pull to refresh
   - Delete action
   - Pin / unpin action
9. Errors are handled using toast messages.

## Screenshots 

![Screenshot_1702135442](https://github.com/rishik911/newsapp/assets/49229949/f8eee9e4-e6b9-4f0e-92bb-6c93ad76786f)
![Screenshot_1702135428](https://github.com/rishik911/newsapp/assets/49229949/2f141292-865e-409a-a65c-8a88ade68288)
![Screenshot_1702135397](https://github.com/rishik911/newsapp/assets/49229949/a41cc0c9-4e95-41ff-9fff-bfea8ab2e7de)
![Screenshot_1702135390](https://github.com/rishik911/newsapp/assets/49229949/f69df3ad-b425-432c-89fc-feb253777536)




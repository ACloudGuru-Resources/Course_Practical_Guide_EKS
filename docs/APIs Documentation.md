
# ACG-EKS



## Indices

* [Clients API](#clients-api)

  * [Create](#1-create)
  * [Delete (not available yet)](#2-delete-(not-available-yet))
  * [Get](#3-get)
  * [List](#4-list)
  * [Update](#5-update)

* [Inventory API](#inventory-api)

  * [List by Resource](#1-list-by-resource)
  * [List by Resource Unavailable](#2-list-by-resource-unavailable)
  * [Register](#3-register)
  * [Set Availability](#4-set-availability)
  * [Summary](#5-summary)

* [Renting API](#renting-api)

  * [List](#1-list)
  * [List By Client Id](#2-list-by-client-id)
  * [Register](#3-register-1)
  * [Return](#4-return)

* [Resources API](#resources-api)

  * [Create](#1-create-1)
  * [Delete](#2-delete)
  * [Get](#3-get-1)
  * [List](#4-list-1)
  * [Update](#5-update-1)


--------


## Clients API



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{ClientsApiEndpoint}}/create
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "Name": "Pablo Maestre",
    "Email": "pabloandresm93@gmail.com"
}
```



### 2. Delete (not available yet)



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{ClientsApiEndpoint}}/delete/5e11269570c0f10b912c572d
```



### 3. Get



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{ClientsApiEndpoint}}/get/02eedaf2-d6bb-41db-b2af-c226a741da78
```



### 4. List



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{ClientsApiEndpoint}}/list
```



### 5. Update



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{ClientsApiEndpoint}}/update/02eedaf2-d6bb-41db-b2af-c226a741da78
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
	"Name": "Yuranis Patricia Molina Heredia",
	"Email": "yura024@hotmail.com"
}
```



## Inventory API



### 1. List by Resource



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{InventoryApiEndpoint}}/list/a0671dc6-3d6d-11ea-8dd9-38c98647e86c
```



### 2. List by Resource Unavailable



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{InventoryApiEndpoint}}/list/a0671dc6-3d6d-11ea-8dd9-38c98647e86c
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| available | false |  |



### 3. Register



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{InventoryApiEndpoint}}/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
	"ResourceId": "a0671dc6-3d6d-11ea-8dd9-38c98647e86c"
}
```



### 4. Set Availability



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{InventoryApiEndpoint}}/setAvailability/9fa493c0-45bd-11ea-973b-efaa16fd349e
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
	"Available": true
}
```



### 5. Summary



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{InventoryApiEndpoint}}/summary
```



## Renting API



### 1. List



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{RentingApiEndpoint}}/list
```



### 2. List By Client Id



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{RentingApiEndpoint}}/list/by-client-id/4872e42e-b27c-4823-8f83-1383e047b5c2
```



### 3. Register



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{RentingApiEndpoint}}/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
    "ResourceId": "a0671dc6-3d6d-11ea-8dd9-38c98647e86c",
    "ClientId": "599a9fcb-447d-4662-ac53-1ca092131ae2",
    "RegistrationDate": "06/02/2020"
}
```



### 4. Return



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{RentingApiEndpoint}}/return/e07042eb-295b-41c1-bb35-400ff4537057
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
	"ReturnDate": "07-02-2020"
}
```



## Resources API



### 1. Create



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{ResourceApiEndpoint}}/create
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
	"Name": "EKS course",
	"DateOfPublication": "2020",
	"Author": "Mario Mercado",
	"Tags": [
		"aws", "kubernetes", "cloud", "devops"
	],
	"Type": "DVD",
	"Description": "This is an amazing course, I think..."
}
```



### 2. Delete



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{ResourceApiEndpoint}}/delete/5e0175e7618fcae0713d7543
```



### 3. Get



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{ResourceApiEndpoint}}/get/a0671dc6-3d6d-11ea-8dd9-38c98647e86c
```



### 4. List



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{ResourceApiEndpoint}}/list
```



### 5. Update



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{ResourceApiEndpoint}}/update/5e0175e7618fcae0713d7543
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json |  |



***Body:***

```js        
{
	"Name": "EKS course",
	"DateOfPublication": "2020",
	"Author": "Mario Mercado",
	"Tags": [
		"aws", "kubernetes", "cloud", "devops"
	],
	"Type": "DVD",
	"Description": "This is an amazing course, I think..."
}
```



---
[Back to top](#acg-eks)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2020-08-20 21:56:55 by [docgen](https://github.com/thedevsaddam/docgen)

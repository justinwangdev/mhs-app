# 🔩  MHS-APP

An application to improve factory workflow.

[![Platform - Android](https://img.shields.io/badge/platform-Android-3ddc84.svg?style=flat&logo=android)](https://www.android.com)
[![Platform - iOS](https://img.shields.io/badge/platform-iOS-000.svg?style=flat&logo=apple)](https://developer.apple.com/ios)

## 📈  Outline

This is a cross-platform mobile application built for Ming Hui Sheng Enterprise Co., Ltd.

There used to be only a desktop application available. Therefore managers needed to write down each data and then brought it into the factory to check the production capacity.

On the other hand, team leaders had to take notes in the factory and then type them all over again using the only desktop located in a 100 thousand sq ft factory.

With MHS-APP, they can just scan barcodes and query/insert the Mysql database using their cellphones without wasting unnecessary time and energy anymore.

## 📱  Features

### 1. Query Dispatch Lists

* **Mobile Device Friendly Data Display:**

---

### 2. Insert Procedures

* **Barcode Scanner:** Each container has a unique barcode. Using a cellphone camera, tracking procedures couldn't be easier.
![barcode](./demos/barcode.gif)
* **Overwrite Detection:** 

---
### 3. Login System

* **Async Storage:** App would remember the last login, so users don't need to log in each time.
* **Error Detection:** It could detect not only empty-input detection but user name not exist, wrong password can be detected as well.
![login](./demos/login.gif)
* **User Token:** Each user comes with a unique token, which makes Role-based Access Control possible.
* **No Anonymous:** To protect important data, only approved users can access the database.

---

### 4. Bottom Tab Navigator & Stacks

* **React Navigation Stack:** By using React-Navigation-Stack, users can go to the previous page.
* **Material Bottom Tab Navigator:** It's not only aesthetic but comes in handy in the busy factory for single-hand operations.

---

### 5. Other Features

* **Indicator Screen:** Adding an indicator screen while requesting data from the server elevates user experience.

---

## 🛠  Built Environment

| Environment   | version | 
| ------------- | ------- |
| Mac OS        | 10.15.6 |
| Node.js       | 12.18.2 |
| expo-cli      | 3.22.1  |

## ⚙  Setup

Modify the address of Express-Server on src/core/apis.js.
Then run:
```bash 
$ npm install
$ expo start
```

## 🙋  Appendix and FAQ


**Have any qeustions?** Contact me at`${myGithubAccount}[at]gmail.com`


###### tags: `react native` `MERN stack`
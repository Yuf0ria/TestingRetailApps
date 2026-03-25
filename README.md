# Installation

You will need the following applications:

- Node.js
- npm
- selenium-webdriver
- chromedriver
- docker

_**verify if you have node and npm**_

```
node -v
npm -v
```

If you don't have node and npm install it first.

> Note: Install npm inside your folder.

```
npm install -g
```

#### Initialize the folder

```
npm init -y
```

#### Install selenium-driver & chrome-driver

```
 npm install selenium-webdriver chromedriver
```

#### [Install Docker](https://www.docker.com/)

After you have Docker:

- Download [open cart repository](https://www.opencart.com/index.php?route=cms/download/download&download_id=78)
- Unzip open cart folder
- Open Docker
- Open terminal of open cart repository
- In the terminal of the file containing the projects run:
  ```
  docker-compose up -d
  ```
- Launch [Localhost](http://localhost/)

# Testing

Run testAll.bat in terminal

```
Tests/testAll.bat
```

# Documentation

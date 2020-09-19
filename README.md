### Running Puppeteer on AWS Lambda Using Serverless Framework

### Instructions to run locally

```
$ npm install
$ sls offline
```

### To Deploy on AWS

- Add aws profile in `serverless.yml` and run

```
$ sls deploy
```
___________

## Solution

Best solution I found for this problem is using this awesome Serverless-framework Headless Chrome Plugin i.e
`serverless-plugin-chrome`

# How ??

## 1. Add the Plugin in your serverless.yml

```
plugins:
  - serverless-plugin-chrome
```

## 2. Install Following Dependencies

- superagent
- @serverless-chrome/lambda
- puppeteer

```
 $ npm i superagent @serverless-chrome/lambda puppeteer
```

### To Test It Locally

```
  $ npm i serverless-offline
  $ npm i chrome-launcher
```

- Make the following request (replace `{{URL}}` with the page you want to get content for)

```
curl -X GET \
  'http://localhost:3000?url={{URL}}' \
```


### To Deploy on AWS

```
  $  sls deploy
```

- Make the following request (replace `{{URL}}` with the page you want to get content for and `{{lambda_url}}` with your lambda url)

```
curl -X GET \
  '{{lambda_url}}?url={{URL}}' \
```

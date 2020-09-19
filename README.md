### Running Puppeteer on AWS Lambda Using Serverless Framework

### Instructions to run locally

```
$ yarn
$ yarn offline
```

### To Deploy on AWS

- Add aws profile in `serverless.yml` and run

```
$ yarn deploy-dev
$ yarn deploy-prod
```
___________

## Solution

Best solution I found for this problem is using this awesome Serverless-framework Headless Chrome Plugin i.e
`serverless-plugin-chrome`

### To Test It Locally

- http://localhost:3000/local/puppeteer/html?url=https://health-and-beauty.jp/?p=6396
- http://localhost:3000/local/puppeteer/screenshot/heatmap?url=https://health-and-beauty.jp/?p=6396

### To Deploy on AWS

```
  $  sls deploy
```

- Make the following request (replace `{{URL}}` with the page you want to get content for and `{{lambda_url}}` with your lambda url)

```
curl -X GET \
  '{{lambda_url}}?url={{URL}}' \
```

### To Test It on AWS

- https://wp7ojz2k66.execute-api.ap-northeast-1.amazonaws.com/dev/puppeteer/screenshot/heatmap?url=https://health-and-beauty.jp/?p=6396
- https://wp7ojz2k66.execute-api.ap-northeast-1.amazonaws.com/dev/puppeteer/html?url=https://health-and-beauty.jp/?p=6396

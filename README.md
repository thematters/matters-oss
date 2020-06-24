# Matters OSS

![Deploy Status](https://github.com/thematters/matters-oss/workflows/Deployment/badge.svg) ![Release Status](https://github.com/thematters/matters-oss/workflows/Create%20Release/badge.svg) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Deployment with CloudFront

CloudFront can sit on top of S3 to provide flexibility to handle custom domains and SSL certificates. Since Matters OSS is a Single-Page Application, which uses HTML5 `history.pushState()` to change browser location. In order for CloudFront to take all url requests and serve up the root `index.html`, follow the steps below:

- Create CloudFront distributions with these settings:
  - **Default Root Object**: index.html
  - **Origin Domain Name**: S3 bucket domain
- Go to Error Pages tab, click on **Create Custom Error Response**:
  - **HTTP Error Code**: 403: Forbidden (404: Not Found, in case of S3 Static Website)
  - **Customize Error Response**: Yes
  - **Response Page Path**: /index.html
  - **HTTP Response Code**: 200: OK
  - Click on Create

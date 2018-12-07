# Report Domain Library for Node.js

[![npm (scoped)](https://img.shields.io/npm/v/@toei-jp/report-domain.svg)](https://www.npmjs.com/package/@toei-jp/report-domain)
[![CircleCI](https://circleci.com/gh/toei-jp/report-domain.svg?style=svg)](https://circleci.com/gh/toei-jp/report-domain)
[![Coverage Status](https://coveralls.io/repos/github/toei-jp/report-domain/badge.svg?branch=master)](https://coveralls.io/github/toei-jp/report-domain?branch=master)
[![Dependency Status](https://img.shields.io/david/toei-jp/report-domain.svg)](https://david-dm.org/toei-jp/report-domain)
[![Known Vulnerabilities](https://snyk.io/test/github/toei-jp/report-domain/badge.svg?targetFile=package.json)](https://snyk.io/test/github/toei-jp/report-domain?targetFile=package.json)
[![npm](https://img.shields.io/npm/dm/@toei-jp/report-domain.svg)](https://nodei.co/npm/@toei-jp/report-domain/)

元祖興行パッケージオンラインチケットシステムのドメインモデルをnode.jsで使いやすいようにまとめたパッケージです。

## Table of contents

* [Usage](#usage)
* [Code Samples](#code-samples)
* [License](#license)

## Usage

```shell
npm install --save @toei-jp/report-domain
```

```Javascript
const report = require("@toei-jp/report-domain");
```

### Environment variables

| Name    | Required | Value           | Purpose |
|---------|----------|-----------------|---------|
| `DEBUG` | false    | report-domain:* | Debug   |

## Code Samples

Code sample are [here](https://github.com/toei-jp/report-domain/tree/master/example).

## License

ISC

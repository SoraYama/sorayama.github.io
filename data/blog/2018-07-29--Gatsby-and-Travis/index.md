---
title: 用 gatsby 和 travis-ci 自动化构建和部署 github-pages
createdDate: '2017-07-29'
updatedDate: '2018-07-29'
author: SoraYama - 空山
image: gatsby-word.jpeg
tags:
  - 2018-07
  - 技术
  - gatsby
  - travis-ci
  - 自动化
draft: false
---

> 算是处女博了，主要是想记录一下 .travis.yml 的几个配置

## gatsby 的构建和部署

[gatsby 官方](https://www.gatsbyjs.org/docs/how-gatsby-works-with-github-pages/)给出构建静态页面们的并部署只需要

```json
{
  scripts: {
    ...
    "deploy": "gatsby build && gh-pages -d public -b master",
  }
}
```

然后执行 `yarn deploy` 或 `npm run deploy` 即可

## 问题和解决

在本地执行都没有问题，然而配置好 `.travis.yml` 后执行这个部署命令的话应该是不行的，因为没有 github 的仓库权限而导致执行 `gh-pages` 的时候认证失败了。

### 配置 ssh

查阅了一些文档和别人的 blog 之后大概明白了解决思路，[其中一种](https://imzlp.me/posts/42318/) 是这么个意思:

-   下载 `travis cli`，然后用 `travis encrypt-file` 在 `.travis.yml` 注入用 `openssl` 加解密文件的脚本
-   将本地的 `.ssh` 配置和私钥加密之后放到比如叫 `.travis` 的文件夹里
-   将 `ssh_config` 写好（主要是声明只通过 `config` 认证）放入 `.travis` 文件夹，然后放到仓库里
-   `git push` 之后 `travis` 开始构建，将仓库里的私钥通过之前 `travis encrypt-file` 生成并存在自己的 `Env variables` 中的 `key` 解密 `ssh` 私钥
-   拷贝私钥并放在 `~/.ssh/` 下，然后覆盖 `ssh_config`
-   赋权限什么的，然后 `push` 就无忧了

整体看上去没什么问题，但是在认证的时候失败了，调试了几次没有什么关键性的提示，由于 ci 调试一次成本略高，于是思考别的路子。
想到其实 travis-ci 既然和 github 无缝集成，应该是能现成配置并部署 github-pages 的。发现 [官方文档](https://docs.travis-ci.com/user/deployment/pages/) 确实也有，不过确实花了一些时间阅读之后还是没搞清配置具体怎么写。
（这里就想吐槽下， travis-ci 官方文档是挺细致，但是有时候更需要一个类似于 [typescript compiler options list](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 这样总览的配置项说明会更节省时间。）

### travis-ci deploy github-pages

![travis-ci](./travis-ci.jpg)

后来发现一个 [老哥的配置](https://takuti.me/note/travis-gh-pages-deployment/) 试了试，第一次蠢了直接把 `github token` 写在配置里面了（蠢哭，一开始看文档的时候人家就说了不要把 `token` 直接写在 `commit` 里，结果还是这么干了 QAQ）。
后来配置好 `Env variable` 上传之后还是执行 `gh-pages` 的是时候没有权限，但是 `travis-ci` deploy 阶段就直接部署了，那这时候就知道把 `deploy` 脚本下的 `gh-pages` 命令去掉，只构建就可以了。

最后附上现在的配置

```yaml
language: node_js
node_js:
  - 9.8.0
sudo: false
cache:
  directories:
    - node_modules
branches:
  only:
    - dev
deploy:
  provider: pages
  local-dir: public
  skip_cleanup: true
  target-branch: master
  github_token: $GITHUB_TOKEN
  keep-history: true
  on:
    branch: dev
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - g++-4.8
before_install:
  - if [[ "$TRAVIS_OS_NAME" == "linux" ]]; then export CXX=g++-4.8; fi
  - npm install -g yarn
install:
  - yarn
script:
  - yarn run test
after_success:
  - yarn run build
  - yarn run codeclimate
```

> 注意：
>
> -   这里要把 `build` 放在 `after_success` 阶段
> -   因为我是直接从 `dev` 分支推代码，然后直接构建到 `master` 上，因此要写 `target-branch` 和 `on`

## 后记

其实就是简单的一点记录而已，然后先放在这撑一哈门面。这里其实还是可以再继续研究下第一个老哥的 `ssh` 配置，说不定以后会用得到。

## 其他的参考

-   [secure-environment-variables-with-travis](https://brettdewoody.com/secure-environment-variables-with-travis/)
-   [deploying-travis](https://heygrady.com/deploying-travis/)
-   [how-to-use-travis-ci](https://github.com/nukc/how-to-use-travis-ci)
-   [github-auth-token-on-travis](https://blog.wyrihaximus.net/2015/09/github-auth-token-on-travis/)

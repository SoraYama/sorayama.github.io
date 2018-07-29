---
title: Misc
createdDate: '2018-07-29'
updatedDate: '2018-07-29'
author: SoraYama - 空山
tags:
  - 2018-07
  - Misc
  - 技术
image: cup-of-coffee-laptop-office-macbook-89786.jpeg
draft: false
---

> 目前这篇 post 先用来记录杂七杂八好了，计划是一段时间整理一次（咕咕咕预定

### How to SCP data to ownCloud dir

[click here](https://askubuntu.com/questions/779969/how-to-scp-data-to-owncloud)

This question relative to "How to copy/move files to ownClowd data dir on server side". I tried to run

```bash
mv PATH/TO/TARGET /home/wwwroot/default/owncloud/data/sorayama/
```

files moved correctly, but there's nothing in client side. So I searched for it and finally found the key action is to run

```bash
sudo -u www php /home/wwwroot/default/owncloud/occ
```

in the next step

### Whether in terminal

```bash
curl wttr.in /~<PLACE>
```

### 搭建私人 git 仓库

> 假设已经有sudo权限的用户账号，下面，正式开始安装。

#### 第一步，安装git：

```bash
sudo apt-get install git
```

#### 第二步，创建一个git用户，用来运行git服务：

```bash
sudo adduser git
```

#### 第三步，创建证书登录：

收集所有需要登录的用户的公钥，就是他们自己的 `id_rsa.pub` 文件，把所有公钥导入到 `/home/git/.ssh/authorized_keys` 文件里，一行一个。

#### 第四步，初始化Git仓库：

先选定一个目录作为Git仓库，假定是 `/srv/sample.git`，在 `/srv` 目录下输入命令：

```bash
sudo git init --bare sample.git
```

Git就会创建一个裸仓库，裸仓库没有工作区，因为服务器上的Git仓库纯粹是为了共享，所以不让用户直接登录到服务器上去改工作区，并且服务器上的Git仓库通常都以.git结尾。然后，把owner改为git：

```bash
sudo chown -R git:git sample.git
```

#### 第五步，禁用shell登录：

出于安全考虑，第二步创建的 git 用户不允许登录 shell ，这可以通过编辑 `/etc/passwd` 文件完成。找到类似下面的一行：

    git:x:1001:1001:,,,:/home/git:/bin/bash

改为：

    git:x:1001:1001:,,,:/home/git:/usr/bin/git-shell

这样，git 用户可以正常通过 ssh 使用 git，但无法登录 shell，因为我们为 git 用户指定的 git-shell 每次一登录就自动退出。

#### 第六步，克隆远程仓库：

现在，可以通过 `git clone` 命令克隆远程仓库了，在各自的电脑上运行：

```bash
git clone git@server:/srv/sample.git
Cloning into 'sample'...
warning: You appear to have cloned an empty repository.
```

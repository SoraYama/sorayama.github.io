---
title: ShadowSocks的种种
createdDate: '2019-10-08'
updatedDate: '2019-10-08'
author: SoraYama - 空山
image: shadowsocks.jpg
tags:
  - 2019-10
  - shadowsocks
  - vpn
draft: false
---

## 前言

ShadowSocks 作为科学上网工具对于我来说基本是日常生活工作的必备，此篇作为基本科普和备忘大概记录下搭建和使用中的一些坑

## 客户端

- [Mac 端](https://github.com/shadowsocks/ShadowsocksX-NG)
- [Win 端](https://github.com/shadowsocks/shadowsocks-windows)
- [Android 端](https://github.com/shadowsocks/shadowsocks-android)
- [iOS 端](https://apps.apple.com/jp/app/shadowrocket/id932747118) （需要外区 Apple ID，虽然收 20 块但是比较值毕竟一直在更新维护）

设置的话大同小异就不再赘述了

## 服务端部署

在服务端有两种部署方式，可以按照自己需要来部署，一般会改默认的密码和端口，加密方式一般选择 `xchacha20-ietf-poly1305`

### 脚本部署

> [脚本 Github Repo](https://github.com/teddysun/shadowsocks_install/tree/master)

这个[脚本作者](https://teddysun.com/)虽然表示已经[被迫弃坑](https://shadowsocks.be/)，但是其 Github 上的主分支依然存在，因此并不影响脚本使用只是不再更新

常用的版本为 python 版，支持 CentOS，Debian 和 Ubuntu，直接上脚本

```bash
wget –no-check-certificate https://raw.githubusercontent.com/teddysun/shadowsocks\_install/master/shadowsocks.sh

chmod +x shadowsocks.sh

./shadowsocks.sh 2>&1 | tee shadowsocks.log
```

如安装 `libev` 或者是 `shadowsocksR` 版本只需替换文件名到该 Repo 下其他脚本文件即可，注意支持的系统版本

### Docker 部署

在 [Teddysun 的 repo](https://github.com/teddysun/shadowsocks_install/tree/master/docker/shadowsocks-libev) 里同样是有 Dockerfile 部署文件，但是由于作者表示弃坑所以改用 `shadowsocks/shadowsocks-libev` 镜像 ([docker hub](https://hub.docker.com/r/shadowsocks/shadowsocks-libev))，直接上文件

#### docker-compose.yml

```yml
version: '3'

services:
  ss:
    image: shadowsocks/shadowsocks-libev
    container_name: 'shadowsocks'
    ports:
      - '10825:8388'
      - '10825:8388/udp'
    env_file:
      - .env
    restart: always
```

#### Makefile

```Makefile
.PHONY: .ONESHELL

.ONESHELL:

SHELL=/bin/bash
.DEFAULT_GOAL := start

### common

clean-image:
	docker-compose down --rmi local
prune:
	docker image prune -f --filter until=240h

### deploy

clean-volume:
	docker-compose down -v

CMD=-h

test:
	docker-compose ${CMD}

down:
	docker-compose down

build:
	docker-compose build

up:
	docker-compose up -d

up-%:
	echo $${COMPOSE_FILE}
	docker-compose up -d --no-dep $*

start: down build up
```

#### env file

```.env
# 口令
PASSWORD=

# 加密方式
METHOD=
```

### kcptun

kcptun 是一个双边加速的工具，可以将 TCP 服务的流量按照 kcp 协议的 UDP 流量发出，加速效果比较明显

#### 服务端部署

直接上安装脚本

```bash
wget --no-check-certificate https://github.com/kuoruan/shell-scripts/raw/master/kcptun/kcptun.sh

chmod +x ./kcptun.sh

./kcptun.sh
```

这里注意一些参数的配置如果不是很清楚含义就默认即可，但是由于 iOS 端用 `shadowrocket` 暂不支持数据压缩所以选择参数的时候 **关闭数据压缩** 要选择 `true`

#### 客户端使用

- win/mac 在使用 `shadowsocks-windows` 和 `shadowsocks-NG-X` 的话设置区别不大，需要注意两点：

  - 端口填写成 `kcptun` 的服务端口
  - 插件名 mac 直接写 `kcptun`即可，windows 要下载相应的[客户端](https://github.com/xtaci/kcptun/releases) 之后将插件 copy 到 shadowSocks 的同级目录下，插件名填写客户端文件名（不要后缀）即可；插件选项则需要根据服务端安装脚本完成后给出的字符串填写即可

- `shadowrocket` 中的配置比较简单（虽然研究了半天都不好），现版本（2.1.34）就已经支持插件的选项，其中就包括 `kcptun`，设置的时候服务器配置部分按照正常地址和端口配置即可，插件项里的端口和地址不填则默认用填好的服务器配置，所以一般只需要改端口为 `kcptun` 的端口就行，然后其他部分的配置按照服务器的配置即可（不能有出入）

### 其他

#### BBR

Linux 发行版内核在 4.9 之后支持 BBR(Google 提供的 TCP 拥塞控制算法)以加速 TCP 连接，一些新的发新版本会自动开启。如果没有开启则确认内核版本支持之后用以下脚本方便开启

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh

chmod +x bbr.sh && ./bbr.sh
```

#### fast_open

也是一个 TCP 连接的拥塞控制算法，具体在第三次握手的时候可以传输数据，要求 Linux 内核高于 3.7 可以开启，具体如下

1. 编辑 `/etc/sysctl.conf` 添加以下命令：

```conf
net.ipv4.tcp_fastopen = 3
```

2. 执行 `sysctl -p` 生效

3. 在 `/etc/rc.local` 中添加以下命令以持久化 (没有的话直接创建就好)

```bash
echo 3 > /proc/sys/net/ipv4/tcp_fastopen
```

#### 关于 `shadowsocks` 和 `shadowsocksR`

本质上讲 `SS` 是原版, 而 `SSR` 是[破娃酱](https://github.com/breakwa11)的改版, 支持混淆和协议, 因此会用来做免流的伪装. 至于使用哪一个版本完全看个人喜好, 只不过需要下载相对应的客户端.

具体的一些争议和趣闻参见[传送门 A](https://www.itsvse.com/thread-4230-1-1.html) 和 [传送门 B](https://www.hongweiit.com/ss-and-ssr.html) 及谷歌搜索

---
title: Pixel 3 charles 抓包以及 root 记录
createdDate: '2020-08-12'
updatedDate: '2019-08-12'
author: SoraYama - 空山
image: pixel3.jpg
tags:
  - 2020-08
  - root
  - android
  - charles
draft: false
---

# Pixel 3 charles 抓包以及 root 记录

> 之前就因为 pixel 3 因为用户安装的 https 证书不被认可，不能抓包费心费力，为了使手里的 pixel 3 可以正常抓包，花了两天时间来研究，现记录如下。

## charles CA 证书制作

1. 确定文件名（根据机型这里两种 hash 都需要）

`Charles - Help - SSL Proxying - save Charles root certificate` 保存证书到本地，文件名大概为 `charles-ssl-proxying-certificate.pem`, 然后 terminal 中

```bash
openssl x509 -inform PEM -subject_hash_old -in charles-ssl-proxying-certificate.pem | head -1 # aaaaaaaa
openssl x509 -inform PEM -subject_hash -in charles-ssl-proxying-certificate.pem | head -1 # bbbbbbbb
```

拿到的两个文件的名字 + `'.0'` 作为新的文件的名字。

2. 转换证书格式

```bash
openssl x509 -inform PEM -text -in charles-ssl-proxying-certificate.pem > aaaaaaaa.0
openssl x509 -inform PEM -text -in charles-ssl-proxying-certificate.pem > bbbbbbbb.0
```

3. **编辑**输出的文件，把 `-----BEGIN CERTIFICATE-----` 到文件结束这部分移动到文件首部

## 手机 root

这部分虽然过程曲折，但最终还是用 magisk 搞定了 root，这里大概记录下过程。

0. 各种准备

- 原厂底包

- `Android` 官方的 `platform-tools` (Mac 的话则只需要执行 `brew cask install android-platform-tools`)

- [`Magisk`](https://github.com/topjohnwu/Magisk/releases) (主要是 `Magisk Manager` apk)

- 解锁 `OEM` 和 `BootLoader`， 可参考 [这篇帖子](https://sspai.com/post/38319)

1. TWRP 尝试

一开始看到有 [帖子](https://www.itfanr.cc/2018/10/16/google-pixel-unlock-bl-and-root/) 说用 `twrp` 来刷机，在 `twrp` 官网下载完 `3.3.0` 的 `installer` 之后来用 `fastboot` 刷，奈何萌新没有经验导致翻车，主要是在

```bash
fastboot boot twrp.img
```

这一步报错，原因显示为

```
usb_read failed with status e00002ed ERROR
```

查阅很多资料有说 USB 线不好用或者是 U 口有问题等等，经换线、换电脑、换操作系统的排查发现均不是以上问题。后怀疑应该是刷机包本身有问题或者版本不匹配造成。在一番手贱之后（比如把这个包 flash boot）终于机子变砖了。

2. 刷 `boot.img`

变砖之后查询了一些办法之后发现可以下载 [官方底包](https://developers.google.cn/android/images#blueline) 之后解压两层得到一个 `boot.img` 的镜像，这个就是用来刷 boot stock 的包。尝试一番，用 `fastboot` 刷进去

```bash
fastboot flash boot boot.img
```

开机，能进入系统。

3. Magisk 刷机（可参考 [这里](http://bbs.gfan.com/android-9608088-1-1.html) ）

- 将 Magisk Manager 下载到手机上

- 将之前下载的 `boot.img` 传到手机上自定义位置

- 打开 Magisk Manager，下载最新版 Magisk（选择修复一个文件选项，然后选择 `boot.img`）

  > 注意如果一直检查更新的话则需要翻墙

- 下载完之后会搞一个 `magisk_patched.img` 的镜像到 `download` 里，将它拉倒电脑上

- 在电脑上执行

```bash
adb reboot-bootloader

fastboot flash boot magisk_patched.img
```

开机，终于不是黑屏了。然而更悲惨的是触控全部失灵 = = 在查询各种网站之后发现不仅我一个人有困惑，比如教程后的评论中同样有人遭遇此境况。然而 `xda` 等地方没有查到更多关于刷机导致触屏失灵的情况，所以判断还是需要从固件入手，我整个恢复原厂设置就好了吧（

4. 恢复原厂固件

由于不能够点击屏幕，在查阅一番之后发现用原厂固件包中的脚本就可以轻松恢复了：

```bash
# 先 cd 进入固件包
# Windows 直接点击 flash-all.bat MacOS / Linux

./flash-all.sh
```

5. 重新刷机

同第 3 步，搞完之后就发现 `root` 成功了

## 导入证书到系统中

在查阅 [这个帖子](https://segmentfault.com/a/1190000017035564) 的时候发现往 `/system` 中写入东西的时候会报错

```
mv: /system/etc/security/cacerts/xxxxxxxx.0: Read-only file system
```

根据教程是需要挂载 `/system`，使用

```bash
mount -o rw,remount /

# OR

mount -o rw,remount /system
```

然而都会有报错

```
mount: '/system' not in /proc/mounts
```

后来又看到帖子说需要执行

```bash
adb root

adb disable-verity
```

然而会报错

```
verity cannot be disabled/enabled - USER build
```

虽然在 [这篇帖子](https://android.stackexchange.com/questions/215800/how-to-disable-dm-verity-on-android-with-user-build-type-rom) 中看到了很多办法（比如不勾选 Magisk 里面 `Preserve AVB v2.0/dm-verity` 重新新装）都无济于事。
在求助 Rikka 之后说 都 0202 年了直接写 `/system` 不太行，因此要用 Magisk 的模块装进去。大概的目录如下

```
charles_ca
├── META-INF
│   └── com
│       └── google
│           └── android
│               ├── update-binary
│               └── updater-script
├── module.prop
└── system
    └── etc
        └── security
            └── cacerts
                ├── aaaaaaaa.0
                └── bbbbbbbb.0
```

其中 `update-binary` 和 `updater-script` 的写法可参考 [Magisk Module Installer](https://topjohnwu.github.io/Magisk/guides.html#magisk-module-installer)

然后打包（记得检查一下打包完 `.zip` 的层级）好之后推到设备上，用 Magisk 安装模块就大功告成了。

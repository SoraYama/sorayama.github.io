webpackJsonp([0xa95275da51c5],{693:function(a,s){a.exports={data:{site:{siteMetadata:{disqus:"sorayama"}},post:{html:'<h2 id="前言"><a href="#%E5%89%8D%E8%A8%80" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>前言</h2>\n<p>之前一直都是用的 <a href="https://owncloud.org/">owncloud</a> 来管理和同步一些自己的资料, 搭建在自己屋子里的服务器上.\n然而最近需要上传和下载东西的时候发现由于受制于住的地方以及转发服务器的性能和带宽网速十分捉急.\n之前随便转悠的时候发现了比 owncloud 更佳的替代和解决方案, 即 <a href="https://nextcloud.com/">nextcloud</a>.\n刚巧之前想随便玩玩 OSS, 结合<a href="https://qianrong.me/website/15.html">这篇</a>文章有了自己搭建一个 <code class="language-text">Nextcloud</code> + <code class="language-text">aliyun OSS</code> 做的想法.</p>\n<blockquote>\n<p>Nextcloud 是 Owncloud 的一个分支，原美国的 Owncloud 公司已倒闭由德国公司接手更新，其原创始人出走创立了 Nextcloud，由测试来看， 两者客户端是互通的，界面几乎一样，但 Nextcloud 使用更加灵活，比如可以自定义 Logo 和主题，功能更加强大，推荐用 Nextcloud</p>\n</blockquote>\n<h2 id="oss"><a href="#oss" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>OSS</h2>\n<p>OSS 即对象存储, 之前本来打算是拿来做图床, 然而发现根本没什么可放的(). 具体的购买和选购大概对比了下七牛云和阿里云的 OSS 发现如果存的东西比较多价格差别不是很大, 然而如果存的很少七牛有 40G 的免费存储量可以自己玩.\n然而这里是因为刚好用阿里的 ECS 就刚好用他家 OSS 来做搭建了</p>\n<h3 id="ossfs"><a href="#ossfs" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>ossfs</h3>\n<p>由于要连接 oss 和 ECS 实例, 挂载阿里云的 oss 映射到服务器上, 需要下载阿里自己搞的一个包 (<a href="https://github.com/aliyun/ossfs">GitHub Repo</a>), 根据<a href="https://github.com/aliyun/ossfs/blob/master/README-CN.md">官方 README</a>安装就行, 以下对 Ubuntu 18.04 做一个示例</p>\n<ol>\n<li>下载安装</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token comment"># 这里版本选择较新的符合自己系统的版本</span>\n<span class="token function">cd</span> ~\n\n<span class="token function">wget</span> https://github.com/aliyun/ossfs/releases/download/v1.80.5/ossfs_1.80.5_ubuntu16.04_amd64.deb\n\n<span class="token function">sudo</span> <span class="token function">apt-get</span> update\n\n<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> gdebi-core\n\n<span class="token function">sudo</span> gdebi ./ossfs_1.80.5_ubuntu16.04_amd64.deb</code></pre>\n      </div>\n<ol start="2">\n<li>设置 ossfs 信息</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">cd</span> /etc\n\n<span class="token function">sudo</span> vim passwd-ossfs <span class="token comment"># 这里写入一行自己的oss信息, 格式为 &lt;bucket名字>:&lt;access-key-id(在阿里云控制台Accesskey找和创建)>:&lt;access-key-secret></span>\n\n<span class="token comment"># 注意这里权限如果不用默认路径需要改成 600</span>\n<span class="token function">sudo</span> <span class="token function">chmod</span> 640 /etc/passwd-ossfs\n\n<span class="token comment"># 创建自己的挂载文件目录</span>\n<span class="token function">cd</span> /tmp <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> ossfs</code></pre>\n      </div>\n<ol start="3">\n<li>编写挂载脚本</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">cd</span> ~/\n\n<span class="token comment"># 这里加权限为了后面步骤</span>\n<span class="token function">sudo</span> vim start_ossfs.sh</code></pre>\n      </div>\n<p>然后写入</p>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token comment"># 卸载</span>\nfusermount -u /tmp/ossfs\n\n<span class="token comment"># 重新挂载 (这里需要前台运行 -f, 指定id是为了docker, 掩码是和 allow_other是为了控制挂载盘的docker进程访问权限)</span>\n<span class="token function">exec</span> ossfs my-bucket \\\n  my-mount-point \\\n  -ourl<span class="token operator">=</span>my-oss-endpoint \\\n  -f -ouid<span class="token operator">=</span>33 -ogid<span class="token operator">=</span>0 -o allow_other -o mp_umask<span class="token operator">=</span>007</code></pre>\n      </div>\n<ol start="4">\n<li>配置 supervisor</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token comment"># 安装</span>\n<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> supervisor</code></pre>\n      </div>\n<p>编辑 <code class="language-text">/etc/supervisor/supervisord.conf</code> (也可以单独写一个加到 <code class="language-text">conf.d</code>)</p>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text">[program:ossfs]\ncommand=bash /YOUR/PATH/TO/SCRIPT/start_ossfs.sh\nlogfile=/var/log/ossfs.log\nlog_stdout=true\nlog_stderr=true\nlogfile_maxbytes=1MB\nlogfile_backups=10</code></pre>\n      </div>\n<ol start="5">\n<li>运行</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">sudo</span> supervisord -c /etc/supervisor/supervisord.conf</code></pre>\n      </div>\n<ol start="6">\n<li>确认一切 OK</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> supervisor <span class="token comment"># 应该能看到supervisor进程</span>\n<span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> ossfs <span class="token comment"># 应该能看到ossfs进程</span>\n<span class="token function">kill</span> -9 ossfs <span class="token comment"># 杀掉ossfs进程，supervisor应该会重启它, 不要使用killall, 因为killall发送SIGTERM，进程正常退出，supervisor不再去重新运行ossfs</span>\n<span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> ossfs <span class="token comment"># 应该能看到ossfs进程</span>\n<span class="token function">sudo</span> <span class="token function">df</span> -h <span class="token comment"># 应该能看到 ossfs 正确挂载</span></code></pre>\n      </div>\n<p>注意如果 <code class="language-text">ossfs</code> 没有启动需要杀掉 <code class="language-text">supervisor</code> 进程重新启动</p>\n<h3 id="nextcloud"><a href="#nextcloud" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>nextcloud</h3>\n<p>由于这里是采用 <code class="language-text">Docker</code> 进行容器化部署, 就直接贴配置和文件了, <code class="language-text">Docker</code> 的安装和使用不在此赘述. 另外 <code class="language-text">Nginx</code> 反代和 <code class="language-text">SSL</code> 的配置单独放在一起, 有时间稍后补上</p>\n<ol>\n<li>建立 <code class="language-text">Docker</code> 的目录</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">cd</span> ~ <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> compose\n\n<span class="token function">cd</span> compose <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> nextcloud <span class="token operator">&amp;&amp;</span> <span class="token function">cd</span> nextcloud</code></pre>\n      </div>\n<ol start="2">\n<li>\n<p>依次添加以下文件</p>\n</li>\n<li>\n<p><code class="language-text">db.env</code></p>\n</li>\n</ol>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text">MYSQL_PASSWORD=YOUR_PASSWORD\nMYSQL_DATABASE=nextcloud\nMYSQL_USER=nextcloud</code></pre>\n      </div>\n<ul>\n<li><code class="language-text">docker-compose.yml</code></li>\n</ul>\n<div class="gatsby-highlight" data-language="yml">\n      <pre class="language-yml"><code class="language-yml">version: &#39;3&#39;\n\nservices:\n  db:\n    image: mariadb\n    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW\n    restart: always\n    volumes:\n      - db:/var/lib/mysql\n    environment:\n      - MYSQL_ROOT_PASSWORD=YOUR_MYSQL_PASSWORD\n    env_file:\n      - db.env\n\n  redis:\n    image: redis\n    restart: always\n\n  app:\n    build: ./app\n    restart: always\n    ports:\n      - 8080:80\n    volumes:\n      - nextcloud:/var/www/html\n      - ./custom_apps:/var/www/html/custom_apps\n      - /tmp/ossfs:/var/www/html/data\n    environment:\n      - MYSQL_HOST=db\n    env_file:\n      - db.env\n    depends_on:\n      - db\n      - redis\n\n  cron:\n    build: ./app\n    restart: always\n    volumes:\n      - nextcloud:/var/www/html\n      - ./custom_apps:/var/www/html/custom_apps\n      - /tmp/ossfs:/var/www/html/data\n    entrypoint: /cron.sh\n    depends_on:\n      - db\n      - redis\n\nvolumes:\n  db:\n  nextcloud:</code></pre>\n      </div>\n<ul>\n<li><code class="language-text">Makefile</code></li>\n</ul>\n<div class="gatsby-highlight" data-language="makefile">\n      <pre class="language-makefile"><code class="language-makefile">down:\n\tdocker-compose down\n\nup:\n\tdocker-compose up -d\n\nstart: down up</code></pre>\n      </div>\n<ul>\n<li><code class="language-text">./app/Dockerfile</code></li>\n</ul>\n<div class="gatsby-highlight" data-language="dockerfile">\n      <pre class="language-dockerfile"><code class="language-dockerfile">FROM nextcloud:apache\n\nCOPY redis.config.php /usr/src/nextcloud/config/redis.config.php</code></pre>\n      </div>\n<ul>\n<li><code class="language-text">./app/redis.config.php</code></li>\n</ul>\n<div class="gatsby-highlight" data-language="php">\n      <pre class="language-php"><code class="language-php"><span class="token delimiter important">&lt;?php</span>\n<span class="token variable">$CONFIG</span> <span class="token operator">=</span> <span class="token keyword">array</span> <span class="token punctuation">(</span>\n  <span class="token single-quoted-string string">\'memcache.locking\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token single-quoted-string string">\'\\OC\\Memcache\\Redis\'</span><span class="token punctuation">,</span>\n  <span class="token single-quoted-string string">\'redis\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token keyword">array</span><span class="token punctuation">(</span>\n    <span class="token single-quoted-string string">\'host\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token single-quoted-string string">\'redis\'</span><span class="token punctuation">,</span>\n    <span class="token single-quoted-string string">\'port\'</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token number">6379</span><span class="token punctuation">,</span>\n  <span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>\n<ul>\n<li><code class="language-text">custom_app</code></li>\n</ul>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">mkdir</span> custom_app\n\n<span class="token comment"># 在改变权限之后如果要安装App的话就得用root权限了</span>\n<span class="token function">sudo</span> <span class="token function">chown</span> -R www-data:root ./custom_app</code></pre>\n      </div>\n<blockquote>\n<p>注意这里可以自己从<a href="https://apps.nextcloud.com/">nextcloud 应用商店</a>来下载自定义 App 来安装解压放到这个目录下, 比如 talk 就不再是默认提供的 App 了 (由于文档比较老让直接到相关页面找害得找了半天)</p>\n</blockquote>\n<ol start="3">\n<li>运行</li>\n</ol>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash"><span class="token function">make</span> start</code></pre>\n      </div>\n<p>成功的话应该可以访问到服务期地址 <code class="language-text">8080</code> 端口看到正确的登录画面</p>\n<p>\n  <a\n    class="gatsby-resp-image-link"\n    href="/static/login-fce953fd8102c31805326e4359da711f-b5b3d.jpg"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n  \n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 690px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 96.19289340101524%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAATABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAIEA//EABcBAAMBAAAAAAAAAAAAAAAAAAABBAL/2gAMAwEAAhADEAAAAeWjLVkABNDQLX//xAAZEAACAwEAAAAAAAAAAAAAAAABAgMSICH/2gAIAQEAAQUCHS8dV3//xAAVEQEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAwEBPwEhP//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8BH//EABgQAAIDAAAAAAAAAAAAAAAAAAARITCR/9oACAEBAAY/AkONo//EABoQAAICAwAAAAAAAAAAAAAAAAERACEwUYH/2gAIAQEAAT8hBdA9waB5fB//2gAMAwEAAgADAAAAEAv/AH7/xAAWEQEBAQAAAAAAAAAAAAAAAAABESD/2gAIAQMBAT8QRETD/8QAFhEBAQEAAAAAAAAAAAAAAAAAARAR/9oACAECAQE/EEdMYz//xAAdEAEAAgICAwAAAAAAAAAAAAABABEhMRBBYXGB/9oACAEBAAE/EHCUVWqD3DGOaSy/KgFQ3Drxjg2RMQn/2Q==\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px #f7f0eb;"\n        alt="login"\n        title=""\n        src="/static/login-fce953fd8102c31805326e4359da711f-da128.jpg"\n        srcset="/static/login-fce953fd8102c31805326e4359da711f-17be1.jpg 173w,\n/static/login-fce953fd8102c31805326e4359da711f-79cf8.jpg 345w,\n/static/login-fce953fd8102c31805326e4359da711f-da128.jpg 690w,\n/static/login-fce953fd8102c31805326e4359da711f-89498.jpg 1035w,\n/static/login-fce953fd8102c31805326e4359da711f-6d3d0.jpg 1380w,\n/static/login-fce953fd8102c31805326e4359da711f-b5b3d.jpg 1576w"\n        sizes="(max-width: 690px) 100vw, 690px"\n      />\n    </span>\n  </span>\n  \n  </a>\n    </p>\n<h2 id="小结"><a href="#%E5%B0%8F%E7%BB%93" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>小结</h2>\n<ul>\n<li>上传下载速度有明显提升, 理论讲速度和带宽应该差不多一致</li>\n<li>UI 和功能完整度以及安全性方面比 <code class="language-text">owncloud</code> 有一些提升, 值得一搞</li>\n<li>发现新的 UI 是拿 <code class="language-text">Vue</code> 写的</li>\n<li>首次登入输入完管理员账号之后出现连不上数据库的报错虽然比较莫名其妙但是多登入一次就行</li>\n<li>要注意加载卷的权限, 这里挂载脚本设置权限是一个坑</li>\n</ul>\n<h2 id="参考"><a href="#%E5%8F%82%E8%80%83" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>参考</h2>\n<ul>\n<li><a href="https://medium.com/@Alibaba_Cloud/how-to-install-nextcloud-talk-using-docker-on-alibaba-cloud-ffc8fb326405">how-to-install-nextcloud-talk-using-docker-on-alibaba-cloud</a></li>\n<li><a href="https://blog.ssdnodes.com/blog/installing-nextcloud-docker/">installing-nextcloud-docker</a></li>\n<li><a href="https://www.cnblogs.com/woshimrf/p/understand-docker-uid.html?spm=a2c4e.10696291.0.0.ad0a19a4PZkqWV">understand-docker-uid</a></li>\n<li><a href="https://yq.aliyun.com/articles/53990">谈谈 Docker Volume 之权限管理</a></li>\n</ul>',excerpt:"前言 之前一直都是用的  owncloud  来管理和同步一些自己的资料, 搭建在自己屋子里的服务器上.\n然而最近需要上传和下载东西的时候发现由于受制于住的地方以及转发服务器的性能和带宽网速十分捉急.\n之前随便转悠的时候发现了比 owncloud…",timeToRead:4,fields:{slug:"/blog/2019-10-16--使用阿里云OSS+Docker搭建Nextcloud/"},frontmatter:{tags:["2019-10","Docker","nextcloud"],author:{id:"SoraYama - 空山",bio:"折腾点前端和其他",twitter:"@ClassicSilence1",avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-0294e.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-0294e.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f0f16.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6c605.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-031f1.jpg 3x"}}]}},title:"使用阿里云OSS+Docker搭建Nextcloud",updatedDate:"Oct 16, 2019",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/nextcloud-1bb99f288b731ba8e714fc91933b88eb-acea4.jpg",srcSet:"/static/nextcloud-1bb99f288b731ba8e714fc91933b88eb-acea4.jpg 1x"}}]}}},recents:{edges:[{node:{fields:{slug:"/blog/2019-10-08--ShadowSocks的种种/"},timeToRead:3,frontmatter:{title:"ShadowSocks的种种",updatedDate:"2019-10-08",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/shadowsocks-1ce0d1cd7e1d0637a29faca7d03ee87a-1bfe5.jpg",srcSet:"/static/shadowsocks-1ce0d1cd7e1d0637a29faca7d03ee87a-1bfe5.jpg 1x,\n/static/shadowsocks-1ce0d1cd7e1d0637a29faca7d03ee87a-60440.jpg 1.5x,\n/static/shadowsocks-1ce0d1cd7e1d0637a29faca7d03ee87a-168f5.jpg 2x"}}]},author:{avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f1b3b.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-d2364.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6f7fc.jpg 3x"}}]}}}}},{node:{fields:{slug:"/blog/2018-07-29--misc/"},timeToRead:3,frontmatter:{title:"Misc",updatedDate:"2019-07-30",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-1bfe5.jpeg",srcSet:"/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-1bfe5.jpeg 1x,\n/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-60440.jpeg 1.5x,\n/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-168f5.jpeg 2x,\n/static/cup-of-coffee-laptop-office-macbook-89786-98bc53d2012296d56b37cad2ff328b5a-40495.jpeg 3x"}}]},author:{avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f1b3b.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-d2364.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6f7fc.jpg 3x"}}]}}}}},{node:{fields:{slug:"/blog/2019-07-03--前端面试汇总/"},timeToRead:9,frontmatter:{title:"前端面试汇总(持续更新)",updatedDate:"2019-07-28",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/fe-509f7cfdd1a14bf357f75a03cde10624-1bfe5.jpg",srcSet:"/static/fe-509f7cfdd1a14bf357f75a03cde10624-1bfe5.jpg 1x,\n/static/fe-509f7cfdd1a14bf357f75a03cde10624-60440.jpg 1.5x,\n/static/fe-509f7cfdd1a14bf357f75a03cde10624-168f5.jpg 2x,\n/static/fe-509f7cfdd1a14bf357f75a03cde10624-40495.jpg 3x"}}]},author:{avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f1b3b.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-d2364.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6f7fc.jpg 3x"}}]}}}}},{node:{fields:{slug:"/blog/2018-07-29--Gatsby-and-Travis/"},timeToRead:3,frontmatter:{title:"用 gatsby 和 travis-ci 自动化构建和部署 github-pages",updatedDate:"2018-07-29",image:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-1bfe5.jpeg",srcSet:"/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-1bfe5.jpeg 1x,\n/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-60440.jpeg 1.5x,\n/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-168f5.jpeg 2x,\n/static/gatsby-word-c44bca7fd6ad9ad38985ba07e1a3b252-40495.jpeg 3x"}}]},author:{avatar:{children:[{__typename:"ImageSharp",responsiveResolution:{src:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg",srcSet:"/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-e9ed2.jpg 1x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-f1b3b.jpg 1.5x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-d2364.jpg 2x,\n/static/avatar-d7657fc7ec759cfa220ac058ed0b571a-6f7fc.jpg 3x"}}]}}}}}]}},pathContext:{slug:"/blog/2019-10-16--使用阿里云OSS+Docker搭建Nextcloud/"}}}});
//# sourceMappingURL=path---blog-2019-10-16-使用阿里云oss-docker搭建-nextcloud-4ee44922987ff167c71f.js.map
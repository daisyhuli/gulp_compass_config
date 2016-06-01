#gdemo1

gulp+compass+livereload

LiveReload配置
1、安装Chrome LiveReload
2、通过npm安装http-server，快速建立http服务

npm install http-server -g
3、通过cd找到发布环境目录dist
4、运行http-server，默认端口是8080
5、访问路径localhost:8080
6、再打开一个cmd，通过cd找到项目路径执行gulp，清空发布环境并初始化
7、执行监控 gulp
8、点击chrome上的LiveReload插件，空心变成实心即关联上，你可以修改css、js、html即时会显示到页面中。

Load config from config.rb (项目里有config配置文件)
注意:修改compass路径文件
css_dir = "dist/styles"
sass_dir = "src/styles"
images_dir = "src/images"


Load config without config.rb (项目不必有config配置文件,自己配置)

by 1th.Junßß



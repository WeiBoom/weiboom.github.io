# Chirpy Starter

[![Gem Version](https://img.shields.io/gem/v/jekyll-theme-chirpy)][gem]&nbsp;
[![GitHub license](https://img.shields.io/github/license/cotes2020/chirpy-starter.svg?color=blue)][mit]

When installing the [**Chirpy**][chirpy] theme through [RubyGems.org][gem], Jekyll can only read files in the folders
`_data`, `_layouts`, `_includes`, `_sass` and `assets`, as well as a small part of options of the `_config.yml` file
from the theme's gem. If you have ever installed this theme gem, you can use the command
`bundle info --path jekyll-theme-chirpy` to locate these files.

The Jekyll team claims that this is to leave the ball in the user’s court, but this also results in users not being
able to enjoy the out-of-the-box experience when using feature-rich themes.

To fully use all the features of **Chirpy**, you need to copy the other critical files from the theme's gem to your
Jekyll site. The following is a list of targets:

```shell
.
├── _config.yml
├── _plugins
├── _tabs
└── index.html
```

To save you time, and also in case you lose some files while copying, we extract those files/configurations of the
latest version of the **Chirpy** theme and the [CD][CD] workflow to here, so that you can start writing in minutes.

## Usage

Check out the [theme's docs](https://github.com/cotes2020/jekyll-theme-chirpy/wiki).

## 部署说明（重要）

本仓库通过 `.github/workflows/pages-deploy.yml`（Workflow 名：`Build and Deploy`）构建并发布站点，
所以 **Settings → Pages → Build and deployment → Source 必须选 `GitHub Actions`**。

若误设为 `Deploy from a branch`（main 分支），GitHub 会在每次 push 时额外运行内置的
`pages build and deployment`；又因为根目录存在 `.nojekyll`，该流程不会执行 Jekyll 构建，
而是把**仓库源码原样发布**（包含 `_config.yml`、`Gemfile`、`README.md`、`_posts/*.md`），
并与 `Build and Deploy` 抢夺发布权，导致站点随机损坏：

- 首页只剩下未渲染的 front matter
- 所有 `/posts/...` 链接返回 404
- `_config.yml` / `Gemfile` 等文件可被公网直接下载

排查方式：

```shell
curl -s https://api.github.com/repos/WeiBoom/weiboom.github.io/pages | grep build_type
# 正确输出应为 "build_type":"workflow"，而不是 "legacy"
```

仓促之下救急：在 Actions 里重新运行 `Build and Deploy`（或 `workflow_dispatch`）即可恢复。

## Contributing

This repository is automatically updated with new releases from the theme repository. If you encounter any issues or want to contribute to its improvement, please visit the [theme repository][chirpy] to provide feedback.

## License

This work is published under [MIT][mit] License.

[gem]: https://rubygems.org/gems/jekyll-theme-chirpy
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/
[CD]: https://en.wikipedia.org/wiki/Continuous_deployment
[mit]: https://github.com/cotes2020/chirpy-starter/blob/master/LICENSE

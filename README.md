# wonder-shooter-site

wonder-shooter webサイト用リポジトリ

## 構成

### `source`ブランチ

開発ブランチ

### 開発手順

`git clone` 後下記を実行

```
$ npm install
$ gulp copy
```

開発・下記でローカルサーバが起動

```
$ npm start
```

### `サーバ単独起動`

`git clone` 後下記を実行

```
$ npm install
$ npm run standalone
```

### `master`ブランチ

GitHub Pages 公開用ブランチ（`source`ブランチからのsubtreeリポジトリ）

開発後下記のコマンドで `source`ブランチから `master` subtreeブランチにマージする

subtreeへのmerge（リモートが`origin`の場合）

```
$ git subtree push --prefix=htdocs origin master
```

## 動作環境

- Mac(Sierra)での動作確認済み
- node v7.2.1 以上で動作確認済み

## 参考リポジトリ

- [maepon/markup-code-set](https://github.com/maepon/markup-code-set)
- [manabuyasuda/website-template](https://github.com/manabuyasuda/website-template)



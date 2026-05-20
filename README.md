# j-lac.github.io

J-LAC (Japanese study for Lifestyle Activity and Context) の公開サイト。Jekyll で組まれていて、`main` ブランチに push すれば GitHub Actions が自動でビルド・公開します。

更新者は **HTML を一切書きません**。下記の編集ポイントだけ覚えれば十分です。

---

## ✏️ よくある更新作業

### A. お知らせを追加する

お知らせは `_news/` ディレクトリの 1 ファイル＝1 件で管理します。

1. `_news/` に新しいファイルを作成。ファイル名は **`YYYY-MM-DD-<英小文字スラッグ>.md`** 形式:
   ```
   _news/2026-07-15-summer-seminar.md
   ```
2. 中身は以下のテンプレート:
   ```markdown
   ---
   date: 2026-07-15
   title: 【ご案内】夏季セミナーを開催します
   category: seminar
   ---

   ここに本文を Markdown で書きます。複数行 OK。
   箇条書きも `## 見出し` もリンクも書けます。
   ```
3. `category:` は以下から選択:
   - `general` — 一般のお知らせ
   - `seminar` — セミナー・勉強会
   - `paper` — 論文発表
   - `grant` — 研究助成・採択
4. 保存 → `main` に push（GitHub Web 上で編集 → Commit でも OK）。
5. Home の「お知らせ」欄に自動で追加され、`/news/<slug>/` に詳細ページが生成されます。
   `seminar` を付けたものは [/work/seminar/](/work/seminar/) にも自動で表示されます（`paper`→[/work/papers/](/work/papers/), `grant`→[/work/grants/](/work/grants/)）。

### B. ページ本文を書き換える

各ページは Markdown ファイル（`.md`）です。ファイル上半分の `---` で囲まれた部分（front-matter）はそのままにして、その下の本文だけ書き換えてください。

| ページ | 編集するファイル |
|---|---|
| About トップ | `about/index.md` |
| MISSION・VISION・VALUE | `about/mvv.md` |
| メンバー | `about/member.md` |
| Shared Infrastructure トップ | `shared/index.md` |
| オープンデータベース | `shared/database.md` |
| 教育用デモデータ | `shared/demo.md` |
| Our Work トップ | `work/index.md` |
| セミナーのご案内 | `work/seminar.md`（一覧の説明文だけ。各セミナーの詳細は `_news/` で） |
| 論文 | `work/papers.md`（同上） |
| 研究助成の獲得 | `work/grants.md`（同上） |

Markdown の書き方は [GitHub Docs: Markdown](https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) を参照。

### C. メンバーを追加・変更する

`_data/members.yml` を編集してください:

```yaml
  - name: 山田太郎
    affiliation: ○○大学　△△学部
    researchmap: https://researchmap.jp/yamada
```

- `researchmap:` を空欄にすると名前はテキスト（リンクなし）
- `researchmap:` に URL を入れると名前が外部リンクになります

未取得の researchmap URL が判明したら、該当メンバーの `researchmap:` 行に追記してください。

### D. コラボレーター都道府県を変更する

`_data/collaborators.yml` の `highlighted:` リストに県名を追加／削除します:

```yaml
highlighted:
  - 北海道
  - 福島県
  - 茨城県
  ...
```

* 完全一致（「東京都」「京都府」「大阪府」「○○県」「北海道」）が必須です。
* メンバーページの 47 都道府県グリッド上で、該当県が朱色枠で強調表示されます。
* `as_of:` の日付も合わせて更新するとグリッド下に表示されます。

### E. 「問い合わせフォーム ＞」のリンク先を Google Form に設定する

`_config.yml` の以下の行を編集して、Google Form の公開 URL を貼り付けます:

```yaml
contact_form_url: "https://forms.gle/xxxxxxxxxxxx"
```

`#` のままだと「リンク無効」扱いです。

### F. ナビ項目を追加・削除する

`_data/nav.yml` を編集します。各 HTML を編集する必要はありません。
新しい子ページを増やすには:

1. `_data/nav.yml` の該当親に `children:` を追加（または既存に 1 項目追加）
2. 対応する `.md` を作成（`permalink:` を一致させること）

### G. ロゴ画像・ブランド色

- ヘッダー画像: `assets/hero.png` を同名で差替
- 富士山背景: `assets/fuji.png`
- 赤三角バナー: `assets/banner.png`
- 色・フォント: `assets/style.css` 冒頭 `:root { ... }` のカスタムプロパティ

### H. サンプル素材を活用する

サンプル原稿は `_samples/` ディレクトリに退避してあります（Jekyll ビルドには含まれません）:

- `_samples/_news/` — 架空のお知らせ 4 件（セミナー / 論文 / 助成 / メンバー追加）
- `_samples/pages/` — 各サブページのサンプル本文入りバージョン

実際の運用に切り替える時は、該当ファイルを `_samples/` から元の場所に戻して書き換えてください。詳しい手順は `_samples/README.md` を参照。

---

## 🚀 公開の仕組み

`main` ブランチへの push で `.github/workflows/pages.yml` が次を実行:

1. Ruby + Jekyll をセットアップ
2. `bundle exec jekyll build` で `_site/` に静的サイトを生成
3. `_site/` を GitHub Pages にデプロイ

**初回 1 回だけ**、GitHub リポジトリの **Settings → Pages → Build and deployment → Source** を **`GitHub Actions`** に設定してください。

公開状況は **Actions タブ** で確認できます。

---

## 🖥️ ローカルプレビュー

### Docker（推奨・Ruby インストール不要）

```bash
cd j-lac.github.io
docker run -d --rm --name j-lac-preview \
  -p 4000:4000 -p 35729:35729 \
  -v "$PWD:/srv/jekyll" \
  jekyll/jekyll:4 \
  jekyll serve --livereload --force_polling --host 0.0.0.0
# → http://localhost:4000/
```

ファイル保存で自動再ビルド & ブラウザ自動リロード。停止は `docker stop j-lac-preview`。

### ネイティブ Ruby

```bash
cd j-lac.github.io
bundle install         # 初回のみ
bundle exec jekyll serve --livereload
# → http://localhost:4000/
```

不要なら GitHub Web の編集 → Commit だけで全更新が完結します。

---

## 📁 ファイル構成

```
j-lac.github.io/
├── _config.yml                 サイト設定（タイトル・contact_form_url・collections）
├── _data/
│   ├── nav.yml                 ★ ナビ構造（親子）
│   ├── members.yml             ★ 代表・メンバー名簿
│   └── collaborators.yml       ★ 強調表示する都道府県
├── _news/                      ★ お知らせ追加はここ（1 件 1 ファイル）
│   └── 2026-05-20-site-launch.md
├── _samples/                   公開前のサンプル素材置き場（ビルド除外）
│   ├── _news/                  架空のお知らせサンプル
│   ├── pages/                  サンプル本文入りページ
│   └── README.md               昇格・廃棄手順
├── _layouts/
│   ├── default.html            全ページの枠（ヘッダー・ナビ・フッター）
│   ├── home.html               Home 用（鉄紺 + 富士山 + お知らせ）
│   ├── subpage.html            サブページ用（赤三角バナー + 本文）
│   └── news.html               お知らせ詳細ページ用
├── _includes/
│   ├── nav.html                ナビバー描画
│   ├── japan-map.html          47 都道府県グリッド描画
│   └── news-list.html          カテゴリ別お知らせ一覧
├── assets/
│   ├── style.css               ★ 色・フォントはここ
│   ├── nav.js                  スマホ用ドロップダウントグル
│   ├── hero.png                ★ ヘッダー画像
│   ├── fuji.png                富士山ラインアート
│   └── banner.png              赤三角バナー
├── index.md                    Home
├── about/
│   ├── index.md                ★ About トップ
│   ├── mvv.md                  ★ MISSION・VISION・VALUE
│   └── member.md               メンバー（members.yml / collaborators.yml から自動描画）

├── shared/
│   ├── index.md                ★ Shared Infrastructure トップ
│   ├── database.md             ★ オープンデータベース
│   └── demo.md                 ★ 教育用デモデータ
├── work/
│   ├── index.md                ★ Our Work トップ
│   ├── seminar.md              セミナー（_news/ category=seminar から自動描画）
│   ├── papers.md               論文（_news/ category=paper から自動描画）
│   └── grants.md               研究助成（_news/ category=grant から自動描画）
├── Gemfile / .gitignore
└── .github/workflows/pages.yml GitHub Actions（自動デプロイ）
```

★ がついたファイルが日常的な更新対象です。


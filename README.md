# Socket.IO + Next.js + Supabase + OAuth

## ▼ テーマ

1. Socket.IOのクライアントをNext.jsで構築
1. チャット履歴をSupabaseで管理
1. サインイン認証をメールアドレスとGoogle認証
1. 簡単なRLS設定

---

## ▼ デプロイ

https://hitorigods-socket-io-next.onrender.com/

---

## ▼ ER図

【未反映】Supabaseのキャプチャ貼る

---

## ▼ 開発・プレビュー手順

【未反映】実行コマンド説明

【未反映】.env.local説明

【未反映】Supabase CLI説明

---

## ▼ TODO

⭕：完了、⚠：実装したが思うとこあり、❎：余裕がでたら実装するかも？

1. 開発環境
   1. ⭕create-next-app
   2. ⭕JotaiにDevtoolsを導入
   3. ⭕TanStack Query実装
   4. ⚠ORM（prisma）導入 ⇒ 結局活用できてない？
      1. ⚠seedデータ登録 ⇒ SQL壊れる？
   5. ⭕Supabase導入
      1. ⭕データベース更新されたらupdateAtを更新する（SQL）
      2. ❎リモートsupabase にプッシュしてデプロイ
      3. ❎supabase CLIでseedデータ作る（Snaplet）
2. デプロイ
   1. ⭕Renderにデプロイ
   2. ❎サーバー監視サービスでRendar/Supabaseを落ちなくする
3. フォルダ構成
   1. ⭕atomコンポーネントをコロケーション分離
4. Socket機能
   1. ⭕Socket部分のサーバーサイド
   2. ⭕Socket部分のクライアントサイド
   3. ⭕ルームから出たらにソケットを切断する
   4. Socket機能を一つにまとめて分離
5. サインイン機能
   1. ⭕サインインフォーム作成
   2. ⭕サインインユーザーを登録
   3. ⭕サインアウト処理
   4. ⭕セッション判定でリダイレクト
   5. ⭕メールアドレス認証
   6. OAuth実装
      1. ⭕Google
      2. ⭕GitHub
      3. ⭕Discord
   7. エラーのアラート内容を日本語に
6. チャット機能
   1. ⭕テーブル用意
   2. ⭕チャットの編集・削除機能
   3. ⭕所有ユーザーのみチャット削除・更新
   4. ⭕ルーム入室でデータベースからクエリ保持してチャット復元
   5. ⭕ソケット受信でクエリ更新
   6. 編集モードをキャンセル
   7. RLS設定（閲覧は全ユーザー、編集削除は所有ユーザーのみ）
   8. バリデーション（Zod）
   9. ❎受信したいデータのセレクト方法をバックエンド側で処理（Supabaseカスタムフック？）
   10. ❎チャットの非公開設定
   11. ❎チャットが更新されたら音鳴らす
   12. ❎他ユーザーのサインイン通知、入退室が目に見えるように
7. プロフィール機能
   1. ⭕テーブル用意
   2. ⭕初回にプロフィール情報を登録
   3. ⭕プロフィール情報を編集
   4. ⭕クライアントにアップロードした画像をプレビュー表示
   5. ⭕画像のストレージ登録
   6. ⭕ストレージにアップロードした画像を取得
   7. ⭕プレビューをキャンセルした場合は登録済みの画像を表示
   8. ⭕アップロード登録したら前回の画像をデータベースから削除
   9. RLS設定（閲覧は全ユーザー、編集削除は所有ユーザーのみ）
   10. バリデーション（Zod）
8. ルーム機能
   1. ⭕テーブル用意
   2. カスケードデリート設定
   3. ルームアクセス時にSocket接続して直リンク可能に
   4. ルームの作成
   5. ルームIDに一致したチャットリストを取得
   6. ルームの一覧表示と個別ページにルーティング
   7. ルーム作成したユーザーのみルーム名編集
   8. RLS設定（閲覧は全ユーザー、編集削除は所有ユーザーのみ）
   9. バリデーション（Zod）
9. レイアウト調整
   1. ⭕ナビゲーション（TOP/プロフィール/サインアウト/チャット一覧）
   2. ⭕チャット一覧画面
   3. ⭕チャット作成されたら最新にスクロール移動
   4. ⭕サインインフォーム画面
      1. ソーシャルログイン部分
   5. ⭕プロフィールフォーム画面
   6. TOPのルーム一覧
   7. フェッチローディング中のスピナー表示
   8. ⭕キーボードタブでのフォーカスの可視化（アクセシビリティ）
   9. 投稿が自分か他人か判定してレイアウト変える
   10. 編集・削除するときのアラートをやめてステータス通知表示（エラー表示と合わせて）
   11. チャットの入力フォームが最初にフォーカスするように
   12. エラーのアラートをやめてステータス通知表示（エラー表示と合わせて）
10. README
    1. 関連ファイルをフォルダにまとめる
    2. ER図のキャプチャ画像を貼る
    3. ❎参考URLをタブ分け
11. 💀💀💀 **BugFix** 💀💀💀
    1. SupabaseのスキーマSQLをCIから復元しようとするとエンコードエラー
    2. リモートSupabaseにPush/Pullでエラー

---

## ▼ 雑感

- チャットページの初回アクセスのみDBからデータ取得してJotaiでステート管理、ページにいる間はすべてステート更新だけでリアルタイムに更新させた
  - DB更新と一緒にステート更新だけでなくソケットに更新内容を受信して再度ステート更新させてる
  - WebSocketを使わなくてもSupabaseのリアルタイム機能やreactQueryの`useQuery`オプションで定期フェッチさせる`refetchInterval`だけでも普通に作れそうだった
    - が、Supabaseクラウド版で開発していたが3日目で無料枠制限に到達…。ローカル版で開発必須
    - データベースの通信コスト考えると更新の度にフェッチさせるのは微妙
    - `refetchInterval`をやめてさせてソケット受信したときのみgetQueryを叩いくようにしてみたが、レンダリング結果が一回分ずれたので結局ステートで管理にした…
      - `useQuery`の再フェッチが`run dev`状態と`run build&&start`で挙動が違うのはなぜ？`useEffect`が二回実行されるから？
    - サインイン中のユーザーとか活動中のルームとかのリアルタイム判定とかするならWebSocketの方がいい？
- データの取得をクライアントで絞り混んでいるが本来はサーバーで取得できるようにすべき（Supabaseの`rpc`カスタムクエリ？）
- フォルダ構成やファイル名/関数の命名規則はずっと手探りだった…
  - 最初は`util/hooks/libs/stores/shemas`など細かく分けていたが、コロケーション的に機能依存を元に`future`フォルダにごそっとまとめた
  - じゃあ、`components`フォルダってなんなのさ…。`utils`フォルダも基準が曖昧…。
    - とりあえずボタンとか汎用パーツとかを`components`、便利関数を`hooks`、全体を横断するライブラリ関係を`libs`として`utils`にぶっ込んだがモヤッとはしてる
  - せっかくAppRouterなのでプライベートフォルダ構造でもよかったかも？
  - WebSocketのAPIルートがPageRouterでないと機能しないっぽい（要調査）ので`pages`フォルダを使っているが邪魔…
- 次回Next.jsでデータベース使うならT3スタックで始めたい
  - Prismaをうまく活用できてないのとtRPCも試したい

---

## ▼ 備忘録

### ■ supabase CLIでデータ操作

Push/Pull

```
$ supabase db push
$ supabase db pull
```

ローカルにマイグレーションファイルを新規作成

```
$ supabase migration new [ファイル名]
```

作成したマイグレーションファイルにサーバーの差分を取得

```
$ supabase db diff --linked > supabase\migrations\[タイムスタンプ]_[ファイル名].sql
```

マイグレーションファイルをデータベースに反映

```
$ supabase db reset
```

リモートのデータのみをローカルのseedに残す

```
$ supabase db dump -f supabase/seed.sql --data-only
```

https://qiita.com/masakinihirota/items/b84c071415eeebb4a252

### ■ supabase CLIで型ファイルを生成

npm scriptsをで叩くようにしたいが、SupabaseプロジェクトIDをgitに残したくないので、 `.env.local`の環境変数`DATABASE_URL`を用意して、`tsx`で `supabase-types.ts`を実行

```
$ pnpm run supabase:types

↓実行
$ dotenv -e .env.local -- tsx supabase-types.ts

↓内部処理
$ supabase gen types typescript --db-url ${process.env.DATABASE_URL} > src/libs/supabase.types.ts
```

https://hassakulab.com/posts/npm-script-with-dotenv/

※ts-nodeだとCommonJSモジュール扱いになりエラーがでたのでtsxを利用

※ローカル版ではDB URLの指定で取得できたので、以前のクラウド版前提だったプロジェクトID指定はやめた

クラウド版GUIなら以下から作成できる

https://supabase.com/dashboard/project/zmjeowldxauntodensjj/api?page=tables-intro

### ■ Supabase ローカル版でOAuthのリダイレクト先がlocalhostではなく127.0.0.1になってしまう問題

`/supabase/config.toml`のsite_urlをlocalhostにする

```diff
-site_url = "http://127.0.0.1:3000"
+site_url = "http://localhost:3000"
```

### ■ Prisma Migrateをdotenvを使い.env.localで実行

```
PNPM
$ ./node_modules/.bin/dotenv -e .env.local -- pnpm dlx prisma migrate dev --name init
```

### ■ prisma/seed.tsでts-nodeがエラーになる問題

#### ① tsx をインストール

```
$ pnpm i -D tsx
```

https://github.com/privatenumber/tsx

※PATHを通すため一度グローバルインストールをした

#### ② package.jsonに追記

```
"prisma": {
  "seed": "tsx prisma/seed.ts"
},
```

以下は解決できず

```
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
},
```

https://github.com/prisma/prisma/issues/7053

### ■ 【クラウド版？】PrismaでseedファイルをプッシュするとSupabaseのパーミッションがおかしくなることが多発

今のところプロジェクト作り直すしかどうしようもないので、GUIからCSVファイルをエクスポート/インポートで凌ぐ…

※ローカル版ではまだ試してないがSupabase CLIでプッシュできそう

https://github.com/supabase/supabase/issues/4883

↓この辺かも？

https://supabase.com/docs/guides/cli/managing-environments

---

## ▼ チートシート

### ■ Zod

https://zenn.dev/uttk/articles/bd264fa884e026

### ■ Tailwind CSS

https://tailwindcomponents.com/cheatsheet/

https://tailwindcomponents.com/

https://zenn.dev/ixkaito/articles/advanced-tailwindcss

### ■ prisma チートシート (CLI)

https://qiita.com/ryskBonn92/items/c45e22ce5f37d82ec8de

### ■ Prismaデコレーター一覧

https://qiita.com/curry__30/items/95d3655fa23d84b959a3

## ▼ 公式

### ■ Supabase CLI

https://supabase.com/docs/guides/cli/getting-started?platform=windows

### ■ Snaplet

https://docs.snaplet.dev/recipes/supabase

### ■ React Query

https://tanstack.com/query/v4/docs/react/installation

### ■ Socket.io

https://socket.io/docs/v4/

#### ○ Uptime Robot（サーバー監視サービス）

https://uptimerobot.com/

https://laboradian.com/uptime-robot/

## ▼ 参考

### ■ Socket系

#### ○ Next.js で WebSocket アプリケーションを作成する

https://qiita.com/ochiochi/items/dbf5040fd665326e8fb5

https://qiita.com/ochiochi/items/102d14649396d351ab80

#### ○ Socket.IOのドキュメントを読んで基本を勉強してみた

https://qiita.com/okumurakengo/items/92ad5aacd08c4e25ebeb

#### ○ React Queryと組み合わせる

https://tkdodo.eu/blog/using-web-sockets-with-react-query

### ■ DB系

#### ○ Supabase入門

https://zenn.dev/chot/articles/ddd2844ad3ae61

https://zenn.dev/yu_undefined/scraps/ee259f6dd080a5

#### ○ Supabase Tips サーバーのスキーマとそのテーブルのデータをローカルのSupabaseに反映させる。

https://qiita.com/masakinihirota/items/e8e83cb10b56047d4bae

#### ○ Supabase + useQuery

https://makerkit.dev/blog/saas/supabase-react-query

#### ○ Supabase の DB で行が更新されたら updated_at も同時に更新する

https://zenn.dev/panda_program/scraps/b97575650ef08c

#### ○ uuidの是非

https://techblog.raccoon.ne.jp/archives/1627262796.html

#### ○ supabaseをローカルにダウンロード

https://katblog.manadream.net/index.php/2022/07/07/supabase-local/

#### ○ Supabaseストレージに画像をアップロードし、表示する

https://qiita.com/dshukertjr/items/05437bb88bc7ae8583b8

### ■ OAuth系

#### ○ Next.js + Supabase アプリでサーバーやローカル開発環境で、認証に必要な Client ID と Client secrets の取得。(Slack、Google、GitHub)

https://qiita.com/masakinihirota/items/706326a64dab3ffbf55b

#### ○ supabaseの認証機能

https://qiita.com/kaho_eng/items/cb8d735b5b6ca1b3a6c5

#### ○ OAuth & OIDC 入門解説

https://www.youtube.com/watch?v=PKPj_MmLq5E

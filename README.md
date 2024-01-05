# Socket.IO + Next.js + Supabase + OAuth

## ▼ テーマ

1. Socket.IO のクライアントを Next.js 構築
1. チャット履歴をSupabaseで管理
1. ログイン認証をGoogle認証に
1. 簡単なRLS

---

## ▼ デプロイ

https://hitorigods-socket-io-next.onrender.com/

---

## ▼ ER

【未反映】Supabaseのキャプチャ貼る

---

## ▼ 雑感

- データの取得をフロントエンドで絞り混んでいるがバックエンド側で取得できるようにすべき（Supabaseのカスタムフック？）
- フォルダ構成の手探り感が…。
  - util/hooks/libs/stores/shemasなど細かく分けているがもっとまとめたりコンポーネント依存を元にフォルダでまとめるとかのほうが運用しやすい？
- WebSocketを試す目的で始めたが、Supabaseのリアルタイム機能とuseQuryのrefetchIntervalだけでも普通に作れそうだった
  - が、Supabaseクラウド版で開発していたが3日目で無料枠制限に到達…。ローカル版で開発必須だった
  - Supabaseの通信コスト考えるとチャット操作のときだけデータベース触るならWebSocketの方がいいかも？
  - ログイン中のユーザーとか活動中のルームとかのリアルタイム判定とかWebSocketの方がいい？
- 次回Next.jsでバックエンド使うならT3スタックで始めたい
  - Prismaをうまく活用できてないのとtRPCも試したい

---

## ▼ TODO

1. 画面実装
   1. ⭕create-next-app
   2. ⭕Socket部分のサーバーサイド
   3. ⭕Socket部分のクライアントサイド
   4. ⭕Renderにデプロイ
   5. ⭕フォルダ構成を整理
   6. ⭕JotaiにDevtoolsを導入
   7. ⭕TOPに戻ったときにソケットを切断する
   8. ⭕チャットの編集・削除機能
   9. ⭕ログインフォーム作成
   10. アバター画像を表示
   11. バリデーション（Zod）
       1. 送信チャット登録
       2. ログインフォーム
       3. ルーム登録
   12. ルームの作成
       1. ルームの作成
       2. ルームの一覧表示と個別ページにルーティング
       3. ルームID一致したチャットリスト
       4. ルーム作成したユーザーのルーム名編集権限
   13. エラー表示
       1. アラート内容を日本語に
       2. アラートではなく通知表示に
   14. Socket機能を一つにまとめて分離
2. データベース
   1. ⭕ORM（prisma）導入
   2. ⭕Supabase用意
   3. ⭕チャット履歴/ユーザー/ユーザープロフィールのテーブル用意
   4. ⭕seedデータ登録
   5. ⭕フェッチ（TanStack Query）実装
   6. ⭕データベースからチャット復元
   7. ⭕データベース操作
   8. ⭕データベース更新されたらupdateAtを更新する（SQL）
   9. ⭕ログインユーザーを登録
   10. ⭕プロフィールID用のデータベースを作る
   11. RLS設定
   12. チャットのユーザー権限
       1. 所有ユーザーのみチャット削除・更新
   13. アバター画像
       1. 画像のストレージ登録
       2. ストレージ画像URLをプロフィール情報に反映
   14. 個別ルーム
       1. ルーム用のデータベースとカスケード設定
3. 認証機能
   1. ⭕メールアドレス認証
   2. OAuth実装
      1. Google
   3. ログインエラー通知
   4. 投稿者名をニックネーム編集可能に
4. レイアウト調整
   1. ログイン/プロフィールフォームの体裁
   2. ナビゲーション（TOP/プロフィール/ログアウト/チャット一覧）
   3. チャット更新の度に最新にスクロール移動
   4. 投稿が自分か他人か判定してレイアウト変える
   5. 編集・削除するときにアラート表示（dialogモーダル？）
   6. キーボードタブでのフォーカスの可視化（アクセシビリティ）
   7. チャットの入力フォームが最初にフォーカスするように
5. README
   1. 関連ファイルをフォルダにまとめる
   2. 参考URLはタブを分ける
6. 拡張機能
   1. チャットの非公開設定
   2. 他ユーザーのログイン通知、入退室が目に見えるように
   3. サーバー監視サービスでRendar/Supabaseを落ちなくする
   4. supabase CLIでseedデータ作る（Snaplet）
7. 💀**BugFix**💀
   1. ⭕ビルドデータでリアルタイム更新できない（ウィンドウの再フォーカスでは更新される）
      1. ⇒ `useQuery`のオプション`refetchInterval`で対処
         1. ⇒ run dev状態では問題なかったのになぜ？
         2. ⇒ `refetchInterval`の通信コストも本来は望ましくない？
   2. SupabaseのスキーマSQLをCIから復元しようとするとエンコードエラー
   3. リモートSupabaseにPush/Pullでエラー

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
$ supabase migration new create\_[ファイル名]
```

作成したマイグレーションファイルにサーバーの差分を取得

```
$ supabase db diff --linked > supabase\migrations\[タイムスタンプ]_create_[ファイル名].sql
```

マイグレーションファイルをローカルに反映

```
$ supabase db reset
```

リモートのデータのみをローカルのシードファイルに残す

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

---

## ▼ 参考

### ■ Socket系参考

#### ○ Next.js で WebSocket アプリケーションを作成する

https://qiita.com/ochiochi/items/dbf5040fd665326e8fb5

https://qiita.com/ochiochi/items/102d14649396d351ab80

https://qiita.com/okumurakengo/items/92ad5aacd08c4e25ebeb

#### ○ React Queryと組み合わせる

https://tkdodo.eu/blog/using-web-sockets-with-react-query

#### ○ サーバー監視サービス

#### Uptime Robot

https://uptimerobot.com/

https://laboradian.com/uptime-robot/

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

### ■ OAuth系

#### ○ supabaseの認証機能

https://qiita.com/kaho_eng/items/cb8d735b5b6ca1b3a6c5

#### ○ OAuth & OIDC 入門解説

https://www.youtube.com/watch?v=PKPj_MmLq5E

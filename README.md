# Socket.IO + Next.js + Supabase + OAuth

## ▼ テーマ

1. Socket.IO のクライアントを Next.js 構築
1. チャット履歴をSupabaseで登録
1. ログイン認証をGoogle認証に
1. 簡単なRLS

## ▼ デプロイ

#### ○ Render

https://hitorigods-socket-io-next.onrender.com/

## ▼ TODO

1. 画面実装
   1. ⭕create-next-app
   2. ⭕サーバーサイド
   3. ⭕クライアントサイド
   4. ⭕デプロイ
   5. ⭕開発ブランチを用意
   6. ⭕フォルダ構成を整理
   7. ⭕JotaiにDevtoolsを導入
   8. ⭕ルームに直アクセスでTOPにリダイレクト
   9. 見た目を整える
      1. ⭕ヘッダー・フッター設置
      2. ⭕TOPへ戻るボタン
      3. 投稿が自分か他人か判定してレイアウト変える
2. データベース
   1. ⭕ORM（prisma）導入
   2. ⭕Supabase用意
   3. ⭕チャット履歴/ユーザー/ユーザープロフィールのテーブル用意
   4. ⭕seedデータ登録
   5. フェッチ（TanStack Query）実装
   6. データベースからチャット復元
   7. データベース保存
   8. ログインユーザーを登録
   9. RLS設定
   10. 所有ユーザーのみチャット削除・更新
3. 認証機能
   1. メールアドレス認証
   2. OAuth実装
   3. Google
   4. Github
   5. ログインエラー通知
   6. 投稿者名をニックネーム編集可能に

## ▼ 備忘録

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

### ■ supabase CLIで型ファイルを生成

npm scriptsを用意してコマンドを叩くが、SupabaseプロジェクトIDをgitに残したくない
ので、 `.env.local`の環境変数`SUPABASE_PROJECT_ID`を用意して、`tsx`で
`supabase-types.ts`を実行

```
$ pnpm run supabase:types

↓実行
$ dotenv -e .env.local -- tsx supabase-types.ts

↓内部処理
$ supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > src/libs/supabase.types.ts
```

https://hassakulab.com/posts/npm-script-with-dotenv/

※ts-nodeだとCommonJSモジュール扱いになりエラーがでたのでtsxを利用

クラウド版なら以下から作成できる

https://supabase.com/dashboard/project/zmjeowldxauntodensjj/api?page=tables-intro

## ▼ チートシート

### Tailwind CSS

https://tailwindcomponents.com/cheatsheet/

https://tailwindcomponents.com/

## ▼ 参考

### ■ Socket系参考

#### ○ Next.js で WebSocket アプリケーションを作成する(サーバー編)

https://qiita.com/ochiochi/items/dbf5040fd665326e8fb5

#### ○ Next.js で WebSocket アプリケーションを作成する(クライアント編)

https://qiita.com/ochiochi/items/102d14649396d351ab80

#### ○ WebSocket を使ったアプリは Render にデプロイすると簡単だよという話

https://qiita.com/house_neko/items/ad4fea17cbbdf7ce0ec7

https://qiita.com/okumurakengo/items/92ad5aacd08c4e25ebeb

#### ○ サーバー監視サービス

#### Uptime Robot

https://uptimerobot.com/

https://laboradian.com/uptime-robot/

### ■ DB系

#### ○ prisma チートシート (CLI)

https://qiita.com/ryskBonn92/items/c45e22ce5f37d82ec8de

#### ○ Prismaデコレーター一覧

https://qiita.com/curry__30/items/95d3655fa23d84b959a3

#### ○ Supabase入門

https://zenn.dev/chot/articles/ddd2844ad3ae61

#### ○ Supabase + useQuery

https://makerkit.dev/blog/saas/supabase-react-query

https://zenn.dev/yu_undefined/scraps/ee259f6dd080a5

#### ○ uuidの是非

https://techblog.raccoon.ne.jp/archives/1627262796.html

#### ○ supabaseをローカルにダウンロード

https://katblog.manadream.net/index.php/2022/07/07/supabase-local/

### ■ OAuth系

#### ○ OAuth & OIDC 入門解説

https://www.youtube.com/watch?v=PKPj_MmLq5E

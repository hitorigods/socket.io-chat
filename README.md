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

1. ⭕create-next-app
1. ⭕サーバーサイド
1. ⭕クライアントサイド
1. ⭕デプロイ
1. ⭕開発ブランチを用意
1. ⭕フォルダ構成を整理
1. ⭕JotaiにDevtoolsを導入
1. ⭕ルームに直アクセスでTOPにリダイレクト
1. ⭕ORM（prisma）導入
1. ⭕データベース（Supabase）用意
1. ⭕チャット履歴/ユーザー/ユーザープロフィールのテーブル用意
1. データベース保存
1. チャット復元
1. RLS設定
1. メールアドレス認証
1. OAuth実装
   1. Google
   1. Github
1. ログインエラー通知
1. ログインユーザーの投稿者名とアカウント名をデータベースに収める
1. 投稿者名を投稿者名に
1. 投稿者名を編集可能に
1. 投稿が自分か他人か判定してレイアウト変える

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

#### ○ uuidの是非

https://techblog.raccoon.ne.jp/archives/1627262796.html

#### ○ supabaseをローカルにダウンロード

https://katblog.manadream.net/index.php/2022/07/07/supabase-local/

### ■ OAuth系

#### ○ OAuth & OIDC 入門解説

https://www.youtube.com/watch?v=PKPj_MmLq5E

```

```

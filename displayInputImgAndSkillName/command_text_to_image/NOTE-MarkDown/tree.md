
```
Docker-Compose
└── docker-mysql
    ├── docker-compose.yml
    └── mysql
        ├── DB
        │   └── world.sql
        ├── Dockerfile
        └── my.cnf

src
├── app
|    ├── api
|    |    ├── country
|    |    |    ├── [continent].ts
|    |    |    ├── [slug]
|    |    |    |    └── route.ts
|    |    |    └── route.ts
|    |    └── search
|    |        └── route.ts
|    ├── components
|    |    ├── CommandForm.tsx
|    |    ├── CommandInput.tsx
|    |    ├── SkillName.tsx
|    |    └── Search.tsx
|    ├── favicon.ico
|    ├── globals.css
|    ├── layout.tsx
|    ├── page.tsx
|    ├── searchData
|    |    ├── [continent]
|    |    |    └── page.tsx
|    |    └── page.tsx
|    ├── template.tsx
|    ├── uploadCSV
|    |    └── uploadTest.csv
|    └── util
|      ├── connectImageArray.tsx
|      └── imageUtl.tsx
└── lib
     └── prismaClient.ts
     
pages

prisma
├── migrations
│   ├── 20240624011720_add_unique_constraint_to_name
│   │   └── migration.sql
│   ├── 20240702084622_
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma

public

     
```
```BestPractice
my-next-app/
├── app/
│   ├── api/
│   │   └── hello/
│   │       └── route.ts
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── button.module.css
│   │   │   │   └── button.test.tsx
│   │   │   └── card/
│   │   │       ├── page.tsx
│   │   │       ├── card.module.css
│   │   │       └── card.test.tsx
│   │   └── layout/
│   │       ├── footer/
│   │       │   ├── page.tsx
│   │       │   ├── footer.module.css
│   │       │   └── footer.test.tsx
│   │       ├── header/
│   │       │   ├── page.tsx
│   │       │   ├── header.module.css
│   │       │   └── header.test.tsx
│   │       └── layout.tsx
│   ├── hooks/
│   │   └── use-custom-hook.ts
│   ├── lib/
│   │   ├── db.ts
│   │   └── utils.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.ts
│   ├── types/
│   │   └── index.d.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── head.tsx
│   ├── error.tsx
│   └── loading.tsx
├── public/
│   ├── images/
│   │   ├── favicon.ico
│   │   └── logo.svg
│   └── fonts/
├── middleware.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

1. app ディレクトリ
Next.js 13で導入された app ディレクトリは、アプリケーションのエントリーポイントとなります。ルーティング、レイアウト、データフェッチなどの主要な機能が app ディレクトリ内で管理されます。これにより、より直感的で管理しやすいアプリケーション構造を実現できます。

2. api ディレクトリ
app/api ディレクトリは、APIルートを定義するための場所です。ここでは、サーバーサイドのAPIエンドポイントを実装します。APIルートをコンポーネントと分離することで、コードの可読性と保守性が向上します。

3. components ディレクトリ
app/components ディレクトリは、再利用可能なUIコンポーネントとレイアウト関連のコンポーネントを格納します。 ui サブディレクトリにはボタンやカードなどの汎用的なUIコンポーネントを、 layout サブディレクトリにはヘッダーやフッターなどのレイアウト関連のコンポーネントを配置します。コンポーネントを明確に分類することで、コードの再利用性と保守性が向上します。

4. hooks ディレクトリ
app/hooks ディレクトリは、カスタムフックを格納するための場所です。再利用可能なロジックをフックとして定義し、コンポーネント間で共有することができます。これにより、コードの重複を避け、ロジックの一貫性を保つことができます。

5. lib ディレクトリ
app/lib ディレクトリは、データベース接続や汎用的なユーティリティ関数などの共通ライブラリを格納します。これらのライブラリは、アプリケーション全体で利用される可能性があります。共通ライブラリを一箇所に集約することで、コードの重複を避け、保守性を向上させることができます。

6. styles ディレクトリ
app/styles ディレクトリは、グローバルなスタイルシートやテーマ関連のファイルを格納します。ここで定義されたスタイルは、アプリケーション全体に適用されます。グローバルなスタイルを一元管理することで、デザインの一貫性を保つことができます。

7. types ディレクトリ
app/types ディレクトリは、TypeScriptの型定義ファイルを格納します。アプリケーション内で使用される共通の型を定義することで、型の一貫性を保つことができます。型定義を一箇所に集約することで、型の管理がしやすくなります。

8. public ディレクトリ
public ディレクトリは、静的なアセットを格納するための場所です。画像やフォントなどのファイルを public ディレクトリに配置することで、アプリケーション内で容易に参照できるようになります。

9. middleware.ts
middleware.ts は、ミドルウェアを定義するためのファイルです。リクエストの事前処理や認証管理などをミドルウェアで行うことで、各ページの処理をシンプルに保つことができます。ミドルウェアを活用することで、コードの重複を避け、セキュリティを向上させることができます。

10. next.config.js
next.config.js は、Next.jsの設定ファイルです。ビルド設定やプラグインの設定などを行います。適切な設定を行うことで、アプリケーションのパフォーマンスを最適化することができます。


# プロジェクト構造

このドキュメントは、AIを活用したタスク分解およびスケジューリングシステムのディレクトリ構造を概説しています。

## ルートディレクトリ

- `LICENSE`：MITライセンスファイル。
- `README.md`：プロジェクトの主要なREADMEファイル。
- `PROJECT_STRUCTURE.md`：本ファイル。プロジェクト構造を概説しています。
- `backend/`：Node.js/Expressバックエンドアプリケーションが含まれています。
- `frontend/`：React Nativeモバイルアプリケーションが含まれています。

## バックエンド (`/backend`)

バックエンドはExpressフレームワークを使用するNode.jsプロジェクトです。

- `node_modules/`：Node.jsモジュール（依存関係）のディレクトリ。
- `package.json`：プロジェクトの依存関係とスクリプトを定義します。
- `package-lock.json`：依存関係の正確なバージョンを記録します。
- `.env.example`：環境変数のサンプルファイル。
- `.gitignore`：Gitによって無視されるファイルを指定します。
- `src/`：主要なソースコードディレクトリ。
  - `controllers/`：受信リクエストとビジネスロジックを処理します。
    - `projectController.js`：プロジェクトおよびタスク関連のエンドポイントを管理します。
    - `scheduleController.js`：スケジュール関連のエンドポイントを管理します。
  - `database/`：データベース接続およびクエリロジックが含まれています。
  - `routes/`：APIルートを定義します。
    - `projectRoutes.js`：プロジェクト関連のエンドポイントのルート。
    - `scheduleRoutes.js`：スケジュール関連のエンドポイントのルート。
  - `services/`：外部API連携（例：Gemini API、iCalパース）用。
  - `index.js`：バックエンドサーバーの主要なエントリーポイント。

## フロントエンド (`/frontend`)

フロントエンドはReact Nativeアプリケーションです。

- `MotivatreeApp/`：React Nativeプロジェクトの主要なディレクトリ。
  - `android/`：Android固有のプロジェクトファイル。
  - `ios/`：iOS固有のプロジェクトファイル。
  - `node_modules/`：Node.jsモジュール（依存関係）のディレクトリ。
  - `package.json`：プロジェクトの依存関係とスクリプトを定義します。
  - `App.tsx`：主要なアプリケーションコンポーネント。
  - `index.js`：アプリケーションのエントリーポイント。
  - `...`（React Native、Babelなどのその他の設定ファイル）

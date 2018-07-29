-- 'poll_app' というユーザー名のユーザーを '(YourPassword999)' というパスワードで作成
-- データベース 'poll_app' への権限を付与
CREATE DATABASE poll_app;
CREATE USER poll_app@localhost IDENTIFIED WITH mysql_native_password BY '(YourPassword999)';
GRANT ALL ON poll_app.* TO 'poll_app'@'localhost';

-- データベース 'poll_app_test' に対して 'poll_app_test' というユーザー名のユーザーを '(YourPassword999)' というパスワードで作成
-- データベース 'poll_app_test' への権限を付与
-- こちらはテスト実行時のみ利用されるデータベース
CREATE DATABASE poll_app_test;
CREATE USER poll_app_test@localhost IDENTIFIED WITH mysql_native_password BY '(YourPassword999)';
GRANT ALL ON poll_app_test.* TO 'poll_app_test'@'localhost';

-- 投票結果の管理で利用するテーブル
CREATE TABLE `answers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `answers` int(10) NOT NULL,
  `lock_version` int(10) unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;


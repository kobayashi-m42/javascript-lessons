-- 'todo_app' というユーザー名のユーザーを '(YourPassword999)' というパスワードで作成
-- データベース 'todo_app' への権限を付与
CREATE DATABASE todo_app;
CREATE USER todo_app@localhost IDENTIFIED WITH mysql_native_password BY '(YourPassword999)';
GRANT ALL ON todo_app.* TO 'todo_app'@'localhost';

-- TODOの管理で利用するテーブル
CREATE TABLE `todos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `state` tinyint(1) NOT NULL DEFAULT '0',
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `lock_version` int(10) unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

-- 初期データ
INSERT INTO
  todos (state, title)
VALUES
  (0, 'todo 0'),
  (0, 'todo 1'),
  (1, 'todo 2');

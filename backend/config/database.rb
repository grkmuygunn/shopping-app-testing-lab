require 'sqlite3'

DB = SQLite3::Database.new 'shopping.db'
DB.results_as_hash = true

DB.execute <<-SQL
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    stock INTEGER NOT NULL
  );
SQL

CREATE TABLE IF NOT EXISTS users (
  id_user SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  followers INTEGER NOT NULL DEFAULT 0,
  create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  birth_date TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id_post SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL,
  imageSrc VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE IF NOT EXISTS comments (
  id_comment SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL,
  id_post INTEGER NOT NULL,
  comment VARCHAR(255) NOT NULL,
  comment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id_user),
  FOREIGN KEY (id_post) REFERENCES posts(id_post)
);

CREATE TABLE IF NOT EXISTS followers (
  id_follow SERIAL PRIMARY KEY,
  id_user INTEGER NOT NULL,
  id_user_follower INTEGER NOT NULL,
  state VARCHAR(255) NOT NULL DEFAULT 'pending',
  request_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  request_update_date TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id_user),
  FOREIGN KEY (id_user_follower) REFERENCES users(id_user)
);
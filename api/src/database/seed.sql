INSERT INTO roles (id, name, description)
VALUES(uuid_generate_v4(), 'admin'::role_name, 'Administrator');

INSERT INTO roles (id, name, description)
VALUES(uuid_generate_v4(), 'regular_user'::role_name, 'Normal user');

INSERT INTO status (id, name, description, model)
VALUES(uuid_generate_v4(), 'online'::status_name, 'Contact on-line', 'contacts');

INSERT INTO status (id, name, description, model)
VALUES(uuid_generate_v4(), 'offline'::status_name, 'Contact off-line', 'contacts');

INSERT INTO status (id, name, description, model)
VALUES(uuid_generate_v4(), 'accepted'::status_name, 'Invite accepted', 'invites');

INSERT INTO status (id, name, description, model)
VALUES(uuid_generate_v4(), 'waiting'::status_name, 'Invite waiting', 'invites');

INSERT INTO status (id, name, description, model)
VALUES(uuid_generate_v4(), 'denied'::status_name, 'Invite denied', 'invites');

INSERT INTO users (id, name, email, username, password, active, role_id)
VALUES (
  uuid_generate_v4(),
  'admin',
  'admin@mycircle.com',
  'admin',
  '$2b$08$UD7VYSISseDF9sbKIvVHJeuMp4QQ5bd3tTxdXad5Ks34a9DbYT6vK',
  true,
  (SELECT id FROM roles WHERE name = 'admin')::uuid
);

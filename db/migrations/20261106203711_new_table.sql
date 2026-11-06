-- migrate:up
CREATE TABLE links (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    original_link text NOT NULL,
    short_code text UNIQUE NOT NULL,
    click_count integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    excluido_em timestamptz
);

CREATE TABLE access (
    id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_agent text,
    ip_address inet NOT NULL,
    link_id integer NOT NULL REFERENCES links(id) ON DELETE RESTRICT,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_access_link_id ON access (link_id);


-- migrate:down

DROP TABLE IF EXISTS links

DROP TABLE IF EXISTS access


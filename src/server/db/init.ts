import type Database from "better-sqlite3";

export function initDatabase(sqlite: Database.Database) {
  sqlite.exec(`
    create table if not exists projects (
      id text primary key,
      title text not null,
      status text not null default 'active',
      yarn_type text,
      yarn_weight text,
      colors_used text,
      hook_size text,
      finished_size text,
      notes text,
      photo_path text,
      pdf_path text,
      pdf_filename text,
      created_at text not null,
      updated_at text not null
    );

    create table if not exists counters (
      id text primary key,
      project_id text not null references projects(id) on delete cascade,
      name text not null,
      type text not null default 'row',
      current_value integer not null default 0,
      target_value integer,
      notes text,
      is_completed integer not null default 0,
      sort_order integer not null default 0,
      created_at text not null,
      updated_at text not null
    );

    create table if not exists custom_sections (
      id text primary key,
      project_id text not null references projects(id) on delete cascade,
      title text not null,
      content text not null default '',
      sort_order integer not null default 0,
      created_at text not null,
      updated_at text not null
    );

    create table if not exists app_settings (
      key text primary key,
      value text not null
    );
  `);
}

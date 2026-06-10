export function getDatabasePath(): string {
  return process.env.DATABASE_PATH ?? "local.db"
}

export function getDatabaseFiles(): string[] {
  const path = getDatabasePath()
  return [path, `${path}-wal`, `${path}-shm`]
}

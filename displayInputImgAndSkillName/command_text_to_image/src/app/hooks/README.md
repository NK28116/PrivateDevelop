# hooks

| ディレクトリ               | 主な目的              | 例                                    |
| -------------------- | ----------------- | ------------------------------------ |
| `components/`        | 見た目（UI）の構築        | `<SkillCard />`, `<Button />`        |
| `util/` または `utils/` | 純粋な関数（状態を持たない）    | `formatDate()`, `loadSkills()`       |
| `hooks/`             | 状態や副作用を含むロジックの再利用 | `useFetchData()`, `useSkillSearch()` |

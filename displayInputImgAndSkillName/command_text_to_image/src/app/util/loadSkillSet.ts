import fs from 'fs';
import path from 'path';

export type SkillData = {
  GameTitle: string;
  CharacterName: string;
  Input: string;
  SkillName: string;
  CommandImagePath: string[];
  HitParts: string;
};

// skillSet/{GameTitle}/{CharacterName}/ 以下をすべて再帰的に読み込む
export function loadSkills(gameTitle: string, characterName: string): SkillData[] {
  const skillDir = path.resolve(
    __dirname,
    '../public/skillSet',
    gameTitle,
    characterName
  );

  if (!fs.existsSync(skillDir)) {
    console.warn(`⚠ ディレクトリが存在しません: ${skillDir}`);
    return [];
  }

  const skillFiles: string[] = [];

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath); // 再帰
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        skillFiles.push(fullPath);
      }
    }
  }

  walk(skillDir);

  const skills: SkillData[] = skillFiles.map((filePath) => {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(raw);
    return json as SkillData;
  });

  return skills;
}

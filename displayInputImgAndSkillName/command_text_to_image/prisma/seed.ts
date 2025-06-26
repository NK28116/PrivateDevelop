const { PrismaClient ,HitPartsEnum} =require( '@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.command.createMany({
    data: [
      {
        GameTitle: 'SF6',
        CharacterName: 'リュウ',
        Input: '236中P',
        SkillName: '中昇竜拳',
        CommandImagePath: ['236.svg', 'MidP.svg'],
        HitParts: 'Middle',
      },
      {
        GameTitle: 'SF6',
        CharacterName: 'リュウ',
        Input: '623弱P',
        SkillName: '弱波動拳',
        CommandImagePath: ['623.svg', 'LowP.svg'],
        HitParts: 'Low',
      },
      {
        GameTitle: 'SF6',
        CharacterName: 'ザンギエフ',
        Input: '63214強K',
        SkillName: '強シベリアン',
        CommandImagePath: ['62314.svg', 'HighK.svg'],
        HitParts: 'High',
      },
      {
        GameTitle: '鉄拳8',
        CharacterName: '麗奈',
        Input: '6n23justRP',
        SkillName: '最速風神拳',
        CommandImagePath: ['6n23.svg', 'justRP.svg'],
        HitParts: 'High',
      },
      {
        GameTitle: 'GGST',
        CharacterName: '梅喧',
        Input: '41236HS',
        SkillName: 'HS蚊鉤',
        CommandImagePath: ['41236.svg', 'HS.svg'],
        HitParts: 'Low',
      },
    ],
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
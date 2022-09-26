import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
  const kich = await db.user.create({
    data: {
      username: 'kich',
      // this is a hashed version of "twixrox"
      passwordHash: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
    },
  });

  await Promise.all(
    getTodos().map(todo => {
      const data = { createrId: kich.id, ...todo };
      return db.todo.create({ data });
    }),
  );
}

seed();

function getTodos() {
  return [
    {
      title: 'Road worker',
      description: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,

      category: 'work',
      progress: 'todo',
      index: 0,
    },
    {
      title: 'Frisbee',
      description: `I was wondering why the frisbee was getting bigger, then it hit me.`,

      category: 'life',
      progress: 'todo',
      index: 1,
    },
    {
      title: 'Trees',
      description: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
      category: 'life',
      progress: 'todo',
      index: 2,
    },
    {
      title: 'Skeletons',
      description: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
      category: 'work',
      progress: 'inProgress',
      index: 0,
    },
    {
      title: 'Hippos',
      description: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
      category: 'life',
      progress: 'inProgress',
      index: 1,
    },
    {
      title: 'Dinner',
      description: `What did one plate say to the other plate? Dinner is on me!`,
      category: 'life',
      progress: 'done',
      index: 0,
    },
    {
      title: 'Elevator',
      description: `My first time using an elevator was an uplifting experience. The second time let me down.`,
      category: 'work',
      progress: 'done',
      index: 1,
    },
  ];
}

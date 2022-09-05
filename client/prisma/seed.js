import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getTodos().map((todo) => {
      return db.todo.create({ data: todo });
    })
  );
}

seed();

function getTodos() {

  return [
    {
      title: "Road worker",
      description: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
      done:false,
      category:'work',
      progress:'todo'
    },
    {
      title: "Frisbee",
      description: `I was wondering why the frisbee was getting bigger, then it hit me.`,
      done:false,
      category:'life',
      progress:'todo'
    },
    {
      title: "Trees",
      description: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
      done:false,
      category:'life',
      progress:'todo'
    },
    {
      title: "Skeletons",
      description: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
      done:false,
      category:'work',
      progress:'todo'
    },
    {
      title: "Hippos",
      description: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
      done:false,
      category:'life',
      progress:'todo'
    },
    {
      title: "Dinner",
      description: `What did one plate say to the other plate? Dinner is on me!`,
      done:false,
      category:'life',
      progress:'todo'
    },
    {
      title: "Elevator",
      description: `My first time using an elevator was an uplifting experience. The second time let me down.`,
      done:false,
      category:'work',
      progress:'todo'
    },
  ];
}
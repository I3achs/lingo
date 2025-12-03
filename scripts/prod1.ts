import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // Delete all existing data
    await Promise.all([
      db.delete(schema.userProgress),
      db.delete(schema.challenges),
      db.delete(schema.units),
      db.delete(schema.lessons),
      db.delete(schema.courses),
      db.delete(schema.challengeOptions),
      db.delete(schema.userSubscription),
    ]);

    // Insert courses
    const courses = await db
      .insert(schema.courses)
      .values([
        { title: "English", imageSrc: "/uk.svg" }, // Đổi thành cờ Anh/Mỹ
      ])
      .returning();

    // For each course, insert units
    for (const course of courses) {
      const units = await db
        .insert(schema.units)
        .values([
          {
            courseId: course.id,
            title: "Unit 1",
            description: `Learn the basics of ${course.title}`,
            order: 1,
          },
        ])
        .returning();

      // For each unit, insert lessons
      for (const unit of units) {
        const lessons = await db
          .insert(schema.lessons)
          .values([
            { unitId: unit.id, title: "Nouns", order: 1 },
            { unitId: unit.id, title: "Verbs", order: 2 },
            { unitId: unit.id, title: "Adjectives", order: 3 },
            { unitId: unit.id, title: "Phrases", order: 4 },
            { unitId: unit.id, title: "Sentences", order: 5 },
          ])
          .returning();

        // For each lesson, insert challenges
        for (const lesson of lessons) {
          const challenges = await db
            .insert(schema.challenges)
            .values([
              {
                lessonsId: lesson.id,
                type: "SELECT",
                question: 'Cái nào là "người đàn ông"?', // Câu hỏi tiếng Việt
                order: 1,
              },
              {
                lessonsId: lesson.id,
                type: "SELECT",
                question: 'Cái nào là "người phụ nữ"?',
                order: 2,
              },
              {
                lessonsId: lesson.id,
                type: "SELECT",
                question: 'Cái nào là "cậu bé"?',
                order: 3,
              },
              {
                lessonsId: lesson.id,
                type: "ASSIST",
                question: '"the man"',
                order: 4,
              },
              {
                lessonsId: lesson.id,
                type: "SELECT",
                question: 'Cái nào là "xác sống"?',
                order: 5,
              },
              {
                lessonsId: lesson.id,
                type: "SELECT",
                question: 'Cái nào là "người máy"?',
                order: 6,
              },
              {
                lessonsId: lesson.id,
                type: "SELECT",
                question: 'Cái nào là "cô gái"?',
                order: 7,
              },
              {
                lessonsId: lesson.id,
                type: "ASSIST",
                question: '"the zombie"',
                order: 8,
              },
            ])
            .returning();

          // For each challenge, insert challenge options
          for (const challenge of challenges) {
            if (challenge.order === 1) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audio: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audio: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audio: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 2) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audio: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audio: "/en_boy.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audio: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 3) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audio: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audio: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audio: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 4) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  audio: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the man",
                  audio: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  audio: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 5) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audio: "/en_man.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  imageSrc: "/woman.svg",
                  audio: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audio: "/en_zombie.mp3",
                },
              ]);
            }

            if (challenge.order === 6) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the robot",
                  imageSrc: "/robot.svg",
                  audio: "/en_robot.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audio: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  imageSrc: "/boy.svg",
                  audio: "/en_boy.mp3",
                },
              ]);
            }

            if (challenge.order === 7) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the girl",
                  imageSrc: "/girl.svg",
                  audio: "/en_girl.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the zombie",
                  imageSrc: "/zombie.svg",
                  audio: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the man",
                  imageSrc: "/man.svg",
                  audio: "/en_man.mp3",
                },
              ]);
            }

            if (challenge.order === 8) {
              await db.insert(schema.challengeOptions).values([
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the woman",
                  audio: "/en_woman.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: true,
                  text: "the zombie",
                  audio: "/en_zombie.mp3",
                },
                {
                  challengeId: challenge.id,
                  correct: false,
                  text: "the boy",
                  audio: "/en_boy.mp3",
                },
              ]);
            }
          }
        }
      }
    }
    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
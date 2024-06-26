/**
 * ! Executing this script will delete all data in your database and seed it with 10 actor.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { copycat } from "@snaplet/copycat";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  await seed.actor((x) => x(3, {
    id: (ctx) => 'user_' + copycat.uuid(ctx.seed),
    name: (ctx) => copycat.oneOf(ctx.seed, ['Ali Salah', 'Baraa Ahmed', 'Omar Emad']),
    group: 'instatus.com',
    email: (ctx) => ctx.data.name?.toLowerCase().replace(' ', '.') + '@instatus.com',

    events: 
      (x) => x(10,
        {
          id: (ctx) => 'evt_' + copycat.uuid(ctx.seed),
          action_id: (ctx) => 'evt_action_' + copycat.uuid(ctx.seed),
          object: 'event_action',
          action_name: (ctx) => copycat.oneOf(ctx.seed, ['user.login_succeeded', 'user.searched_activity_log_events', 'incident.create_succeeded', 'user.invited_teammate']),
          target_id: (ctx) => 'user_' + copycat.uuid(ctx.seed),
          target_name: (ctx) => copycat.email(ctx.seed, { domain: 'instatus.com' }),
          location: (ctx) => copycat.ipv4(ctx.seed),
          metadata: (ctx) => [{
            redirect: '/setup',
            description: 'User logged in succeeded',
            x_request_id: 'req_' + copycat.uuid(ctx.seed),
          }],
        })
    }));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
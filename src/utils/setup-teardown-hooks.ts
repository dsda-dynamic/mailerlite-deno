import tb from "npm:talkback";
import { Req, Talkback } from "npm:talkback/types";
import Tape from "npm:talkback/tape";
import path from "node:path";
import console from "node:console";
const talkback = tb as unknown as Talkback;

// returns an async close function
export function startTalkbackServer() {
  const opts = {
    host: "https://connect.mailerlite.com",
    record: talkback.Options.RecordMode.DISABLED, // to record new tapes: 1. rm -rf tapes 2. change to RecordMode.NEW 3. comment out fallbackMode 4. npm run test
    fallbackMode: talkback.Options.FallbackMode.NOT_FOUND,
    name: "MailerLite",
    port: 9090,
    path: "./tapes",
    allowHeaders: [], // all headers are identical, do not save or match by them
    ignoreBody: true,
    silent: true,
    // debug: true,

    requestDecorator: function requestDecorator(req: Req) {
      delete req.headers["content-length"]; // important! API fails if this header is present
      return req;
    },

    tapeNameGenerator: function nameGenerator(
      tapeNumber: number,
      tape: Tape.default,
    ) {
      const url = new URL(tape.options.host + tape.req.url);
      let endpointName = url.pathname.replace("/api/", "");
      endpointName = endpointName.split("/")[0];
      return path.join(
        `${endpointName}`,
        `test-${tape.req.method}-${tapeNumber}`,
      );
    },
  };

  const server = talkback(opts);
  server.start(() => {
    console.log("************Talkback Started*****************");
  });

  return () => {
    return new Promise<void>((resolve) => {
      server.close(() => {
        console.log("************Talkback Stopped*****************");
        resolve();
      });
    });
  };
}
// // Start talkback server before all tests
// export async function setup() {
//   return async () => {
//     await server.close(() =>
//       console.log("************Talkback Stopped*****************")
//     );
//   };
// }

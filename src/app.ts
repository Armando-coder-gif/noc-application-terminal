import { Server } from "./presentation/server";

(async () => {
  await main();
})();

function main(): void {
  Server.start();
}

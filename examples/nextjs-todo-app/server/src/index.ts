import { start } from "./server";
import * as net from "net";

main();

async function main() {
  const port = parseInt(process.env.PORT || "8080");
  const server = await start(port);
  console.log(
    `[server]: Server is running at http://localhost:${
      port || (server.address() as net.AddressInfo)?.port
    }`
  );
}

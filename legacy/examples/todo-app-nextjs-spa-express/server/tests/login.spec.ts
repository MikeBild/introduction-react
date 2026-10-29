import assert from "assert";
import { start, stop } from "../src/server";
import * as http from "http";
import * as net from "net";

describe("API /login", () => {
  describe("POST", () => {
    let server: http.Server;
    let addressInfo: net.AddressInfo;

    before(async () => {
      server = await start();
      addressInfo = server?.address() as net.AddressInfo;
    });

    it("should return token", async () => {
      const input = {
        username: "mikebild",
        password: "password",
      };

      const sut = await fetch(`http://localhost:${addressInfo?.port}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const result = await sut.json();

      assert.strictEqual(result.token, input.username);
    });

    after(() => {
      return stop(server);
    });
  });
});

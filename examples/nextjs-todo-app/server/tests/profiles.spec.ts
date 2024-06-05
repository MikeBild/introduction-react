import assert from "assert";
import { start, stop } from "../src/server";
import * as http from "http";
import * as net from "net";

describe("API /profiles", () => {
  describe("GET /:username", () => {
    let server: http.Server;
    let addressInfo: net.AddressInfo;

    before(async () => {
      server = await start();
      addressInfo = server?.address() as net.AddressInfo;
    });

    it("should update my profile", async () => {
      const input = {
        username: "mikebild",
        firstName: "Mike",
        lastName: "Bild",
      };

      const sut = await fetch(
        `http://localhost:${addressInfo?.port}/profiles/${input.username}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      const result = await sut.json();
      
      assert.strictEqual(result.firstName, input.firstName);
      assert.strictEqual(result.lastName, input.lastName);
    });

    it("should return my profile", async () => {
      const input = {
        username: "mikebild",
        firstName: "Mike",
        lastName: "Bild",
      };

      const sut = await fetch(
        `http://localhost:${addressInfo?.port}/profiles/${input.username}`
      );
      const result = await sut.json();
      
      assert.strictEqual(result.firstName, input.firstName);
      assert.strictEqual(result.lastName, input.lastName);
    });

    after(() => {
      return stop(server);
    });
  });
});

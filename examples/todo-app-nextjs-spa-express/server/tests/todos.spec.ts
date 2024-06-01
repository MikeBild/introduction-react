import assert from "assert";
import { start, stop } from "../src/server";
import * as http from "http";
import * as net from "net";

describe("API /todos", () => {
  describe("GET /:username", () => {
    let server: http.Server;
    let addressInfo: net.AddressInfo;

    before(async () => {
      server = await start();
      addressInfo = server?.address() as net.AddressInfo;
    });

    it("should update my todos Todo 1 = open", async () => {
      const input = {
        username: "mikebild",
        description: "Todo 1",
        state: "open",
      };

      const sut = await fetch(
        `http://localhost:${addressInfo?.port}/todos/${input.username}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      const result = await sut.json();

      assert.strictEqual(result.description, input.description);
      assert.strictEqual(result.state, input.state);
    });

    it("should update my todos Todo 2 = done", async () => {
      const input = {
        username: "mikebild",
        description: "Todo 2",
        state: "done",
      };

      const sut = await fetch(
        `http://localhost:${addressInfo?.port}/todos/${input.username}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      const result = await sut.json();

      assert.strictEqual(result.description, input.description);
      assert.strictEqual(result.state, input.state);
    });

    it("should return my todos", async () => {
      const input = {
        username: "mikebild",
        description1: "Todo 1",
        state1: "open",
        description2: "Todo 2",
        state2: "done",
      };

      const sut = await fetch(
        `http://localhost:${addressInfo?.port}/todos/${input.username}`
      );
      const result = await sut.json();

      assert.deepEqual(result, {
        [input.description1]: input.state1,
        [input.description2]: input.state2,
      });
    });

    after(() => {
      return stop(server);
    });
  });
});

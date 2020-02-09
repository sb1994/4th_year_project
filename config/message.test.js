const expect = require("expect");

const { generateMessage } = require("./message");

describe("Generate Message", () => {
  it("it shoyld geneate correct message", () => {
    let from = "sean",
      text = "Some random text";
    message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({ from, text });
  });
});

import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback, AvatarImage, settleImage } from "./avatar";

describe("settleImage", () => {
  it("reads a load that settled before hydration", () => {
    expect(settleImage({ complete: true, naturalWidth: 5 })).toBe("loaded");
  });

  it("reads a load that failed before hydration", () => {
    expect(settleImage({ complete: true, naturalWidth: 0 })).toBe("failed");
  });

  it("leaves an in-flight load to its own events", () => {
    expect(settleImage({ complete: false, naturalWidth: 0 })).toBe("pending");
  });
});

describe("Avatar", () => {
  it("renders the image and the fallback together; state settles on mount", () => {
    const markup = renderToStaticMarkup(
      h(
        Avatar,
        {},
        [
          h(AvatarImage, { key: "i", src: "/me.png", alt: "Me" }),
          h(AvatarFallback, { key: "f" }, "AS"),
        ],
      ),
    );
    expect(markup).toContain("ns-avatar__image");
    expect(markup).toContain('src="/me.png"');
    expect(markup).toContain("AS");
  });
});

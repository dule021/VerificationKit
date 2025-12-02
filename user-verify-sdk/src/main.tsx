import { h, render } from "preact";
import "./types.d.ts";
import { mountUserVerifySdk } from "./UserVerify/UserVerify.js";

mountUserVerifySdk();

if (typeof window !== "undefined") {
  render(<user-verify api-key="demo" theme="light" />, document.body);
}

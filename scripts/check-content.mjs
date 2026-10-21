import { readFileSync, existsSync } from "node:fs";
import assert from "node:assert/strict";
const read = (n) => JSON.parse(readFileSync(`content/${n}.json`, "utf8"));
const services = read("services").streams;
assert.deepEqual(
  services.map((x) => x.services.length),
  [7, 8, 9],
);
assert.equal(read("clients").items.length, 42);
assert.equal(read("systems").items.length, 12);
assert.equal(read("values").items.length, 7);
assert.equal(read("audiences").items.length, 7);
assert.equal(read("stages").items.length, 5);
const site = read("site");
assert.equal(site.email, "info@todarabia.com");
assert.equal(site.phone, "+966552714226");
assert.equal(site.images.length, 4);
function inspect(value, path = "") {
  if (Array.isArray(value))
    return value.forEach((v, i) => inspect(v, `${path}.${i}`));
  if (value && typeof value === "object") {
    if ("en" in value || "ar" in value) {
      assert.ok(
        typeof value.en === "string" && value.en.trim(),
        `English missing: ${path}`,
      );
      assert.ok(
        typeof value.ar === "string" && value.ar.trim(),
        `Arabic missing: ${path}`,
      );
    }
    for (const [key, v] of Object.entries(value)) {
      if (
        ["src", "logo", "photo", "image"].includes(key) &&
        typeof v === "string" &&
        v.startsWith("/")
      )
        assert.ok(existsSync("public" + v), `Asset missing: ${v}`);
      inspect(v, `${path}.${key}`);
    }
  }
}
for (const n of [
  "site",
  "services",
  "audiences",
  "clients",
  "systems",
  "values",
  "stages",
  "about",
  "approach",
  "articles",
  "associates",
])
  inspect(read(n), n);
for (const name of ["articles", "associates"]) {
  const items = read(name).items;
  assert.equal(
    new Set(items.map((x) => x.slug)).size,
    items.length,
    `Duplicate ${name} slugs`,
  );
  for (const item of items)
    assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
}
for (const client of read("clients").items)
  if (client.logoApproved)
    assert.ok(client.logo, "Approved logos need an asset");
assert.ok(readFileSync("public/admin/decap-cms.js").length > 100000);
console.log(
  "Content verified: 24 services, 42 organizations, 12 systems, 7 values, 7 audiences, 5 stages, 4 gallery slots and EN/AR translations.",
);

import { c as createComponent } from './astro-component_BLsalWId.mjs';
import 'piccolore';
import { k as createRenderInstruction, j as addAttribute, s as renderHead, t as renderSlot, u as renderTemplate, q as renderComponent, p as maybeRenderHead } from './entrypoint_1l6JDYIE.mjs';
import 'clsx';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><!-- <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> --><link rel="icon" href="/favicon.ico"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Serverless Starter ni Jirrum</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/Users/IT/Documents/Serveless_IPG/ipg_app/src/layouts/Layout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6"> <div class="max-w-4xl mx-auto"> <!-- Header --> <div class="mb-12"> <h1 class="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Location Intelligence</h1> <p class="text-slate-400 text-lg">Real-time geolocation and network information</p> </div> <!-- Status Card --> <div id="statusCard" class="mb-8 p-6 bg-slate-700/50 border border-slate-600 rounded-xl backdrop-blur"> <div class="flex items-center space-x-3"> <div id="statusIndicator" class="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div> <p id="statusMsg" class="text-slate-200 font-medium">Detecting location...</p> </div> </div> <!-- Error Message --> <div id="errorMsg" class="mb-8 p-4 bg-red-900/30 border border-red-700/50 rounded-lg text-red-200 hidden"></div> <!-- GPS Section --> <div id="gpsSection" class="mb-8 hidden"> <div class="bg-slate-700/40 border border-slate-600 rounded-xl p-8 backdrop-blur"> <h2 class="text-2xl font-semibold mb-6 text-slate-100">GPS Location</h2> <div id="gpsDetails" class="grid grid-cols-2 gap-6 md:grid-cols-3"></div> </div> </div> <!-- IP & Network Section --> <div id="ipSection" class="mb-8 hidden"> <div class="bg-slate-700/40 border border-slate-600 rounded-xl p-8 backdrop-blur"> <h2 class="text-2xl font-semibold mb-6 text-slate-100">Network Information</h2> <div id="ipDetails" class="grid grid-cols-2 gap-6 md:grid-cols-3"></div> </div> </div> <!-- Request Button --> <button id="requestLocationBtn" class="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg font-semibold text-white transition transform hover:scale-105 hidden">
Enable GPS Location
</button> </div> </section> ` })}  ${renderScript($$result, "C:/Users/IT/Documents/Serveless_IPG/ipg_app/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/IT/Documents/Serveless_IPG/ipg_app/src/pages/index.astro", void 0);

const $$file = "C:/Users/IT/Documents/Serveless_IPG/ipg_app/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

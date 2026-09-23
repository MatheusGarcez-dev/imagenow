import { useEffect } from "react";

type MetaProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

const SITE = "https://imagenow.com.br";

export function usePageMeta({
  title,
  description,
  path = "/",
  image = `${SITE}/images/hero-bg.png`,
}: MetaProps) {
  useEffect(() => {
    document.title = title;
    const url = `${SITE}${path}`;

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", url);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setLink('link[rel="canonical"]', "href", url);
  }, [title, description, path, image]);
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    const tag = document.createElement("meta");
    if (selector.includes("property")) {
      tag.setAttribute("property", selector.match(/property="([^"]+)"/)?.[1] ?? "");
    } else {
      tag.setAttribute("name", selector.match(/name="([^"]+)"/)?.[1] ?? "");
    }
    document.head.appendChild(tag);
    el = tag;
  }
  el.setAttribute(attr, value);
}

function setLink(selector: string, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

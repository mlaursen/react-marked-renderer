"use client";

import { createContext } from "react";

import { DEFAULT_MARKDOWN_RENDERERS } from "../constants.js";
import { type MarkdownRenderers } from "../types.js";

export const context = createContext<Readonly<MarkdownRenderers>>(
  DEFAULT_MARKDOWN_RENDERERS
);

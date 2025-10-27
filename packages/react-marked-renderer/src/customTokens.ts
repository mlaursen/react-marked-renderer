declare module "marked" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Tokens {
    interface ReactElementToken<
      PropNames extends string = string,
      PropValues = string | boolean,
      Props = Record<PropNames, PropValues>,
    > extends Tokens.Generic {
      type: "blockReactElement" | "inlineReactElement";
      raw: string;
      rawProps: string;
      rawChildren: string;
      tagName: string;
      props: Props;
      tokens: Token[];
      isSelfClosing: boolean;
    }
  }
}

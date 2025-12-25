import { useColorScheme } from "@react-md/core/theme/useColorScheme";
import { useHtmlClassName } from "@react-md/core/useHtmlClassName";

export function ApplyColorScheme(): null {
  const { colorScheme } = useColorScheme();
  useHtmlClassName(`${colorScheme}-mode`);

  return null;
}

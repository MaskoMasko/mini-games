export interface FieldInfo {
  value: number;
  type: "clear" | "bombAround" | "bomb" | "flag" | "unknown";
  opened: boolean;
}

export interface Font {
  size?: string;
  weight?: string;
  fill?: string;
  family?: string;
}


/**
 * Apply all args as attr for selection
 * @param selection
 * @param args key value pairs
 */
export function attrs(selection: any, args: any) {
  for (const attr in args) {
    if (args.hasOwnProperty(attr)) {
      selection.attr(attr, args[attr]);
    }
  }
}

export function applyFont(text: any, font: Font): void {
  attrs(text, {
    'font-weight': font.weight,
    'font-family': font.family,
    'fill': font.fill,
    'font-size': font.size,
  });
}

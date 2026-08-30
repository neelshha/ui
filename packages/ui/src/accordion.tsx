import "./accordion.css";

import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cx } from "./cx";

export type AccordionProps = ComponentProps<"div"> & {
  name?: string | undefined;
};

export type AccordionItemProps = ComponentProps<"details">;

export type AccordionTriggerProps = ComponentProps<"summary">;

export type AccordionPanelProps = ComponentProps<"div">;

export function Accordion({ name, className, children, ...rest }: AccordionProps) {
  return (
    <div className={cx("ns-accordion", className)} {...rest}>
      {name
        ? Children.map(children, (child) => {
            if (!isValidElement<AccordionItemProps>(child)) return child;
            return cloneElement(child, { name: child.props.name ?? name });
          })
        : children}
    </div>
  );
}

export function AccordionItem({ className, ...rest }: AccordionItemProps) {
  return <details className={cx("ns-accordion__item", className)} {...rest} />;
}

export function AccordionTrigger({ className, ...rest }: AccordionTriggerProps) {
  return (
    <summary className={cx("ns-accordion__trigger", className)} {...rest} />
  );
}

export function AccordionPanel({
  className,
  children,
  ...rest
}: AccordionPanelProps) {
  return (
    <div className={cx("ns-accordion__panel", className)} {...rest}>
      {children as ReactNode}
    </div>
  );
}

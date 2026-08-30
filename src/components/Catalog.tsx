import NextLink from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Alert,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  Card,
  Checkbox,
  Kbd,
  Label,
  Progress,
  Radio,
  Select,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabList,
  Tabs,
  Text,
  Tooltip,
} from "@neelshha/ui";
import { componentHref, components } from "@/lib/docs";

const thumbs = {
  accordion: (
    <Accordion>
      <AccordionItem>
        <AccordionTrigger>Shipping</AccordionTrigger>
      </AccordionItem>
    </Accordion>
  ),
  alert: <Alert>Saved.</Alert>,
  avatar: (
    <Avatar>
      <AvatarFallback>AS</AvatarFallback>
    </Avatar>
  ),
  badge: (
    <div className="demoRow">
      <Badge>Draft</Badge>
      <Badge tone="success">Ok</Badge>
    </div>
  ),
  breadcrumb: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>Docs</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  button: <span className="catalogButton">Save</span>,
  card: (
    <Card>
      <Text as="strong" tone="heading">
        Notes
      </Text>
      <Text tone="sub">A short group.</Text>
    </Card>
  ),
  checkbox: <Checkbox label="Remember me" defaultChecked />,
  dialog: (
    <div className="catalogDialog">
      <strong>Delete?</strong>
      <span>This cannot be undone.</span>
    </div>
  ),
  field: <div className="catalogField">Name</div>,
  kbd: <Kbd>⌘K</Kbd>,
  label: <Label>Email</Label>,
  link: <span className="ns-link">Docs</span>,
  menu: <span className="catalogButton">Actions</span>,
  navbar: (
    <div className="catalogNavbar">
      <strong>Acme</strong>
      <span>Docs</span>
      <span>Pricing</span>
    </div>
  ),
  popover: <span className="catalogDialog">Notes</span>,
  progress: <Progress value={64} max={100} />,
  radio: <Radio label="Mail" name="catalog-radio" defaultChecked />,
  select: (
    <Select label="Role" name="catalog-role" defaultValue="editor">
      <option value="editor">Editor</option>
    </Select>
  ),
  separator: (
    <div className="stack">
      <Text tone="sub">Above</Text>
      <Separator />
      <Text tone="sub">Below</Text>
    </div>
  ),
  skeleton: <Skeleton style={{ width: "8rem", height: "0.7rem" }} />,
  spinner: <Spinner />,
  switch: <Switch label="Alerts" defaultChecked />,
  table: (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Atlas</TableCell>
          <TableCell>Live</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  tabs: (
    <Tabs defaultValue="profile">
      <TabList>
        <Tab value="profile">Profile</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
    </Tabs>
  ),
  text: (
    <div className="stack">
      <Text as="strong" tone="heading">
        Heading
      </Text>
      <Text>Body</Text>
      <Text tone="sub">Sub</Text>
    </div>
  ),
  toast: <Alert tone="success">Saved.</Alert>,
  tooltip: <Tooltip content="Saved.">Hover</Tooltip>,
} as const;

export function Catalog() {
  return (
    <ul className="catalog">
      {components.map((item) => (
        <li key={item.slug}>
          <NextLink href={componentHref(item.slug)}>
            <div className="demo catalogPreview" aria-hidden="true">
              <div className="demoInner">{thumbs[item.slug]}</div>
            </div>
            <div className="catalogMeta">
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          </NextLink>
        </li>
      ))}
    </ul>
  );
}

import NextLink from "next/link";
import { CircleCheck } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  Button,
  Card,
  Checkbox,
  CodeBlock,
  Kbd,
  Label,
  Link,
  Menu,
  MenuItem,
  MenuTrigger,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarList,
  Popover,
  PopoverTrigger,
  Progress,
  Radio,
  Select,
  Separator,
  Sidebar,
  SidebarGroup,
  SidebarItem,
  SidebarLabel,
  SidebarList,
  SidebarNav,
  Skeleton,
  Spinner,
  Switch,
  Tab,
  TabPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabList,
  Tabs,
  Text,
  TextField,
  Tooltip,
} from "@neelshha/ui";
import { icon } from "@/components/icons";
import { componentHref, components } from "@/lib/docs";

const thumbs = {
  accordion: (
    <Accordion>
      <AccordionItem>
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionPanel>Two days.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
  alert: (
    <Alert tone="success">
      <AlertTitle>
        <CircleCheck {...icon} />
        Saved.
      </AlertTitle>
      <AlertDescription>On the server.</AlertDescription>
    </Alert>
  ),
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
  button: <Button>Save</Button>,
  "code-block": (
    <CodeBlock
      title="page.tsx"
      language="tsx"
      code={`<Card>Notes</Card>`}
    />
  ),
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
    <div className="ns-dialog catalogDialog">
      <strong className="ns-dialog__title">Delete?</strong>
      <span className="ns-dialog__description">This cannot be undone.</span>
    </div>
  ),
  field: <TextField label="Name" name="catalog-name" placeholder="John Doe" />,
  kbd: <Kbd>⌘K</Kbd>,
  label: <Label>Email</Label>,
  link: <Link href="/docs">Docs</Link>,
  menu: (
    <>
      <MenuTrigger menu="catalog-actions">Actions</MenuTrigger>
      <Menu id="catalog-actions">
        <MenuItem>Archive</MenuItem>
      </Menu>
    </>
  ),
  navbar: (
    <Navbar>
      <NavbarBrand>Acme</NavbarBrand>
      <NavbarList>
        <NavbarItem current>Docs</NavbarItem>
        <NavbarItem>Pricing</NavbarItem>
      </NavbarList>
    </Navbar>
  ),
  popover: (
    <>
      <PopoverTrigger popoverTarget="catalog-notes">Notes</PopoverTrigger>
      <Popover id="catalog-notes">
        <Text>A short note.</Text>
      </Popover>
    </>
  ),
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
  sidebar: (
    <Sidebar>
      <SidebarNav>
        <SidebarGroup>
          <SidebarLabel>Docs</SidebarLabel>
          <SidebarList>
            <SidebarItem current>Intro</SidebarItem>
            <SidebarItem>Field</SidebarItem>
          </SidebarList>
        </SidebarGroup>
      </SidebarNav>
    </Sidebar>
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
      <TabPanel value="profile">Name and email.</TabPanel>
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
  toast: (
    <div className="ns-toast" data-tone="success">
      Saved.
    </div>
  ),
  tooltip: <Tooltip content="Saved.">Hover</Tooltip>,
} as const;

export function Catalog() {
  return (
    <ul className="catalog">
      {components.map((item) => (
        <li key={item.slug}>
          <NextLink href={componentHref(item.slug)} className="catalogHit">
            {item.title}
          </NextLink>
          {/* inert keeps the demo's live controls out of the tab order and
              out of the accessibility tree, not just out of sight. */}
          <div className="demo catalogPreview" aria-hidden="true" inert>
            <div className="demoInner">{thumbs[item.slug]}</div>
          </div>
          <div className="catalogMeta">
            <strong>{item.title}</strong>
            <span>{item.description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@neelshha/ui";
import { icon } from "@/components/icons";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        <Trash2 {...icon} />
        Delete
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTitle>Delete this project?</DialogTitle>
        <DialogDescription>This cannot be undone.</DialogDescription>
        <DialogActions>
          <DialogClose>Cancel</DialogClose>
          <DialogClose variant="danger">Delete</DialogClose>
        </DialogActions>
      </Dialog>
    </>
  );
}

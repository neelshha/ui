"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@neelshha/ui";

export function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
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

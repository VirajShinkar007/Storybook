import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Fields/TextField",
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    field: {
      type: "text",
      name: "fullName",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: false,
    },
    value: "",
    onChange: () => {},
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    field: {
      ...Default.args?.field,
      required: true,
    },
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: "Full Name is required",
  },
};

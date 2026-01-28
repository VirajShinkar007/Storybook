// src/components/Repeater.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Repeater } from "./Repeater";

const meta: Meta<typeof Repeater> = {
  title: "Components/Repeater",
  component: Repeater,
};

export default meta;
type Story = StoryObj<typeof Repeater>;

const field = {
  type: "repeat",
  name: "skills",
  fields: [
    {
      type: "text",
      name: "skill",
      label: "Skill",
      required: true,
    },
  ],
};

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<any[]>([]);

    return (
      <Repeater
        field={field}
        values={values}
        onChange={(updated) => setValues(updated)}
      />
    );
  },
};

export const WithOneItem: Story = {
  render: () => {
    const [values, setValues] = useState([{ skill: "React" }]);

    return (
      <Repeater
        field={field}
        values={values}
        onChange={(updated) => setValues(updated)}
      />
    );
  },
};

export const WithMultipleItems: Story = {
  render: () => {
    const [values, setValues] = useState([
      { skill: "React" },
      { skill: "TypeScript" },
    ]);

    return (
      <Repeater
        field={field}
        values={values}
        onChange={(updated) => setValues(updated)}
      />
    );
  },
};

import { useFormik } from "formik";
import Button from "@/components/button";
import Label from "@/components/commons/label";
import Input from "@/components/commons/input";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/auth-provider";
import { useState } from "react";
export default function CreateProjectForm({
  onClose,
}: {
  onClose: (bool: boolean) => void;
}) {
  const { refetch } = useAuth();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async (values): Promise<void> => {
      setLoading(true);
      const data = await fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => res.json());
      if (data.status) {
        toast.success("Project created successfully");
        onClose(false);
        refetch();
      } else {
        toast.error(data.error);
      }
      setLoading(false);
    },
  });
  return (
    <form className="flex flex-col gap-2 mt-2" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col items-start gap-1">
        <Label className="text-lg font-semibold">Name</Label>
        <Input
          type="text"
          placeholder="Enter your Project name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </div>

      <Button
        type="submit"
        className="mt-2 py-3 rounded-sm"
        isLoading={loading}
      >
        Submit
      </Button>
    </form>
  );
}

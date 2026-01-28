import { FormRenderer } from "./components/FormRenderer";
import { userRegistrationSchema } from "./schema/examples";

export default function App() {
  return (
    <div className="p-6">
      <FormRenderer schema={userRegistrationSchema} />
    </div>
  );
}

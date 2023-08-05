import type { V2_MetaFunction } from "@remix-run/node";
import appConfig from "../app.config.json";
import Button from "../components/Button";

export const meta: V2_MetaFunction = () => {
  return [
    { title: appConfig.name },
    { name: "description", content: appConfig.description },
  ];
};

export default function Index() {
  return (
    <div className="index">
      <h1>{appConfig.name}</h1>
      <Button />
    </div>
  );
}

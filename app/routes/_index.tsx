import type { V2_MetaFunction } from "@remix-run/node";
import appConfig from "../app.config.json";
import { ButtonAdd } from "~/components/ButtonAdd";

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
      <ButtonAdd visible="true" />
        <p>This is a test of text</p>
    </div>
  );
}

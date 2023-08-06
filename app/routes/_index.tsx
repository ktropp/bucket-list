import type { V2_MetaFunction } from "@remix-run/node";
import appConfig from "../app.config.json";
import { ButtonAdd } from "~/components/ButtonAdd";
import {BucketList} from "~/components/BucketList";
import {json} from "@remix-run/node";
import DataHandler from "~/helpers/DataHandler";

export const meta: V2_MetaFunction = () => {
  return [
    { title: appConfig.name },
    { name: "description", content: appConfig.description },
  ];
};

export const loader = async () => {
    return json(DataHandler.parseData());
};

export default function Index() {
  return (
    <div className="index">
      <h1>{appConfig.name}</h1>
      <ButtonAdd visible="true" />
      <BucketList />
    </div>
  );
}

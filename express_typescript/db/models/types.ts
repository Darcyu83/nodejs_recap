import { Attributes, CreationAttributes, Optional } from "sequelize";
import Vendor from "./vendor";

export type TVendorInput = Attributes<Vendor>;
export type TVendorOutput = CreationAttributes<Vendor>;

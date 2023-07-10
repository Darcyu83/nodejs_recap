import { CreationAttributes, Optional } from "sequelize";

export type TCreateVendorDTO = {
  name: string;
  slug?: string;
  description?: string;
  foodGroup?: string;
};

export type TUpdateVendorDTO = Optional<TCreateVendorDTO, "name">;

export type TFilterVendorDTO = {
  isDeleted?: boolean;
  includeDeleted?: boolean;
};

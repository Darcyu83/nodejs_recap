// Data Access Layer is where we implement our SQL queries,

import { InferAttributes, Op } from "sequelize";
import Vendor from "../models/vendor";
import { TVendorInput, TVendorOutput } from "../models/types";
import { IGetAllFilters } from "./types";

// or in this case, where the Sequelize model queries run
export const create = async (payload: TVendorInput): Promise<TVendorOutput> => {
  const vendor = await Vendor.create(payload);

  return vendor;
};

export const update = async (
  id: number,
  payload: Partial<TVendorInput>
): Promise<TVendorOutput> => {
  const vendor = await Vendor.findByPk(id);

  if (!vendor) {
    throw new Error("벤더 없음");
  }

  const updatedVendor = await vendor.update(payload);

  return updatedVendor;
};

export const getById = async (id: number) => {
  const vendor = await Vendor.findByPk(id);

  if (!vendor) throw new Error("벤더 없음");

  return vendor;
};

export const deleteById = async (id: number) => {
  const deletedCnt = await Vendor.destroy({ where: { id } });

  return !!deletedCnt;
};

export const getAll = async (filters?: IGetAllFilters) => {
  return Vendor.findAll({
    where: { ...(filters?.isDeleted && { deleteAt: { [Op.not]: null } }) },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};

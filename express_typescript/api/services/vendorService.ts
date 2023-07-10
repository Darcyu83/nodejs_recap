import { IGetAllFilters } from "../../db/dal/types";
import * as vendorDal from "../../db/dal/vendor";
import { TVendorInput } from "../../db/models/types";

export const create = (payload: TVendorInput) => {
  return vendorDal.create(payload);
};

export const update = (id: number, payload: Partial<TVendorInput>) => {
  return vendorDal.update(id, payload);
};

export const getById = (id: number) => {
  return vendorDal.getById(id);
};

export const deleteById = (id: number) => {
  return vendorDal.deleteById(id);
};

export const getAll = (filters?: IGetAllFilters) => {
  return vendorDal.getAll(filters);
};

import { Service } from "@prisma/client";
import { CreateServiceBodyInput, CreateServiceParamsInput } from "./service.validation";

export type ServiceDTO = Service;
export type CreateServiceDTO = CreateServiceBodyInput & CreateServiceParamsInput;

export interface IServiceRepository {
  create(data: CreateServiceDTO): Promise<ServiceDTO>;
}

export interface IServiceService {
  createNewService(data: CreateServiceDTO): Promise<ServiceDTO>;
}

import { http } from "@/config";
import { ApiResponse } from "@/types";
import { Client, ClientFilter } from "@/types/Client.type";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";

export const createClient = (clientRequest: Client) =>
  http.post<ApiResponse<Client>>("/client/create", clientRequest);

export const updateClient = (clientRequest: Client) =>
  http.put<ApiResponse<Client>>("/client/update", clientRequest);

export const getAllClients = (searchRequest: PagingRequest<ClientFilter>) =>
  http.post<ApiResponse<PagingResponse<Client>>>(
    "/client/get/all",
    searchRequest,
  );

export const getClientById = (id: string) =>
  http.get<ApiResponse<Client>>(`/client/get/${id}`);

// export const deleteClientById = (id: string, isDeleted: boolean) =>
//   http.delete<ApiResponse<string>>(`/client/${id}`, { params: { isDeleted } });

// export const deleteClientsByListId = (listId: string[], isDeleted: boolean) =>
//   http.delete<ApiResponse<string>>("/client/delete-multiple", {
//     data: listId,
//     params: { isDeleted },
//   });

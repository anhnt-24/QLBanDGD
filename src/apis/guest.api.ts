import { http } from "@/config";
import { ApiResponse } from "@/types";
import { Guest, GuestFilter } from "@/types/Guest.type";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";

export const getAllGuest = (guestFilter: PagingRequest<GuestFilter>) =>
  http.post<ApiResponse<PagingResponse<Guest>>>("/guest/get/all", guestFilter);

export const getGuestById = (id: string) =>
  http.get<ApiResponse<Guest>>(`/guest/get/${id}`);
export const createGuest = (guestRequest: Guest) =>
  http.post<ApiResponse<Guest>>("/guest/create", guestRequest);

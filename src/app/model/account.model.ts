import {AccountOperation} from "./AccountOperation.model";

export interface AccountDetails{
  accountId: string;
  balance: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  accountOperationDTOS: AccountOperation[];
}

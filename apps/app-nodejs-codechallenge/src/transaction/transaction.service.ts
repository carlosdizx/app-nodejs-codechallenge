import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Transaction from "./entities/transaction.entity";
import { Repository } from "typeorm";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import CreateTransactionDto from "./dto/create-transaction.dto";

@Injectable()
export default class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  public listTransactions = async ({ page, limit }: IPaginationOptions) => {
    const queryBuilder =
      this.transactionRepository.createQueryBuilder("transaction");
    return await paginate<Transaction>(queryBuilder, {
      page,
      limit,
      route: "transactions",
    });
  };

  public createTransaction = async ({
    accountExternalIdDebit,
    accountExternalIdCredit,
    ...restData
  }: CreateTransactionDto) => {
    new CreateTransactionDto(accountExternalIdDebit, accountExternalIdCredit);

    const transaction = this.transactionRepository.create({
      accountExternalIdDebit,
      accountExternalIdCredit,
      transferTypeId: accountExternalIdDebit ? 1 : 0,
      ...restData,
    });
    return this.transactionRepository.save(transaction);
  };
}

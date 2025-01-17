import { Column, CreateDateColumn, Entity } from "typeorm";
import { StatusEnum } from "../enums/status.enum";

@Entity("transactions")
export default class Transaction {
  @Column({
    type: "uuid",
    primary: true,
    name: "account_external_id",
  })
  transactionExternalId: string;

  @Column({ type: "int", name: "transfer_type_id" })
  transferTypeId: number;

  @Column({ type: "numeric" })
  value: number;

  @Column({
    type: "enum",
    enum: StatusEnum,
    default: StatusEnum.PENDING,
    name: "status_transaction",
  })
  statusTransaction: StatusEnum;

  @CreateDateColumn()
  createdAt: Date;
}

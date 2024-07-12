import { gql } from '@apollo/client';

export const INSERT_CASH_DEPOSIT = gql`
mutation InsertCashDeposits(
  $bank_depositor_id: bigint,
  $cashier_id: bigint,
  $location_id: bigint,
  $market_id: bigint,
  $bank_deposit_date_on: date,
  $business_date_on: date,
  $deposit_date_on: date,
  $bag_number: String,
  $created_at: timestamp,
  $updated_at: timestamp,
  $bank_description: String,
  $shift: String,
  $bank_account_last4_digits: String,
  $digital_pull_time_at: timestamp,
  $digital_pull_2_time_at: timestamp,
  $is_verified_in_bank: Boolean,
  $deposit_amount_cents: Int,
  $files: [String]

) {
  insert_cash_deposits(objects: {
    bank_depositor_id: $bank_depositor_id,
    cashier_id: $cashier_id,
    location_id: $location_id,
    market_id: $market_id,
    bank_deposit_date_on: $bank_deposit_date_on,
    business_date_on: $business_date_on,
    deposit_date_on: $deposit_date_on,
    bag_number: $bag_number,
    created_at: $created_at,
    updated_at: $updated_at,
    bank_description: $bank_description,
    shift: $shift,
    bank_account_last4_digits: $bank_account_last4_digits,
    digital_pull_time_at: $digital_pull_time_at,
    digital_pull_2_time_at: $digital_pull_2_time_at,
    is_verified_in_bank: $is_verified_in_bank,
    deposit_amount_cents: $deposit_amount_cents,
    files: $files
  }) {
    affected_rows
    returning {
      files
      bank_depositor_id
      cashier_id
      id
      location_id
      market_id
      is_verified_in_bank
      bag_number
      bank_account_last4_digits
      bank_description
      bank_receipt_id
      deposit_type
      pay_machine_id
      paystation_character
      shift
      bank_deposit_date_on
      business_date_on
      deposit_date_on
      bank_deposit_amount_cents
      deposit_amount_cents
      created_at
      digital_pull_2_time_at
      digital_pull_time_at
      updated_at
    }
  }
}
`;
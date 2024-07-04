import { gql } from '@apollo/client';

export const GET_CASH_DEPOSITS = gql`
query GetCashDeposits {
  cash_deposits {
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
`;

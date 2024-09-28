import { Select, Option, Input } from '@mui/joy';
import currencies from '../utils/currencies'

export const SelectCurrencies = () => {
  return(
    <>
      <Select>
        {
          currencies.map(currency => (
            <Option key={currency.code} value={currency.code}>{currency.name}</Option>
          ))
        } 
      </Select>

      <Input></Input>

    </>
  )
}
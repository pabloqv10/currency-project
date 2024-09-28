import { 
  Button, 
  Select, 
  Option, 
  Input, 
  Grid, 
  FormControl,
  FormLabel
} from '@mui/joy';
import currencies from '../utils/currencies'
import { useForm } from "react-hook-form"
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';

export const SelectCurrencies = () => {
  const [ rows, setRows ] = useState([])

  const {
    register,
    handleSubmit,
  } = useForm()

  const changeCurrency = async ({selectedCurrency, value}) => {
    const currenciesToChange = currencies.filter(currency => currency.code != selectedCurrency).map(currency => currency.code);

    const urlSearchParams = new URLSearchParams({
      apikey: import.meta.env.VITE_CURRENCY_API_KEY,
      currencies: currenciesToChange,
      base_currency: selectedCurrency
    })

    try {
      const response = await fetch(`https://api.freecurrencyapi.com/v1/latest?${urlSearchParams.toString()}`)
  
      const { data } = await response.json()

      const dataArray = [];

      for (const currency in data) {
        dataArray.push({
          currency,
          exchangeRate: data[currency],
          total: data[currency] * value 
        })
      }

      setRows(dataArray);
    } catch (error) {
      console.error(error)
    }
  }

  const onSubmit = (data) => changeCurrency(data)

  return(
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid md={8}>
            <FormControl>
              <FormLabel>Seleccione una moneda a covertir</FormLabel>
              <Select {...register('selectedCurrency')}>
                {
                  currencies.map(currency => (
                    <Option key={currency.code} value={currency.code}>{currency.name}</Option>
                  ))
                } 
              </Select>
            </FormControl>
          </Grid>

          <Grid md={4}>
            <FormControl>
              <FormLabel>Seleccione el valor a convertir</FormLabel>
              <Input {...register('value')}></Input>
            </FormControl>
          </Grid>

          <Grid mdOffset={5} md={2}>
            <FormControl>
              <Button type='submit' startDecorator={<CurrencyExchangeIcon />}>Convertir</Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Moneda</TableCell>
            <TableCell>Tasa de Cambio</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.currency}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.currency}</TableCell>
              <TableCell>{row.exchangeRate}</TableCell>
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
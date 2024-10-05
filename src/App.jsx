import { SelectCurrencies } from './components/SelectCurrencies'
import Container from '@mui/material/Container';

const App = () => {

  return (
    <Container>
      <h1>Convertidor de monedas</h1>

      <SelectCurrencies />
    </Container>
  )
}

export default App
